<template>
  <form class="form">
    <fieldset class="form__field">
      <h6 class="form__field__title">Identité</h6>
      <div class="form-row">
        <label class="form__field__label">Je suis</label>
        <div class="input-group">
          <input
            class="form__field__click"
            id="civilite-femme"
            type="radio"
            name="civilite"
            value="2"
            checked
          />
          <label class="form__field__radio" for="civilite-femme"
            >une femme /</label
          >
          <input
            class="form__field__click"
            id="civilite-homme"
            type="radio"
            name="civilite"
            value="1"
          />
          <label class="form__field__radio" for="civilite-homme"
            >un homme</label
          >
        </div>
      </div>
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
      <div class="form-row">
        <label class="form__field__label" for="source"
          >J'ai connu ce site grâce à
        </label>
        <select class="form__field__select" id="source" name="source">
          <option class="form__field__option" value="">choisir</option>
          <option class="form__field__option" value="fb">Facebook</option>
          <option class="form__field__option" value="twitter">Twitter</option>
          <option class="form__field__option" value="google">Google</option>
          <option class="form__field__option" value="bouche-a-oreilles">
            Bouche à oreilles
          </option>
          <option class="form__field__option" value="autre">Autre</option>
        </select>
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
      <div class="form-row">
        <label class="form__field__label">Et vous montrer ça aussi</label>
        <div class="div-file">
          <label for="file" class="form__field__label">Choisir une image</label>
          <input id="file" class="input-file form__field__input" type="file" />
        </div>
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
