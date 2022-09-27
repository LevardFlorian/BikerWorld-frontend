<template>
    <main class="main-container">
         <SaleUpdateForm></SaleUpdateForm>
    </main>
</template>

<script>
import SaleUpdateForm from '../../components/sales/SaleUpdateForm.vue'

export default {
    // des données privées pour dynamiser le composant
    data() {
        return {

        }
    },
    // components permet de déclarer les composants enfants
    components: {
        SaleUpdateForm
    }
}
</script>
