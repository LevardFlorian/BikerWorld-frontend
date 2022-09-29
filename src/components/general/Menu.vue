<template>
    
    <div class="menu" v-if="revele">
        <nav class="main-menu">
            <div v-on:click="toggleMenu" class="close-button"><i class="fas fa-times"></i></div>
            <ul>
                <RouterLink class="main-menu__item" to="/" v-on:click="toggleMenu">Accueil</RouterLink>
                <RouterLink class="main-menu__item" to="/evenements" v-on:click="toggleMenu" >évènements</RouterLink>
                <RouterLink class="main-menu__item" to="/occasions" v-on:click="toggleMenu" >occasions</RouterLink>
                <RouterLink class="main-menu__item" to="/modeles" v-on:click="toggleMenu" >nouveautés</RouterLink>
                <RouterLink class="main-menu__item" to="/inscription" v-on:click="toggleMenu" v-if="!isUserConnected">Inscription</RouterLink>
                <RouterLink class="main-menu__item" to="/connexion" v-on:click="toggleMenu" v-if="!isUserConnected">Connexion</RouterLink> 
                <RouterLink class="main-menu__item" to="/" v-on:click="toggleMenu" v-if="isUserConnected" @click="onDisconnectClick">Deconnexion</RouterLink>       
            </ul>
        </nav>
    </div>
    
</template>
<script>
import userService from '../../services/userService';

export default {
    
    props: ['revele', 'toggleMenu', 'isUserConnected'],

    methods: {

        onDisconnectClick() {
        userService.disconnectUser();
        },

  },

}

</script>
<style lang="scss" scoped>
@import '../../assets/scss/colors';
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');

.main-menu {
    background-color: rgba(#242943, 0.7);
    bottom: 0;
    left: 0;
    height: 100vh;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 20;
    backdrop-filter: blur(1rem);
    
    .close-button {
       color: white;
       cursor: pointer;
       position: fixed;
       font-size: 2rem;
       top: 1rem; right: 1rem;
       z-index: 10;
    }

    ul {
        align-items: center;
        position: relative;
        top: 0; right: 0; bottom: 0; left: 0;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
        font-family: 'Indie Flower', cursive;
        
    }
    
    &__item {
        border-bottom: 1px solid white;
        padding: 1rem;
        text-align: center;
        width: 25%;

        color: white;
        text-decoration: none;
        font-size: 1.2rem;
        text-transform: uppercase;
        transition: all 0.3s;
            &:hover {
                color: $background;
            }
        }

        &:last-of-type {
            border: none;
        }
    
}
</style>