<template>
  <a class="release__item">
    <div class="release__infos">
      <h3 class="release__item__title" v-html="modelData.title.rendered"></h3>
    </div>
    <img class="release__item__img" :src="modelData.thumbnail" alt="" />
    <div class="release__content">
      <p class="release__item__content" v-html="modelData.excerpt"></p>
    </div>
  </a>
</template>

<script>

export default {
  props: ["modelData"],
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixins';
@import '../../assets/scss/colors';

.release__item {
  @include breakpoint ('medium') {
        width: 45%;
}

@include breakpoint ('large') {
        width: 29%;
}
}
</style>