<template>
  <footer class="master-container footer footer-shadow">
    <p class="no-margin">
      <v-btn
        icon
        href="https://www.instagram.com/9takesdotcom/"
        target="_blank"
        class="no-decor"
        alt="instagram icon"
      >
        <v-icon color="secondary">
          mdi-instagram
        </v-icon>
      </v-btn>
      <v-btn
        icon
        href="https://twitter.com/9takesdotcom"
        target="_blank"
        class="no-decor"
        alt="twitter icon"
      >
        <v-icon color="secondary">
          mdi-twitter
        </v-icon>
      </v-btn>
    </p>
    <p class="no-margin">
      Complete this
      <a
        href="https://c9dbh8z9igk.typeform.com/to/RHtEUlUt"
        target="_blank"
        alt="survey"
      >survey</a>
      so we know what to improve
      <!-- We welcome feedback and suggestions. Please send to <a href="mailto:usersup@9takes.com">usersup@9takes.com</a> -->
    </p>
  </footer>
</template>

<script>
export default {}
</script>

<style>
.footer {
  background: #ffffff !important;
  height: 64px;
  left: 0;
  right: 0;
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
.no-decor {
  text-decoration: none;
}
</style>
