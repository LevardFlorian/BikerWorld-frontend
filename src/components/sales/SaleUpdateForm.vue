<template>
    <form @submit.prevent="onFormSubmit">
      <h3 class="form__field__title">Modifie ton occasion</h3>
      <div class="form__field">
        <label class="form__field__label">Titre de l'annonce</label>
        <input v-model.trim="title" type="text" class="form__field__input" placeholder="Titre de l'annonce" />
      </div>
      <fieldset class="form__field">
        <label class="form__field__label" for="carousel"
          >Quel Marque ?</label
        >
        <div id="carousel" class="main__search__carousel">
          <select v-model="brandSelect" class="form__field__input">
            <option value="">Séléctionner</option>
            <option
              v-for="brand in brandList"
              :key="brand.id"
              :value="brand.id"
              :slug="brand.slug"
              class="form__field__input"
            >
              <input type="selected" />
              <label for="">{{ brand.name }}</label>
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
         <div class="np-image-preview" >
          <img v-if="imageFile != null && imageFile.length != 0" class="np-preview" :src="imageFile" />
          <img v-if="!imageFile" :src="eventMedia" alt="">
          
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
        <label class="form__field__label">Description</label>
        <textarea
          v-model.trim="content"
          class="form__field__input"
          style="height: 4rem"
          placeholder="Description de l'annonce"
        ></textarea>
      </div>
      <div class="form__field">
        <label class="form__field__label">kilomêtre ?</label>
        <input
          v-model="distance"
          type="number"
          class="form__field__input"
          placeholder="Nombre de kilomêtres"
        />
      </div>
      <div class="form__field">
        <label class="form__field__label">Prix ?</label>
        <input
          v-model="price"
          type="number"
          class="form__field__input"
          placeholder="Prix"
        />
      </div>
      <div class="alert" v-if="errorMessages">{{ errorMessages }}</div>

      <button type="submit" class="form__field__button" role="submit">
        <img src="../../assets/images/bikerworld-check.png" alt="" />
      </button>
    </form>
</template>

<script>

import brandService from "../../services/brandService";
import saleService from "../../services/saleService";
import ImageUpload from "../general/ImageUpload";
import uploadService from "../../services/uploadService";


export default {
  data() {
    return {

      // on simule des résultats de la base de données
      brandList: [],
      title: "",
      isOpen: false,
      content: "",
      distance: "",
      search: "",
      price: "",
      errorMessages: "",
      brandSelect: "",
      imageFile: null,
      input: null,
      isImageUploading: false,
      file: "",
      results: [],
      saleMedia: {
      },
      pictureId: "",
    }
  },
  props: ["value"],

  methods: {
    loadBrand() {
      brandService
        .getAllBrands()
        .then((response) => {
          this.brandList = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    showImagePreview(sale) {

      this.input = sale.target;
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

      this.errorMessages = errors.join(", ");
      // console.log(this.image);


      if (!this.errorMessages) {
        saleService
        
          .postSale({
            post_title: this.title,
            post_content: this.content,
            price: this.price,
            brand: this.brandSelect,
            distance: this.distance,
          })

          // formData.append("file", this.input.files[0]);
          // formData.append("title", this.title);
          // formData.append("post", );
          // uploadService.add(formData)


          .then((response) => {
            // console.log(response.data);
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
  },
  mounted() {
    this.loadBrand();

          saleService.getSingleSale(this.$route.params.saleId)
        .then((response) => {
            console.log(response);
            this.saleData = response.data;
            this.title = this.saleData.title.rendered;
            this.price = this.saleData.price;
            this.distance = this.saleData.distance;
            this.content = this.saleData.content.rendered;
            this.brandSelect = this.saleData.brand[0];
        });

      uploadService.getSingleMedia(this.$route.params.saleId)
        .then((response) => {
          
            this.saleMedia = response.data[0]["source_url"];
            this.pictureId = response.data[0]['id'];
            console.log(this.pictureId);
        });
  },

  components: {
    ImageUpload,
  },
};

</script>
