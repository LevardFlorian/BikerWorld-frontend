<template>
  <header class="header">
    <div class="header__navbar">
      <div class="header__navbar__items">
        <RouterLink to="/"
          ><img
            class="header__navbar__img"
            src="../../assets/images/BikerWorld-logo.png"
            alt=""
        /></RouterLink>
        <h1 class="header__navbar__title">BikerWorld!</h1>
      </div>
      <div class="header__navbar__items">
        <a class="header__navbar__menu" href="javascript:void(0)"
        v-on:click="toggleMenu"
          ><img src="../../assets/images/menu.png" alt=""
        /></a>
        <Menu
          v-bind:revele="revele"
          v-bind:toggleMenu="toggleMenu"
          v-bind:isUserConnected="isUserLoggedIn"
        ></Menu>
      </div>
    </div>
    <div class="header__content">
      <p class="header__content__title">
        La vie ne vaut d'être vévue sans passion!!
      </p>
      <p>Ce monde de motards s'offre à vous.</p>
    </div>
    <div class="header__profil" v-if="isUserConnected">
      <p class="header__profil__title">{{ fullname }}</p>
      <img
        class="header__profil__img"
        src="../../assets/images/BikerWorld-user.png"
        alt=""
      />
      <a class="header__profil__link" href="javascript:void(0)" @click="onDisconnectClick">Déconnexion</a>
    </div>
  </header>
</template>

<script>
import Menu from './Menu.vue';
import userService from '../../services/userService';

export default {
  data(){
    return {
      revele:false,
      firstname: "",
      lastname: ""
    }
  },
  props: ['isUserConnected'],

  components: {
    Menu,
  },

  computed: {
    fullname() {
      const firstname = this.$store.state.firstname;
      return firstname;
    },
    isUserLoggedIn () {
      return this.$store.state.isUserConnected;
    }
  },

  methods: {

    onDisconnectClick() {
      userService.disconnectUser();
      this.$router.push('/');
    },

    toggleMenu: function(){
      this.revele = !this.revele;
    },
    
  },
  
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixins';
@import '../../assets/scss/colors';

.header {
  &__navbar{

    @include breakpoint ('medium') {
          &__img {
      width: 10rem;
      padding: 0.5rem;

    }

    &__title {
      font-size: 1.5rem;

    }

    &__menu {
      text-align: end;
      width: 4rem;

      img {
        width: 4rem;


      }
    }
  }
  }
  &__content {
    @include breakpoint ('medium') {
    &__title {
      font-size: 1.5rem;
    }
    }
  }
}
</style>