<template>
  <v-form v-model="valid">
    <v-card flat class="m-col">
      <v-card-text>
        <v-textarea
          v-model="context"
          placeholder="Helpful context"
          outlined
          cols="12"
          md="4"
          type="text"
          rows="3"
          auto-grow
          hide-details
          class="pad-bot limit-height"
          hint="Provide any relevant context"
        />

        <v-text-field
          v-model="question"
          :counter="500"
          label="Question"
          required
        />
      </v-card-text>

      <v-card-actions>
        <v-dialog v-model="dialog" width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="red lighten-2"
              dark
              v-bind="attrs"
              v-on="on"
              @click="getUrl"
            >
              Submit
            </v-btn>
          </template>

          <v-card>
            <h1>You are the <b>moderator</b> of this question:</h1>
            <h2>{{ question }}</h2>
            <v-divider />
            <v-card-subtitle>
              With great power comes great responsibility
            </v-card-subtitle>

            <v-card-text> Url: {{ url }} </v-card-text>

            <v-divider />

            <v-card-actions>
              <v-btn outlined small color="red" @click="dialog = false">
                Not Ready
              </v-btn>
              <v-btn
                outlined
                small
                color="secondary"
                :disabled="!url"
                @click="addQuestion"
              >
                I accept
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </v-card>

    <div style="display: flex">
      <div id="question-pic" class="question-background">
        {{ question }}
      </div>
    </div>

    <!-- <img v-if="pngSrc" :src="pngSrc" :style="{width: width, height: height}" /> -->
    <div :style="{ margin: '10px' }">
      <v-img v-if="pngSrc" :height="height" :width="width" :src="pngSrc" />
    </div>
  </v-form>
</template>

<script>
import { endpoints } from '../../models/endpoints'
export default {
  name: 'Personality',
  props: {},
  middleware: ['accessToken'],
  data() {
    return {
      question: '',
      context: '',
      dialog: false,
      valid: false,
      pngSrc: '',
      height: 0,
      width: 0,
      url: '',
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
  },

  mounted() {
    this.question = this.$route.query.question
  },
  methods: {
    async getUrl() {
      try {
        const resp = await this.$axios.post(`${endpoints.getUrl}`, {
          question: this.question.replace('?', ''),
        })
        this.url = resp.data.url
      } catch (e) {
        console.log(e)
        this.$store.dispatch('toastError', 'Failed to get url')
      }
    },
    async addQuestion() {
      if (this.user) {
        const questionToSend = this.question.replace('?', '')
        const question = document.getElementById('question-pic')
        this.height = question.offsetHeight
        this.width = question.offsetWidth
        this.pngSrc = await this.turnIntoPng(question)

        const data = {
          context: this.context,
          question: questionToSend,
          img: this.pngSrc,
          type: this.user.enneagramId,
          url: this.url,
        }

        const resp = await this.$axios.post(`${endpoints.questionAdd}`, data)
        if (resp && resp.data) {
          this.$store.commit('addAllQuestions', [resp.data])
          this.$store.dispatch('toastSuccess', 'Asked Question')
          this.goToQuestion(data)
        } else {
          this.$store.dispatch('toastError', 'Failed to Ask Question')
        }
      } else {
        this.$store.dispatch('toastError', 'Must Login')
      }

      this.dialog = false
    },
    goToQuestion(item) {
      this.$router.push({ path: `/questions/${item.url}` })
      this.$router.go(1)
    },
  },
}
</script>

<style lang="scss"></style>
