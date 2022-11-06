<template>
  <div class="clickable">
    <v-card class="margin-bot">
      <v-card-text
        class="margin-bot pad-bot clickable"
        :to="{ path: '/questions', query: { id: question.id } }"
        router
      >
        {{ question.question }}
      </v-card-text>
    </v-card>
    <div v-if="interact" class="margin-bot">
      <div class="btn-group">
        <v-btn
          outlined
          :color="
            question.likes && user && question.likes.includes(user.id)
              ? 'primary'
              : null
          "
          class="margin-right"
        >
          {{ question.likes ? question.likes.length : '' }}
          <v-icon>
            {{
              question.likes && user && question.likes.includes(user.id)
                ? 'mdi-cookie'
                : 'mdi-cookie-outline'
            }}
          </v-icon>
        </v-btn>
        <v-btn outlined class="margin-right" color="secondary">
          {{
            question.comments && question.comments.count
              ? question.comments.count
              : ''
          }}
          <v-icon> mdi-comment-outline </v-icon>
        </v-btn>
        <v-btn outlined color="primary">
          {{ question.subscribers ? question.subscribers.length : '' }}
          <v-icon> face </v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionDisplay',
  props: {
    question: {
      type: Object,
      required: true,
      default: null
    },
    type: {
      type: String,
      required: false,
      default: null
    },
    interact: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  }
}
</script>
<style></style>
