<template>
  <v-textarea
    :value="question.question"
    type="text"
    filled
    rows="1"
    auto-grow
    readonly
    hide-details
    :to="{ path: '/questions', query: { id: question.id } }"
    router
    class="pad-bot"
  >
    <template v-if="question.likes" slot="append">
      <v-btn
        outlined
        :class="{ 'btn-selected': question.likes.includes($auth.user.id) }"
        class="margin-right"
      >
        {{ question.likes.length }}
        <v-icon>
          {{
            question.likes.includes($auth.user.id)
              ? 'mdi-cookie'
              : 'mdi-cookie-outline'
          }}
        </v-icon>
      </v-btn>
      <v-btn outlined class="margin-right">
        {{ question.comments.length }}
        <v-icon color="primary">
          mdi-comment-outline
        </v-icon>
      </v-btn>
      <v-btn outlined class="btn-selected">
        {{ question.subscribers.length }}
        <v-icon> face </v-icon>
      </v-btn>
    </template>
  </v-textarea>
</template>

<script>
import { selectedQuestion } from '../../models/interfaces'
export default {
  name: 'QuestionDisplay',
  props: {
    question: {
      type: selectedQuestion,
      required: true,
      default: null
    }
  }
}
</script>
<style></style>
