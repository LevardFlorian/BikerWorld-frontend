<template>
  <main class="main">
    <div class="notFound">
      <img src="../../assets/images/404.png" alt="">
      <h1 class="notFound__title">404 Not Found</h1>
      <p class="notFound__contnet">La ressource demandée n'existe pas...</p>
      <RouterLink class="header__profile" to = "/">
        <button>retour à l'accueil</button></RouterLink>
    </div>
  </main>
</template>

<script>
export default {
  
};
</script>