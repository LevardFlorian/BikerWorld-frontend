<template>
  <footer class="footer">
    <div class="footer__network">
      <a class="footer__network__item" href="javascript:void(0)">Facebook</a>
      <span> - </span>
      <a class="footer__network__item" href="javascript:void(0)">Instagram</a>
      <span> - </span>
      <a class="footer__network__item" href="javascript:void(0)">Twitter</a>
    </div>
    <div class="footer__nav">
      <RouterLink to="/contact"
        ><a class="footer__nav__item" href="javascript:void(0)"
          >Contact</a
        ></RouterLink
      >
      <span> - </span>
      <RouterLink to="/mentions-legales"
        ><a class="footer__nav__item" href="javascript:void(0)"
          >Mentions légales</a
        ></RouterLink
      >
    </div>
  </footer>
</template>

<script>
export default {};
</script>