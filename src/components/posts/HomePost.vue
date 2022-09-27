<template>
  <a class="publish__item">
    <img class="publish__item__img" :src="eventMedia" alt="">
    <div class="event__infos">
      <h3 class="publish__item__title" v-html="eventData.title.rendered"></h3>
      <p class="publish__item__city">
        {{ eventData.city }}, Le {{ eventData.date }}
      </p>
    </div>
    <div class="event__content">
      <p class="publish__item__content" v-html="eventData.excerpt"></p>
    </div>
    <div class="event__profil">
      <p class="event__profil__author">{{ eventData.author }}</p>
      <img
        class="event__profil__img"
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
      eventMedia: {
              source_url:""
            },
    }
  },

  props: ["eventData"],

  mounted() {
    uploadService.getSingleMedia(this.eventData.id)
        .then((response) => {
          // console.log(response);
            this.eventMedia = response.data[0]["source_url"];
            
        });
  }
};

</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixins';
@import '../../assets/scss/colors';

.publish__item {
  @include breakpoint ('medium') {
        width: 45%;
}

@include breakpoint ('large') {
        width: 29%;
}
}
</style>