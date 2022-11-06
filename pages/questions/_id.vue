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
    <client-only>
      <selected-question :question="question" />
    </client-only>
  </div>
</template>

<script>
import { endpoints } from '../../models/endpoints'
export default {
  name: 'Id',
  components: {
    SelectedQuestion: () =>
      import('../../components/questions/selectedQuestion'),
  },
  async asyncData({ params, $axios, store }) {
    store.commit('setAllCommentsCount', 0)
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
      const resp = await $axios.get(`${endpoints.getJustQuestion}/${id}`)
      // .then((resp) => {
      if (resp && resp.data) {
        question = resp.data
      } else {
        throw new Error('No Question')
      }
      // })
      // .catch((error) => {
      //   console.log(error)
      // })
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
            text: 'See what others have to say',
          },
        },
      ],
    }

    return { question, structuredData }
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
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

  // https://dinojoaocosta.medium.com/how-to-make-twitter-preview-your-website-links-5b20db98ac4f
  head() {
    const question = this.question ? this.question.question : {}
    const title = `Question: "${question.question || '9takes question'}"`
    // const description = this.blog ? this.blog.description : 'Personality Blog'
    const href = `https://9takes.com/question/${question.url}`

    return {
      titleTemplate: title,
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Question titled "${question.question}"`,
        },
        {
          property: 'og:url',
          content: href,
        },
        {
          property: 'og:image',
          content: `https://personality-app.s3.amazonaws.com/${question.img}`,
        },
        {
          property: 'og:image:secure_url',
          content: `https://personality-app.s3.amazonaws.com/${question.img}`,
        },
        {
          property: 'og:description',
          content: `Question titled "${question.question}"`,
        },
        { property: 'og:title', content: question.question },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:description',
          content: `Question titled "${question.question}"`,
        },
        {
          name: 'twitter:title',
          content: question.question,
        },
        {
          name: 'twitter:image',
          content: `https://personality-app.s3.amazonaws.com/${question.img}`,
        },
        {
          name: 'twitter:site',
          content: '@9takesdotcom',
        },
      ],
      script: [
        {
          src: 'https://cdnjs.deepai.org/deepai.min.js',
          async: true,
          defer: true,
        },
        { type: 'application/ld+json', json: this.structuredData },
      ],
      link: [{ rel: 'canonical', href }],
    }
  },
}
</script>

<style></style>
