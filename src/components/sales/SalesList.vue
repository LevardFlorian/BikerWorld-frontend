<template>
  <div class="sales">
    <h3 class="sales__title">Les nouvelles occasions!</h3>
    <RouterLink to="/occasion-form"
     v-if="isUserLoggedIn"><button>Créer votre occasions</button></RouterLink
    >
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

      <div class="sales__items">
        <HomeSales
          @click="onSaleClick(currentSale.id)"
          v-for="currentSale in saleList"
          :key="currentSale.id"
          :saleData="currentSale"
        >
        </HomeSales>
      </div>
      <div v-if="errorMessages">{{ errorMessages }}</div>
    </div>
    <RouterLink to="/occasion-form"
     v-if="isUserLoggedIn"><button>Créer votre occasions</button></RouterLink
    >
    <div class="event-list__pagination">
      <a
        @click="loadSales(pageNumber)"
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
import HomeSales from "./HomeSales.vue";
import saleService from "../../services/saleService.js";
import brandService from "../../services/brandService.js";

export default {
  props: ["isUserConnected"],
  data() {
    return {
      saleList: [],
      selectedBrandList: "",
      selectedCityList: [],
      brandList: [],
      pagesCount: 1,
      currentPage: 1,
    };
  },

  components: {
    HomeSales,
  },

  computed: {
    isUserLoggedIn() {
      return this.$store.state.isUserConnected;
    },
  },

  methods: {
    loadSales(page) {
      this.currentPage = page;
      saleService
        .getAllSales(page, this.selectedBrandList)
        .then((response) => {
          console.log(response);
          this.saleList = response.data;
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
          console.log(brandList);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onBrandFilterChange() {
      // on relance la récupération des données
      this.loadSales(1);
    },
    onSaleClick(saleId) {
      this.$router.push({
        name: "salepage",
        params: {
          saleId: saleId,
        },
      });
    },
  },

  mounted() {
    this.loadSales(1);
    this.loadBrands();
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/mixins";
@import "../../assets/scss/colors";

.sales__items {
  @include breakpoint("large") {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>