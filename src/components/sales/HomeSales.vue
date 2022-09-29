<template>
  <a class="sale">
    <div class="sale__item">
      <div class="sale__item__right">
        <img class="sale__item__right__img" :src="saleMedia" alt="" />
    <div>
      <p class="sale__item__price">Prix: {{saleData.price}}€</p>
    </div>
      </div>
      <div class="sale__item__left">
        <h3
          class="sale__item__left__title"
          v-html="saleData.title.rendered"
        ></h3>
        <p class="sale__item__left__content" v-html="saleData.excerpt"></p>
      </div>
    </div>
    <div class="sale__profil">
      <p class="sale__profil__author">{{saleData.author}}</p>
      <img
        class="sale__profil__img"
        src="../../assets/images/BikerWorld-user.png"
        alt=""
      />
    </div>
  </a>
</template>

<script>
import uploadService from '../../services/uploadService.js';
export default {
  data() {
    return {
      saleMedia: {
              source_url:""
            },
    }
  },

  props: ["saleData"],

  mounted() {
    uploadService.getSingleMedia(this.saleData.id)
        .then((response) => {
          // console.log(response);
            this.saleMedia = response.data[0]["source_url"];
            
        });
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixins';
@import '../../assets/scss/colors';

.sale {
  @include breakpoint ('large') {
        width: 45%;
}

}
</style>