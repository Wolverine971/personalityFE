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
import Personality from '../../components/personality'
export default {
  name: 'Type',
  components: { Personality },
  middleware: ['accessToken'],
  head () {
    return {
      title: this.$route.params.type
    }
  }
}
</script>

<style></style>
