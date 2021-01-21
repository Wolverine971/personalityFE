<template>
  <div>
    <v-btn
      class="ma-2"
      outlined
      :to="{path: '/personality', query: {}}"
      router
    >
      <v-icon> keyboard_backspace</v-icon>
      Personality Selection
    </v-btn>
    <personality />
  </div>
</template>

<script>
export default {
  name: 'Type',
  components: { Personality: () => import('../../components/personality') },
  middleware: ['accessToken'],
  validate ({ params }) {
    if (params.type.match(/(?<!\S)\d(?!\S)/)) {
      return true
    } else {
      return false
    }
  },
  head () {
    return {
      title: 'Type ' + this.$route.params.type + ' Wall',
      script: [
        {
          src: 'https://cdnjs.deepai.org/deepai.min.js',
          async: true,
          defer: true
        }
      ],
      meta: [
        {
          hid: `${this.$route.params.type} description`,
          name: 'description',
          content:
          `Only enneagram type ${this.$route.params.type} can post here all other types can only look not touch`
        }
      ]
    }
  }
}
</script>

<style></style>
