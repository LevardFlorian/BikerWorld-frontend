<template>
    <form @submit.prevent="onFormSubmit">
      <h3 class="form__field__title">Mise à jour de ton événement</h3>
      <fieldset class="form__field">
        <label class="form__field__label" for="carousel">Quel type d'activité ?</label>
        <div id="carousel" class="main__search__carousel">  
          <select v-model="eventTypeSelect" class="form__field__input" >
            <option value="">Séléctionner</option>
            <option 
                v-for="eventType in eventTypeList" 
                :key="eventType.id" 
                :value="eventType.id"
                :slug="eventType.slug"
                class="form__field__input">
              <input type="selected">
              <label for="">{{ eventType.name }}</label>
            </option>             
          </select>        
        </div>           
      </fieldset>     
      <div class="form__field">
        <h2 class="form__field__label">Image uploader</h2>
        <div
          class="np-image-upload-picker form__field__label"
          v-if="imageFile == null || imageFile.length == 0"
        >
          Sélectioner une image
          <input
          class="form__field__input"
            v-on:click="uploadImage"
            v-bind:value="this.imageFile"        
            type="file" @change="showImagePreview($event)" accept="image/*" />
        </div>
        
        <div class="np-image-preview" >
          <img v-if="imageFile != null && imageFile.length != 0" class="np-preview" :src="imageFile" />
          <img v-if="!imageFile" :src="eventMedia" alt="">
          
        </div>
        <div v-if="imageFile != null && imageFile.length != 0 && !isImageUploading">
          <button
            class="np-upload-btn np-upload-btn-cancel"
            v-on:click="clearImage"
          >
            Cancel
          </button>
          <!-- <button
            class="np-upload-btn np-upload-btn-confirm"
          >
            Upload
          </button> -->
        </div>
        <div class="np-upload-in-progress form__field__label" v-if="isImageUploading">
          Please wait while your file is being uploaded ...
        </div>
      </div>
      <div class="form__field">
        <label class="form__field__label">Nom de l'événement</label>
        <input 
        v-model.trim="title"
        type="text" 
        class="form__field__input"
        
        > 
      </div>
      <div class="form__field">
        <label class="form__field__label">Description</label>
        <textarea
          v-model.trim="content"
          class="form__field__input"
          style="height: 4rem;"
          :placeholder= eventData.content.rendered
        ></textarea>
      </div>
      <div class="form__field">
        <label class="form__field__label" for="date">Quand aura-t-elle lieu ?</label>
        <input 
        v-model.trim="date"
        class="form__field__input" 
        type="date" 
        id="date" 
        name="date"
        :placeholder= eventData.date
        />
      </div>
      <div class="autocomplete form__field">
        <label class="form__field__label">A quel endroit ?</label>
        <input class="form__field__input" v-model="search" @input="onChange($event)" type="text" />
        <ul v-show="isOpen" class="autocomplete-results">
          <li
            v-for="(result, i) in results"
            :key="i"
            @click="setResult(result.nom)"
            class="autocomplete-result"
          >
            {{ result.nom }}
          </li>
        </ul>
      </div>
      <div class="form__field">
        <label class="form__field__label">Nombre de participants ?</label>
        <input
          v-model.trim="nbre_participants"
          type="number"
          class="form__field__input"
          :placeholder= eventData.number_participant
        />
      </div>
      <div v-if="errorMessages" > {{ errorMessages }} </div>

      <button type="submit" class="form__field__button" role="submit"><img src="../../assets/images/bikerworld-check.png" alt=""></button>
    </form>
</template>

<script>
import eventTypeService from '../../services/eventTypeService';
import eventService from '../../services/eventService';
import uploadService from '../../services/uploadService';
import cityService from "../../services/cityService";

export default {
  data() {
    return {
        
        eventTypeList: [], 
        title:"",
        content:"",
        date:"",
        nbre_participants:"",
        errorMessages: "",
        eventTypeSelect: "",
        imageFile: null,
        input: null,
        isImageUploading: false,
        file:'',
        isOpen: false,
        search: "",
        results: [], 
        eventData: {
          title: {
            rendered: ""
          },
          
          _embedded: {},
          content: {rendered: ""},
              
        },
        eventMedia: {
        },
        pictureId: "",      
      }      
    },

    props : ['value'],

   
    mounted() {
      this.loadEventType();

      eventService.getSingleEvent(this.$route.params.eventId)
        .then((response) => {
            console.log(response);
            this.eventData = response.data;
            this.title = this.eventData.title.rendered;
            this.search = this.eventData.city;
            this.nbre_participants = this.eventData.number_participant;
            this.date = this.eventData.date;
            this.content = this.eventData.content.rendered;
            this.eventTypeSelect = this.eventData.eventType[0];
        });

      uploadService.getSingleMedia(this.$route.params.eventId)
        .then((response) => {
          
            this.eventMedia = response.data[0]["source_url"];
            this.pictureId = response.data[0]['id'];
            console.log(this.pictureId);
        });
    },  

   
    methods : {

     
      loadEventType() {
        eventTypeService.getAllEventTypes()
        .then((response) => {
          
          this.eventTypeList = response.data;
        })
        .catch((error) => {
            console.error(error);
        });
      },
      showImagePreview(event) {
        this.input = event.target;
        if (this.input.files && this.input.files[0]) { 
          let reader = new FileReader();
          reader.onload = (e) => {
            this.imageFile = e.target.result;
          };
          reader.readAsDataURL(this.input.files[0]);
        }
      },

      clearImage() {
        this.imageFile = null;
        this.input = null;
      },

      onChange(event) {
      const inputValue = event.target.value.toLowerCase();

    if (inputValue.length >= 2){
    cityService.getAllCities(inputValue)
    .then(response =>{
      this.results = response.data.slice(0,9);    
    })}

    // .then(data =>  this.results = data);
    this.results.length === 0 ?  this.isOpen = false:  this.isOpen = true;
    
    },
    setResult(result) {
      this.search = result;
      this.isOpen = false;
      // this.isOpen = false;
    },
     
      onFormSubmit(){
        
        const errors = [];
        const formData = new FormData();

        if(this.title.length < 3) {
          errors.push("Le titre doit contenir au moins trois caractères.");
        }
        if(this.content.length < 10) {
          errors.push("La description n'est pas assez précise.");
        }
        if(this.title.place < 3) {
          errors.push("Le lieu doit contenir au moins trois caractères.");
        }

        this.errorMessages = errors.join(', ');

        if(!this.errorMessages) {
        
          eventService.postEvent({
              post_id: this.$route.params.eventId,
              post_title: this.title,
              post_content: this.content,
              event_place: this.search,
              event_date: this.date,
              event_participant: this.nbre_participants,
              event_type: this.eventTypeSelect, 
              event_id: this.eventData.event_id,

          })  
          .then((response) => {
            
            if(this.imageFile) {

              formData.append("file", this.input.files[0]);
              formData.append("title", this.title);
              formData.append("post", response.data[1]);
              
              uploadService.add(formData)
              .then((response)=> {
                
                uploadService.deleteMedia(this.pictureId)
                .then((response) => {

                  this.$router.push('/evenement/' + this.$route.params.eventId );
                })
                .catch((error) => {
                  this.errorMessages = error.message;
                })
                
              })
              .catch((error) => {
              this.errorMessages = error.message;
              })   

            } else {

              this.$router.push('/evenement/' + this.$route.params.eventId );
            }
            
          })
          .catch((error) => {
            this.errorMessages = error.message;
          })
        }       
      },   
    },

}
</script>

<style lang="scss" scoped>

</style>