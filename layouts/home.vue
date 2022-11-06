<template>
  <v-app class="mainBackground">
    <!-- <svg-background /> -->
    <v-container class="mainContainer">
      <toolbar v-if="user" />

      <header v-else id="toolbar" class="toolbar master-container">
        <v-btn
          :to="{ path: '/auth/register', query: {} }"
          color="secondary"
          class="shadow btn-shrink-mobile center"
        >
          Login/ Register
        </v-btn>
      </header>

      <v-main class="main-margin">
        <v-container>
          <nuxt />
        </v-container>
      </v-main>
      <the-footer />
    </v-container>
  </v-app>
</template>

<script>
export default {
  /* eslint-disable no-console */
  name: 'HomeLayout',
  components: {
    theFooter: () => import('~/components/shared/theFooter'),
    toolbar: () => import('~/components/shared/toolbar'),
    SvgBackground: () => import('../components/shared/svgBackground'),
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
  },
}
</script>

<style>
.center {
  margin: auto;
  padding: 5px;
}
.mainBackground {
  background-image: url('/group0.png') !important;
}
</style>
