<template>
    <form @submit.prevent="onFormSubmit">
      <h3 class="form__field__title">Crée ton événement</h3>
      <fieldset class="form__field">
        <label class="form__field__label" for="carousel"
          >Quel type d'activité ?</label
        >
        <div id="carousel" class="main__search__carousel">
          <select v-model="eventTypeSelect" class="form__field__input">
            <option value="">Séléctionner</option>
            <option
              v-for="eventType in eventTypeList"
              :key="eventType.id"
              :value="eventType.id"
              :slug="eventType.slug"
              class="form__field__input"
            >
              <input type="selected" />
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
          Select an image file:
          <input
          class="form__field__input"
            v-on:click="uploadImage"
            v-bind:value="this.imageFile"
            type="file"
            @change="showImagePreview($event)"
            accept="image/*"
          />
        </div>
        <div
          class="np-image-preview"
          v-if="imageFile != null && imageFile.length != 0"
        >
          <img class="np-preview" :src="imageFile" />
        </div>

        <div
          v-if="imageFile != null && imageFile.length != 0 && !isImageUploading"
        >
          <button
            class="np-upload-btn np-upload-btn-cancel"
            v-on:click="clearImage"
          >
            Cancel
          </button>
          <button class="np-upload-btn np-upload-btn-confirm">Upload</button>

        </div>
        <div class="np-upload-in-progress form__field__label" v-if="isImageUploading">
          Please wait while your file is being uploaded ...
        </div>
      </div>
      <div class="form__field">
        <label class="form__field__label">Nom de l'événement</label>
        <input v-model.trim="title" type="text" class="form__field__input" placeholder="Titre de l'évènement" />
      </div>
      <div class="form__field">
        <label class="form__field__label">Description</label>
        <textarea
          v-model.trim="content"
          class="form__field__input"
          style="height: 4rem"
          placeholder="Description de l'évènement"
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
        />
      </div>
      <div class="form__field">
        <label class="form__field__label">A quel endroit ?</label>
        <input class="form__field__input" v-model="search" @input="onChange($event)" type="text" placeholder="Ville de l'évènement" />
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
          v-model.trim="nbre_particpants"
          type="number"
          class="form__field__input"
          placeholder="Nombre de participants"
        />
      </div>
      <div class="alert" v-if="errorMessages">{{ errorMessages }}</div>

      <button type="submit" class="form__field__button" role="submit">
        <img src="../../assets/images/bikerworld-check.png" alt="" />
      </button>
    </form>
</template>

<script>

import eventTypeService from "../../services/eventTypeService";
import eventService from "../../services/eventService";
import ImageUpload from "../general/ImageUpload";
import uploadService from "../../services/uploadService";
import cityService from "../../services/cityService";


export default {
  data() {
    return {

      // on simule des résultats de la base de données
      eventTypeList: [],
      title: "",
      isOpen: false,
      content: "",
      date: "",
      search: "",
      nbre_particpants: "",
      errorMessages: "",
      eventTypeSelect: "",
      imageFile: null,
      input: null,
      isImageUploading: false,
      file: "",
      results: [],
    }
  },
  props: ["value"],

  methods: {
    loadEventType() {
      eventTypeService
        .getAllEventTypes()
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

    uploadImage() {
      this.isImageUploading = true;
      setTimeout(() => {
        image = this.imageFile;
        // this.$emit('update:image', parentImage);
        // console.log(this.imageFile);

        this.isImageUploading = false;
        // this.clearImage();
      }, 3000);
    },

    clearImage() {
      this.imageFile = null;
      this.input = null;
    },

    onFormSubmit() {
      const errors = [];
      const formData = new FormData();

      if (this.title.length < 3) {
        errors.push("Le titre doit contenir au moins trois caractères.");
      }
      if (this.content.length < 10) {
        errors.push("La description n'est pas assez précise.");
      }
      if (this.title.place < 3) {
        errors.push("Le lieu doit contenir au moins trois caractères.");
      }

      this.errorMessages = errors.join(", ");
      // console.log(this.image);


      if (!this.errorMessages) {
        eventService
        
          .postEvent({
            post_title: this.title,
            post_content: this.content,
            event_place: this.search,
            event_date: this.date,
            event_participant: this.nbre_particpants,
            event_type: this.eventTypeSelect,
            
          })

          // formData.append("file", this.input.files[0]);
          // formData.append("title", this.title);
          // formData.append("post", );
          // uploadService.add(formData)


          .then((response) => {
            formData.append("file", this.input.files[0]);
            formData.append("title", this.title);
            formData.append("post", response.data[1]);
            // console.log(this.formData);
            // console.log(formData);

            uploadService.add(formData).then((response) => {
              // console.log(response);
              this.$router.push("/");
            });
          })
          .catch((error) => {
            this.errorMessages = error.message;
          });
      }
    },
    onChange(event) {
      const inputValue = event.target.value.toLowerCase();
    // console.log(inputValue)
    // await fetch(`https://geo.api.gouv.fr/communes?nom=${event.target.value}`)
    // axios.get("https://geo.api.gouv.fr/communes?nom=" + event.target.value)
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
  },
  mounted() {
    this.loadEventType();
  },

  components: {
    ImageUpload,
  },
};

</script>
