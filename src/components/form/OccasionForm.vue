<template>
  <form class="form">
    <fieldset class="form__field">
      <h6 class="form__field__title">Identité</h6>
      <div class="form-row">
        <label class="form__field__label" for="prenom">Mon prénom est </label>
        <input
          class="form__field__input"
          type="text"
          id="prenom"
          placeholder="Prénom"
          name="prenom"
        />
      </div>
      <div class="form-row">
        <label class="form__field__label" for="nom">Et mon nom, </label>
        <input
          class="form__field__input"
          type="text"
          id="nom"
          placeholder="Nom"
          name="nom"
        />
      </div>
    </fieldset>
    <fieldset class="form__field">
      <h6 class="form__field__title">Message</h6>
      <div class="form-row">
        <label class="form__field__label" for="email">Répondez-moi via</label>
        <input
          class="form__field__input"
          type="email"
          id="email"
          placeholder="Adresse e-mail"
          name="email"
          required
        />
      </div>
      <div class="form-row">
        <label class="form__field__label" for="message"
          >Je voulais vous dire que</label
        >
        <textarea
          class="form__field__input"
          id="message"
          placeholder="Votre message"
          name="message"
        ></textarea>
      </div>
    </fieldset>
    <div v-if="errorMessages" class="alert error">
      {{ errorMessages }}
    </div>

    <button class="form__field__button" role="submit">Envoyer</button>
  </form>
</template>

<script>
export default {};
</script>
