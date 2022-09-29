<template>
<div>
  <Header :isUserConnected="isUserLoggedIn"></Header>
  <RouterView :isUserConnected="isUserLoggedIn"></RouterView>
  <Footer></Footer>
</div>
</template>

<script>
  import Header from './components/general/Header.vue'
  import Footer from './components/general/Footer.vue'

  export default {

    components: {
      Header,
      Footer,
    },

     mounted() {
      // on force la réévaluation de la présence du token et la répercution de cet état sur les composants qui utilisent ce state
      this.$store.commit('updateUserStatus');
    },

    computed: {
      // cette propriété calculée doit renvoyer la valeur de isUserConnected depuis le store
      isUserLoggedIn () {
        return this.$store.state.isUserConnected;
      }
    }
  }
</script>

<style lang="scss">
  
  @import "./assets/scss/main.scss";
</style>
