<template>
  <form @submit.prevent="onFormSubmit">
    <fieldset>
      <div class="form__field">
        <label class="form__field__label">Prénom</label>
        <input
          v-model="firstName"
          class="form__field__input"
          type="text"
          placeholder="John"
        />
      </div>
      <div class="form__field">
        <label class="form__field__label">Nom</label>
        <input
          v-model="lastName"
          class="form__field__input"
          type="text"
          placeholder="Doe"
        />
      </div>
      <div class="form__field">
        <label class="form__field__label">Adresse e-mail</label>
        <input
          v-model="email"
          class="form__field__input"
          type="text"
          placeholder="johndoe@bidon.zut"
        />
      </div>
      <div class="form__field">
        <label class="form__field__label">Identifiant</label>
        <input
          v-model.trim="username"
          class="form__field__input"
          type="text"
          placeholder="johndoe"
        />
      </div>
      <div class="form__field">
        <label class="form__field__label">Mot de passe</label>
        <input
          v-model.trim="password"
          class="form__field__input"
          type="password"
          placeholder="Mot de passe"
        />
      </div>
      <div class="form__field">
        <label class="form__field__label">Confirmation du mot de passe</label>
        <input
          v-model.trim="passwordConfirm"
          class="form__field__input"
          type="password"
          placeholder="Confirmez le mot de passe"
        />
      </div>
    </fieldset>
    <div>
      <button class="button" role="submit">Créer le compte</button>
    </div>

    <div v-if="errorMessages" class="alert error">
      {{ errorMessages }}
    </div>
  </form>
</template>

<script>

import userService from '../../services/userService'

export default {
    data() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            passwordConfirm: "",
            errorMessages: ""
        }
    },
    methods: {
        
        // on déclenche cette méthode à la soumission du formulaire
        // à chaque soumission, on va évaluer les erreurs présentes dans le form
        onFormSubmit() {
            // analyser les valeurs saisies dans tous les champs
            // => on stocke un message d'erreur par champ en erreur
            // => stocker les erreurs dans un array
            let myHeaders = new Headers();
            myHeaders.append('Accept', '*/*');
            const errors = [];

            // analyse des valeurs saisies
            // champ prénom :
            if (this.firstName.length < 2) {
                // on ajoute un message d'erreur dans l'array errors
                errors.push("Le prénom doit contenir au moins deux caractères.");
            }
            // champ nom :
            if (this.lastName.length < 2) {
                // on ajoute un message d'erreur dans l'array errors
                errors.push("Le nom doit contenir au moins deux caractères.");
            }
            // champ email :
            if (this.email.search('@') === -1 || this.email.search('.')) {
                // on ajoute un message d'erreur dans l'array errors
                errors.push("Le format de l'adresse email est incorrect.");
            }
            if(this.username.length < 3) {
                errors.push("Le nom d'utilisateur est trop court (au moins 3 caractères)");
            }
            if(this.password !== this.passwordConfirm) {
                errors.push("Les mots de passe ne correspondent pas.");
            }

            this.errorMessages = errors.join(', ');

            // si pas d'erreur => on envoie les données à l'API
            if (!this.errorMessages) {
                userService.registerUser({
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    username: this.username,
                    password: this.password
                })
                .then((response) => {
                    // lorsque l'API répond favorablement, on navigue automatiquement vers la page de connexion
                    
                    // on utilise .push() pour ajouter un chemin à l'historique du router == on change l'url courante
                    // une mauvaise pratique dans le développement de jwt-auth nous oblige à gérer manuellement le status HTTP
                    // si jwt auth refuse une action (par ex. registration), il renverra une erreur mais dans une réponse avec code de succès
                    if (!response.data.statusCode || response.data.statusCode === 200) {
                        // on peut utiliser this.$router qui correspond au routeur instancié dans router.js et fourni à vue dans index.js
                        this.$router.push('/connexion');
                    } else {
                        this.errorMessages = response.data.message;
                    }
                })
                .catch((error) => {
                    // sinon (erreur côté WP à la création), on affiche les erreurs dans le template
                    this.errorMessages = error.response.data.message;
                });
            }
        }
    }
}
</script>