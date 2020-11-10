<template>
  <div>
    <v-btn
      class="ma-2"
      outlined
      :to="{path: '/questions', query: {}}"
      router
    >
      <v-icon> keyboard_backspace</v-icon>
      All questions
    </v-btn>
    <selected-question />
  </div>
</template>

<script>
import SelectedQuestion from '../../components/questions/selectedQuestion'
export default {
  name: 'Id',
  components: { SelectedQuestion }
}
</script>

<style>
</style>
