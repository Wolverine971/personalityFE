<template>
  <div>
    <h1>Personality Walls</h1>
    <v-select
      v-model="enneagramType"
      :items="enneagramTypes"
      label="Which personality would you like to view?"
      @change="formDisabled = false"
    />
  </div>
</template>

<script>
export default {
  name: 'Personality',
  data: () => ({
    enneagramTypes: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    enneagramType: null
  }),
  // middleware: ['loggedIn'],
  middleware: ['accessToken'],
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  watch: {
    enneagramType (val) {
      this.$router.push({ path: `/personality/${val}` })
      this.$router.go(1)
    }
  }
}
</script>

<style></style>
