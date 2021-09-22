<template>
  <v-app>
    <v-container>
      <toolbar v-if="user" />

      <header v-else id="toolbar" class="toolbar master-container">
        <v-btn
          :to="{ path: '/auth', query: {} }"
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

import toolbar from '~/components/shared/toolbar'
import theFooter from '~/components/shared/theFooter'
export default {
  /* eslint-disable no-console */
  name: 'HomeLayout',
  components: { toolbar, theFooter },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  }
}
</script>

<style>
.center{
    margin: auto;
}
</style>
