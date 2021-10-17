<template>
  <v-app>
    <v-container>
      <toolbar />

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
  name: 'DefaultLayout',
  components: {
    theFooter: () => import('~/components/shared/theFooter'),
    toolbar: () => import('~/components/shared/toolbar')
  }
}
</script>

<style>
.page-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
