<template>
    <main class="main-container">
         <PostCreateForm></PostCreateForm>
    </main>
</template>

<script>
import PostCreateForm from '../../components/posts/PostCreateForm.vue'

export default {
    // des données privées pour dynamiser le composant
    data() {
        return {

        }
    },
    // components permet de déclarer les composants enfants
    components: {
        PostCreateForm
    }
}
</script>
