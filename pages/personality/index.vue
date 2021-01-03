<template>
  <div>
    Personality Walls
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
  middleware: 'authenticated',
  computed: {},
  watch: {
    enneagramType (val) {
      this.$router.push({ path: `/personality/${val}` })
      this.$router.go(1)
    }
  }
}
</script>

<style></style>
