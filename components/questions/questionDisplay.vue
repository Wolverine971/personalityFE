<template>
  <div class="clickable">
    <v-card class="margin-bot">
      <v-card-text class="margin-bot pad-bot clickable" :to="{ path: '/questions', query: { id: question.id } }" router>
        {{ question.question }}
      </v-card-text>
    </v-card>
    <div v-if="interact" class="margin-bot">
      <!-- <v-textarea
      :value="question.question"
      type="text"
      rows="1"
      outlined
      auto-grow
      readonly
      hide-details
      :to="{ path: '/questions', query: { id: question.id } }"
      router
      class="margin-bot"
    >
      <template v-if="!$vuetify.breakpoint.mobile && interact" slot="append">
        <v-btn
          outlined
          :class="{
            'btn-selected':
              question.likes && question.likes.includes($auth.user.id),
          }"
          class="margin-right"
        >
          {{ question.likes ? question.likes.length : '' }}
          <v-icon>
            {{
              question.likes && question.likes.includes($auth.user.id)
                ? 'mdi-cookie'
                : 'mdi-cookie-outline'
            }}
          </v-icon>
        </v-btn>
        <v-btn outlined class="margin-right">
          {{ question.comments ? question.comments.length : '' }}
          <v-icon color="primary">
            mdi-comment-outline
          </v-icon>
        </v-btn>
        <v-btn outlined class="btn-selected">
          {{ question.subscribers ? question.subscribers.length : '' }}
          <v-icon> face </v-icon>
        </v-btn>
      </template>
    </v-textarea>
    <div v-if="$vuetify.breakpoint.mobile && interact" class="margin-bot"> -->
      <div class="btn-group">
        <v-btn
          outlined
          :class="{
            'btn-selected':
              question.likes && question.likes.includes($auth.user.id),
          }"
          class="margin-right"
        >
          {{ question.likes ? question.likes.length : '' }}
          <v-icon>
            {{
              question.likes && question.likes.includes($auth.user.id)
                ? 'mdi-cookie'
                : 'mdi-cookie-outline'
            }}
          </v-icon>
        </v-btn>
        <v-btn outlined class="margin-right">
          {{ question.comments ? question.comments.length : '' }}
          <v-icon color="primary">
            mdi-comment-outline
          </v-icon>
        </v-btn>
        <v-btn outlined class="btn-selected">
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
  mounted () {
    console.log(this.$vuetify.breakpoint.mobile)
  }
}
</script>
<style>
</style>
