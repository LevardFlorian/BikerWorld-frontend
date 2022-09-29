<template>
  <div class="sales">
    <h2 class="sales__title">Les dernières occasions!</h2>
    <div class="sales__items">
      <HomeSales
        @click="onSaleClick(currentSale.id)"
        v-for="currentSale in saleList"
        :key="currentSale.id"
        :saleData="currentSale"
      ></HomeSales>
    </div>
    <RouterLink to="/occasions"
      ><button>Voir tout les occasions</button></RouterLink
    >
  </div>
</template>

<script>
import HomeSales from "./HomeSales.vue";
import saleService from "../../services/saleService.js";
export default {
  components: {
    HomeSales,
  },
  data() {
    return {
      saleList: [],
    };
  },
  methods: {
    loadSales() {
      saleService
        .getSales()
        .then((response) => {
          // console.log(response);
          this.saleList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
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
    this.loadSales();
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