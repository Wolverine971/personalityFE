<template>
  <div>
    Personality Page
    <v-select
      v-model="enneagramType"
      :items="enneagramTypes"
      label="Enneagram"
      @change="formDisabled = false"
    />
  </div>
</template>

<script>
export default {
  name: 'Personality',
  data: () => ({
    enneagramTypes: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    enneagramType: null
  }),
  middleware: 'authenticated',
  computed: {},
  watch: {
    enneagramType (val) {
      console.log(val)
      this.$router.push({ path: `/personality/${val}` })
      this.$router.go(1)
    }
  },
  mounted () {
    console.log('profile mounted')
  },

  methods: {}
}
</script>

<style></style>
