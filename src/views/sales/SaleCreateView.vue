<template>
    <main class="main-container">
         <SaleCreateForm></SaleCreateForm>
    </main>
</template>

<script>
import SaleCreateForm from '../../components/sales/SaleCreateForm.vue'

export default {
    // des données privées pour dynamiser le composant
    data() {
        return {

        }
    },
    // components permet de déclarer les composants enfants
    components: {
        SaleCreateForm
    }
}
</script>
