<template>
  <v-container>
    <h1>Search for Questions</h1>

    <v-combobox
      v-model="selection"
      :items="typeAhead"
      :search-input.sync="question"
      label="Search Questions"
      :menu-props="{ closeOnContentClick: true }"
      :item-text="question"
      @update:list-index="change"
      @keydown.enter="addQuestion(question)"
    >
      <template v-slot:append>
        <v-row>
          <heartbeat v-if="typeAheadLoading" class="heart" />
          <v-btn
            v-if="!typeAheadLoading && question && key === -1"
            text
            @click="addQuestion(question)"
          >
            <v-icon>search</v-icon>
          </v-btn>
        </v-row>
      </template>
      <template v-slot:item="{ item }">
        <v-list-item @click.stop.prevent="goToQuestion(item)">
          {{ item.question }}
          <v-spacer />
          <v-list-item-action @click.stop>
            <v-btn icon>
              <v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-combobox>
    <v-spacer />

    <div>
      <h2>All Questions</h2>
      <v-col>
        Total: {{ totalQuestions }}
        <v-card v-for="q in allQuestions" :key="q.id" class="margin-bot">
          <v-textarea
            :value="q.question"
            type="text"
            rows="1"
            auto-grow
            readonly
            flat
            solo
            hide-details
            class="pad-bot"
            @click="goToQuestion(q)"
          />
          <v-card-actions>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  outlined
                  small
                  v-bind="attrs"
                  class="margin-right"
                  :class="{
                    'btn-selected': q.likes.includes($auth.user.id),
                  }"
                  v-on="on"
                  @click="likeQuestion(q)"
                >
                  <v-icon>
                    {{
                      q.likes.includes($auth.user.id)
                        ? 'mdi-cookie'
                        : 'mdi-cookie-outline'
                    }}
                  </v-icon>
                </v-btn>
              </template>
              {{ q.likes.length }}
            </v-tooltip>
            <v-btn outlined small class="margin-right" @click="goToQuestion(q)">
              <v-icon color="primary">
                mdi-comment-outline
              </v-icon>
            </v-btn>
            <v-btn
              outlined
              small
              class="remove-margin"
              :class="{
                'btn-selected': q.subscribers.includes($auth.user.id),
              }"
              @click="subscribe(q)"
            >
              <span class="peep-btn">
                {{ q.subscribers.includes($auth.user.id) ? 'peeped' : 'peep' }}
              </span>
              <v-icon> face </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-row
          v-if="questionsCount < totalQuestions && !questionsLoading"
          @click="loadMoreQuestions"
        >
          <v-btn>Load More</v-btn>
        </v-row>
        <v-progress-linear v-else-if="questionsLoading" indeterminate />
      </v-col>
    </div>
  </v-container>
</template>

<script>
import debounce from 'lodash.debounce'
import Heartbeat from '../../components/shared/heart'
import { getQuestionsFromData } from '../../utils'
import { endpoints } from '~/models/endpoints'
export default {
  name: 'Index',

  components: { Heartbeat },
  data () {
    return {
      question: '',
      typeAhead: [],
      allQuestions: [],
      pageSize: 10,
      selection: null,
      questionsCount: 0,
      typeAheadLoading: false,
      questionsLoading: false,
      key: -1
    }
  },
  computed: {
    questions () {
      return this.$store.getters.getAllQuestions
    },
    totalQuestions () {
      return this.$store.getters.getAllQuestionsCount
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
    },
    questions (questions) {
      this.allQuestions = Object.keys(questions).map((q) => {
        return questions[q]
      })
    },
    allQuestions (val) {
      this.questionsCount = val.length
    }
  },
  mounted () {
    if (!this.totalQuestions) {
      this.$store.dispatch('getPaginatedQuestions', this.pageSize)
    } else {
      const questions = this.$store.getters.getAllQuestions
      this.allQuestions = Object.keys(questions).map((q) => {
        return questions[q]
      })
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
      if (this.key === -1) {
        const resp = await this.$axios.get(
          `${endpoints.questionAdd}/${question}`
        )
        if (resp) {
          this.goToQuestion(resp.data)
          this.$store.dispatch('toastSuccess', 'Asked Question')
        } else {
          this.$store.dispatch('toastError', 'Failed to Ask Question')
        }
      }
    },
    goToQuestion (item) {
      this.typeAhead = []
      this.$router.push({ path: `/questions/${item.id}` })
      this.$router.go(1)
    },

    async likeQuestion (q) {
      try {
        const isAlreadyLiked = q.likes.includes(this.$auth.user.id)
        let resp = null
        let newLikes = []
        if (!isAlreadyLiked) {
          newLikes = [...q.likes, this.$auth.user.id]
          resp = await this.$axios.get(`${endpoints.likeQuestion}/${q.id}/add`)
        } else {
          newLikes = q.likes.filter(l => l !== this.$auth.user.id)
          resp = await this.$axios.get(
            `${endpoints.likeQuestion}/${q.id}/remove`
          )
        }
        if (resp) {
          q.likes = [...newLikes]
          if (!isAlreadyLiked) {
            this.$store.dispatch('toastSuccess', 'Liked Comment')
          } else {
            this.$store.dispatch('toastSuccess', 'Unliked Comment')
          }
        }
      } catch (error) {
        console.log(error)
        this.$store.dispatch('toastError', 'Question Like Failed')
      }
    },

    async subscribe (q) {
      try {
        const isAlreadySubed = q.subscribers.includes(this.$auth.user.id)
        let resp = null
        let newSubscribers = []
        if (!isAlreadySubed) {
          newSubscribers = [...q.subscribers, this.$auth.user.id]
          resp = await this.$axios.get(`${endpoints.subQuestion}/${q.id}/add`)
        } else {
          newSubscribers = q.subscribers.filter(l => l !== this.$auth.user.id)
          resp = await this.$axios.get(
            `${endpoints.subQuestion}/${q.id}/remove`
          )
        }
        if (resp) {
          q.subscribers = [...newSubscribers]
          if (!isAlreadySubed) {
            this.$store.dispatch('toastSuccess', 'Subscribed')
          } else {
            this.$store.dispatch('toastSuccess', 'Unsubscribed')
          }
          this.$store.commit('setRefreshDashboard', true)
        }
      } catch (error) {
        console.log(error)
        this.$store.dispatch('toastError', 'Question Like Failed')
      }
    },
    async loadMoreQuestions () {
      this.questionsLoading = true
      await this.$store.dispatch('getPaginatedQuestions', this.pageSize)
      this.questionsLoading = false
    },

    change (event) {
      this.key = event
    }
  }
}
</script>

<style></style>
