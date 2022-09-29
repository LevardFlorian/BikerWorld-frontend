<template>
  <div class="release">
    <h2 class="release__title">Les dernières nouveautés!</h2>
    <div class="release__items">
      <HomeModel
        @click="onModelClick(currentModel.id)"
        v-for="currentModel in modelList"
        :key="currentModel.id"
        :modelData="currentModel"
      ></HomeModel>
    </div>
    <RouterLink to="/modeles"
      ><button>Voir tout les nouveautés</button></RouterLink
    >
  </div>
</template>

<script>
import HomeModel from "./HomeModel.vue";
import modelService from "../../services/modelService.js";
export default {
  components: {
    HomeModel,
  },
  data() {
    return {
      modelList: [],
    };
  },
  methods: {
    loadModels() {
      modelService
        .getModels()
        .then((response) => {
          // console.log(response);
          this.modelList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    onModelClick(modelId) {
      this.$router.push({
        name: "modelpage",
        params: {
          modelId: modelId,
        },
      });
    },
  },

  mounted() {
    this.loadModels();
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/mixins";
@import "../../assets/scss/colors";

.release__items {
  @include breakpoint("medium") {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>