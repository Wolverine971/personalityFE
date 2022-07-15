<template>
  <div>
    <h1 class="primary_v--text">
      Personality Walls
    </h1>
    <v-tabs v-if="!$vuetify.breakpoint.mobile">
      <template>
        <v-tab
          across
          to="/personality"
          router
          nuxt
        >
          Home
        </v-tab>
      </template>
      <v-tab
        v-for="(type, i) in enneagramTypes"
        :key="i"
        across
        :to="`/personality/${type}`"
        router
        nuxt
      >
        {{ type }}
      </v-tab>
    </v-tabs>
    <v-select
      v-else
      v-model="enneagramType"
      :items="enneagramTypes"
      label="Which personality would you like to view?"
    />
    <nuxt-child />
  </div>
</template>

<script>
export default {
  name: 'Personality',
  data: () => ({
    enneagramTypes: ['Unknown', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    enneagramType: -1
  }),
  watch: {
    enneagramType (val) {
      this.$router.push({ path: `/personality/${val}` })
      this.$router.go(1)
    }
  },
  head () {
    return {
      title: 'Wall Selection',
      script: [
        {
          src: 'https://cdnjs.deepai.org/deepai.min.js',
          async: true,
          defer: true
        }
      ]
    }
  }

}
</script>

<style></style>
