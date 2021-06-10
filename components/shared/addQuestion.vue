<template>
  <v-combobox
    v-model="selection"
    :items="typeAhead"
    :search-input.sync="question"
    :label="
      !typeAheadLoading && question && key === -1
        ? 'Create Question'
        : 'Search Questions'
    "
    :prepend-inner-icon="
      !typeAheadLoading && question && key === -1
        ? 'add_circle_outline'
        : 'search'
    "
    :menu-props="{ closeOnContentClick: true }"
    :item-text="question"
    maxlength="500"
    counter
    @update:list-index="change"
    @click:prepend-inner="addQuestion(question)"
  >
    <template v-slot:append>
      <heartbeat v-if="typeAheadLoading" class="heart" />
      <v-btn
        v-if="!typeAheadLoading && question && key === -1"
        class="btn-height"
        text
        @click="addQuestion(question)"
      >
        Add Question
      </v-btn>
    </template>
    <template v-slot:item="{ item }">
      <v-list-item @click.stop.prevent="goToQuestion(item)">
        {{ item.question }}
        <v-spacer />
        <v-list-item-action>
          <div class="row">
            <v-btn icon>
              <v-icon> mdi-cookie-outline </v-icon>
              {{ item.likes }}
            </v-btn>
            <v-btn icon>
              <v-icon> mdi-comment-outline </v-icon>
              {{ item.comments }}
            </v-btn>
            <v-btn outlined icon>
              <v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
          </div>
        </v-list-item-action>
      </v-list-item>
    </template>
  </v-combobox>
</template>

<script>
import debounce from 'lodash.debounce'
import { getQuestionsFromData } from '../../utils'
import { endpoints } from '~/models/endpoints'
export default {
  name: 'AddQuestion',

  components: { Heartbeat: () => import('../../components/shared/heart') },
  data () {
    return {
      question: '',
      typeAhead: [],
      pageSize: 10,
      selection: null,
      questionsCount: 0,
      typeAheadLoading: false,
      questionsLoading: false,
      key: -1
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  watch: {
    selection (val, oldVal) {
      if (val && val !== oldVal) {
        if (typeof val === 'object') {
          this.goToQuestion(val)
          this.selection = ''
        }
      }
    },
    question (val, oldVal) {
      if (val && val !== oldVal) {
        this.typeAheadLoading = true
        this.questionTypeAhead(val)
      }
    }
  },
  methods: {
    questionTypeAhead: debounce(function (val) {
      if (val) {
        this.$axios
          .get(`${endpoints.questionTypeAheadRoute}/${val}`)
          .then((resp) => {
            if (resp && resp.data) {
              this.typeAhead = getQuestionsFromData(resp.data)
            }
            this.typeAheadLoading = false
          })
      }
    }, 1000),
    async addQuestion (question) {
      if (this.user) {
        if (this.key === -1) {
          const questionToSend = question.replace('?', '')
          const resp = await this.$axios.get(
            `${endpoints.questionAdd}/${questionToSend}/${this.user.enneagramId}`
          )
          if (resp) {
            this.goToQuestion(resp.data)
            this.$store.dispatch('toastSuccess', 'Asked Question')
          } else {
            this.$store.dispatch('toastError', 'Failed to Ask Question')
          }
        }
      } else {
        this.$store.dispatch('toastError', 'Must Login')
      }
    },
    goToQuestion (item) {
      this.typeAhead = []
      this.$router.push({ path: `/questions/${item.id}` })
      this.$router.go(1)
    },

    change (event) {
      this.key = event
    }
  }
}
</script>

<style>
.btn-height {
  height: 15px !important;
}
</style>
