<template>
  
  <div>
    <h2>Image uploader</h2>
    <div
      class="np-image-upload-picker"
      v-if="imageFile == null || imageFile.length == 0"
    >
      Select an image file:
      <input  v-on:click="uploadImage"
        v-bind:value="this.imageFile"
        
        type="file" @change="showImagePreview($event)" accept="image/*" />
    </div>
    <div
      class="np-image-preview"
      v-if="imageFile != null && imageFile.length != 0"
    >
      <img class="np-preview" :src="imageFile" />
    </div>
    <div v-if="imageFile != null && imageFile.length != 0 && !isImageUploading">
      <button
        class="np-upload-btn np-upload-btn-cancel"
        v-on:click="clearImage"
      >
        Cancel
      </button>
      <button
        class="np-upload-btn np-upload-btn-confirm"
      >
        Upload
      </button>
    </div>
    <div class="np-upload-in-progress" v-if="isImageUploading">
      Please wait while your file is being uploaded ...
    </div>
  </div>
</template>
<script>
import uploadService from '../../services/uploadService' 

export default {
  name: "ImageUploader",
  props: ["value"], 


  data() {
    return {
      imageFile: null,
      input: null,
      isImageUploading: false,
      image:"",
    };
  },
  methods: {
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
        image= this.imageFile;
        // this.$emit('update:image', parentImage);
        console.log(this.imageFile);
        
        this.isImageUploading = false;
        // this.clearImage();
        alert("Image uploaded sucessfully!");
      }, 3000);
    },
    clearImage() {
      this.imageFile = null;
      this.input = null;
    },
  },
};
</script>