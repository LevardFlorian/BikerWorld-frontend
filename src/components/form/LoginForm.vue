<template>
  <form @submit.prevent="onFormSubmit">
    <fieldset>
      <div class="form__field">
        <label class="form__field__label">Nom d'utilisateur</label>
        <input
          v-model="username"
          class="form__field__input"
          type="text"
          placeholder="John"
        />
      </div>
      <div class="form__field">
        <label class="form__field__label">Mot de passe</label>
        <input
          v-model="password"
          class="form__field__input"
          type="password"
          placeholder="Mot de passe"
        />
      </div>
    </fieldset>

    <div v-if="errorMessages" class="alert error">
      {{ errorMessages }}
    </div>

    <button class="button" role="submit">Connexion</button>

    <br />
    <br />

    <div class="field">
      <p>
        <a class="form__field__label" href="https://createLostIdentifiers.html">Idendifiants perdus</a>
      </p>
      <p>
        <RouterLink
          class="form__field__label"
          to="/inscription"
          v-on:click="toggleMenu"
          v-if="!isUserConnected"
          >Créer un compte</RouterLink
        >
      </p>
    </div>
  </form>
</template>

<script>
import userService from '../../services/userService';



export default {
    data() {
        return {
            errorMessages: "",
            username: "",
            password: ""
        }
    },
    methods: {
        onFormSubmit() {

            // on valide les saisies
            const errors = [];
            
            if (this.username.length <= 3) {
                errors.push("Le nom d'utilisateur n'est pas valide.");
            }

            if (this.password.length <= 3) {
                errors.push("Le mot de passe n'est pas valide.");
            }

            this.errorMessages = errors.join(', ');

            // si pas de message d'erreur
            if (!this.errorMessages) {
                // on s'authentifie avec l'API
                userService.connectUser({
                    username: this.username,
                    password: this.password
                })
                .then((response) => {
                    // si on s'est bien connecté, on navigue vers la home
                    this.$router.push('/');
                })
                .catch((error) => {
                    // sinon on affiche l'erreur
                    console.log(error);
                    this.errorMessages = "Le nom d'utilisateur ou/et le mot de passe n'e sont pas valide.";
                       
                });
            }
        }
    }
    
}
</script>

<style lang="scss" scoped>
form {
  margin: 9rem 0;
}
</style>