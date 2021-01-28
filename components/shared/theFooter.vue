<template>
  <footer class="master-container footer footer-shadow">
    <p class="no-margin">
      <a href="https://www.instagram.com/9takesdotcom/" target="_blank" class="no-decor">
        <v-icon color="fpink">
          mdi-instagram
        </v-icon>
      </a>
      Socials
      <a href="https://twitter.com/9takesdotcom" target="_blank" class="no-decor">
        <v-icon color="fpink">
          mdi-twitter
        </v-icon>
      </a>
    </p>
    <p class="no-margin">
      Please complete this <a href="https://c9dbh8z9igk.typeform.com/to/RHtEUlUt" target="_blank">survey</a> before leaving 9takes. It helps make the community better!
      <!-- We welcome feedback and suggestions. Please send to <a href="mailto:usersup@9takes.com">usersup@9takes.com</a> -->
    </p>
  </footer>
</template>

<script>
export default {

}
</script>

<style>
.footer {
  background: #ffffff !important;
  height: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-style: groove;
  border-color: #921c69;
  position: absolute;
  bottom: 0;
  border-bottom: none;
  border-right: none;
  border-left: none;
}
.no-margin {
    margin: 0 !important;
}
.no-decor{
  text-decoration: none;
}

</style>
