<template>
    <main class="main-container">
         <EventUpdateForm></EventUpdateForm>
    </main>
</template>

<script>
import EventUpdateForm from '../../components/posts/EventUpdateForm.vue'

export default {
    // des données privées pour dynamiser le composant
    data() {
        return {

        }
    },
    // components permet de déclarer les composants enfants
    components: {
        EventUpdateForm
    }
}
</script>
