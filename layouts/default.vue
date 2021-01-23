<template>
  <v-app>
    <v-container>
      <toolbar />

      <v-main style="margin-top: 74px;">
        <v-container>
          <nuxt />
        </v-container>
      </v-main>
    </v-container>
  </v-app>
</template>

<script>

import toolbar from '~/components/shared/toolbar'
export default {
  /* eslint-disable no-console */
  name: 'DefaultLayout',
  components: { toolbar }

}
</script>

<style></style>
