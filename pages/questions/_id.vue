<template>
  <div>
    <v-btn
      class="ma-2"
      color="primary"
      :to="{ path: '/questions', query: {} }"
      router
    >
      <v-icon> keyboard_backspace </v-icon>
      All questions
    </v-btn>

    <selected-question :question="question" />
  </div>
</template>

<script>
import { endpoints } from '../../models/endpoints'
export default {
  name: 'Id',
  components: {
    SelectedQuestion: () =>
      import('../../components/questions/selectedQuestion')
  },
  async asyncData ({ params, $axios, store }) {
    const id = params.id
    let question = null
    if (store.getters.getUser) {
      question = await $axios
        .get(`${endpoints.getQuestion}/${id}`)
        .then((resp) => {
          if (resp && resp.data) {
            return resp.data
          } else {
            throw new Error('No Question')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      question = await $axios
        .get(`${endpoints.getJustQuestion}/${id}`)
        .then((resp) => {
          if (resp && resp.data) {
            return resp.data
          } else {
            throw new Error('No Question')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
    const structuredData = {
      '@context': 'https://schema.org',
      url: `https://9takes.com/${id}`,
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: question ? question.question : '9takes question',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'See what others have to say'
          }
        }
      ]
    }

    return { question, structuredData }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  // jsonld () {
  //   console.log(this.question)
  //   return {
  //     '@context': 'https://schema.org',
  //     url: `https://9takes.com/${this.$route.params.id}`,
  //     '@type': 'FAQPage',
  //     mainEntity: [
  //       {
  //         '@type': 'Question',
  //         name: this.question ? this.question.question : '9takes question',
  //         acceptedAnswer: {
  //           '@type': 'Answer',
  //           text: 'See what others have to say'
  //         }
  //       }
  //     ]
  //   }
  // },

  head () {
    const title = `Question: "${this.question ? this.question.question : '9takes question'}"`
    // const description = this.blog ? this.blog.description : 'Personality Blog'
    const href = `https://9takes.com/question/${this.question.url}`

    return {
      titleTemplate: title,
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Question titled "${this.question.question}"`
        },
        {
          property: 'og:url',
          content: href
        },
        {
          property: 'og:image',
          content: `https://personality-app.s3.amazonaws.com/${this.question.img}`
        },
        {
          property: 'og:description',
          content: `Question titled "${this.question.question}"`
        },
        { property: 'og:title', content: this.question.question },
        {
          name: 'twitter:card',
          content: 'summary'
        },
        {
          name: 'twitter:description',
          content: `Question titled "${this.question.question}"`
        },
        {
          name: 'twitter:title',
          content: this.question.question
        },
        {
          name: 'twitter:image',
          content: `https://personality-app.s3.amazonaws.com/${this.question.img}`
        },
        {
          name: 'twitter:site',
          content: '@9takesdotcom'
        }
      ],
      script: [
        {
          src: 'https://cdnjs.deepai.org/deepai.min.js',
          async: true,
          defer: true
        }, {type: 'application/ld+json', json: this.structuredData}
      ],
      link: [{ rel: 'canonical', href }]
    }
  }
}
</script>

<style>
</style>
