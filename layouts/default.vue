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

import toolbar from '~/components/shared/toolbar'
import theFooter from '~/components/shared/theFooter'
export default {
  /* eslint-disable no-console */
  name: 'DefaultLayout',
  components: { toolbar, theFooter }

}
</script>

<style>
.page-container{
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
