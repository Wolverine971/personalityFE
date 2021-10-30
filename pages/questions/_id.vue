<template>
  <div>
    <v-btn
      class="ma-2"

      :to="{path: '/questions', query: {}}"
      router
      color="secondary"
    >
      <v-icon>
        keyboard_backspace
      </v-icon>
      All questions
    </v-btn>

    <selected-question />
  </div>
</template>

<script>
export default {
  name: 'Id',
  components: { SelectedQuestion: () => import('../../components/questions/selectedQuestion') }
}
</script>

<style>
</style>
