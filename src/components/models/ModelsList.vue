<template>
  <div class="release">
    <h3 class="release__title">Les nouvelles machines fraichement sorties!</h3>
    <div class="excerptList">
      <div class="autocomplete field">
        <label class="field__label" for="brand-select">Marque</label>
        <select
          id="brand-select"
          @change="onBrandFilterChange()"
          v-model="selectedBrandList"
          class="field__input"
        >
          <option value="" class="field__input" selected>
            Séléctionner une marque
          </option>
          <option
            v-for="brand in brandList"
            :key="brand.id"
            :value="brand.id"
            class="field__input"
          >
            {{ brand.name }}
          </option>
        </select>
      </div>

      <div class="release__items">
        <HomeModel
          @click="onModelClick(currentModel.id)"
          v-for="currentModel in modelList"
          :key="currentModel.id"
          :modelData="currentModel"
        >
        </HomeModel>
      </div>
      <div v-if="errorMessages">{{ errorMessages }}</div>
    </div>

    <div class="event-list__pagination">
      <a
        @click="loadModels(pageNumber)"
        v-for="pageNumber in pagesCount"
        :key="pageNumber"
        :class="{ active: pageNumber === currentPage }"
      >
        {{ pageNumber }}
      </a>
    </div>
  </div>
</template>
<script>
import HomeModel from "./HomeModel.vue";
import modelService from "../../services/modelService.js";
import brandService from "../../services/brandService.js";

export default {
  props: ["isUserConnected"],
  data() {
    return {
      modelList: [],
      selectedBrandList: "",
      selectedCityList: [],
      brandList: [],
      pagesCount: 1,
      currentPage: 1,
    };
  },

  components: {
    HomeModel,
  },

  methods: {
    loadModels(page) {
      this.currentPage = page;
      modelService
        .getAllModels(page, this.selectedBrandList)
        .then((response) => {
          // console.log(response);
          this.modelList = response.data;
          this.pagesCount = parseInt(response.headers["x-wp-totalpages"]);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadBrands() {
      // getAllbrands() renvoie une promesse
      brandService
        .getAllBrands()
        .then((response) => {
          this.brandList = response.data;
          // console.log(brandList);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onBrandFilterChange() {
      // on relance la récupération des données
      this.loadModels(1);
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
    this.loadModels(1);
    this.loadBrands();
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