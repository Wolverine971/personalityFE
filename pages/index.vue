<template>
  <div class="align-center index-page">
    <v-card class="m-col align-center" flat>
      <v-card flat class="center-mid">
        <v-card-title class="headline">
          <h2 class="white--text outline-text" style="margin: auto; padding: 10px">
            How are we baking in empathy and curiosity?
          </h2>
        </v-card-title>
        <v-card-text class="center-mid">
          <br>
          <p>
            We are centered around asking questions. We are not twitter giving hottakes you didn't ask for. You get what
            you ask for in the form of answers to your questions.
          </p>
          <br>
          <p>
            What kind of responses do you get?
          <ul>
            <li>
              Comments
            </li>
            <li>
              Media: images, memes, and video replies
            </li>
            <li>
              Resources: links, blogs, articles
            </li>
          </ul>
          </p>
          <br>
          <v-carousel hide-delimiters style="max-width: 1000px; margin: auto;" v-if="!$vuetify.breakpoint.mobile">
            <v-carousel-item v-for="(pic, i) in pics" :key="i" :src="pic">
            </v-carousel-item>
          </v-carousel>
          <br>
          <h2 class="white--text outline-text">
            The Catch
          </h2>
          <br>
          <ul>
            <li>
              You cannot see the responses until you respond
            </li>
            <li>
              You can only comment once per question with out creating an account. To ask a question you need to
              register.
            </li>
            <li>
              Your profile and responses to questions are anonymous however others can request to DM you.

            </li>
            <li>
              The only thing that identifies you is your <a>
                <enneagram-instructions :label="'enneagram personality'" @typeSelected="typeChosen" /></a> (you can be
              "unknown"), and you can sort the responses by personality type

            </li>
          </ul>

          <br>
        </v-card-text>
        <br>
      </v-card>
      <br>
      <v-divider />
      <br>

      <v-card class="row-fif" flat>
        <v-card-title class="headline">
          Join Waitlist
        </v-card-title>
        <!-- <div class="center-mid">
            <p style="margin: 23px" />
          </div> -->
        <v-card-actions>
          <v-text-field v-model="email" style="margin: 10px" :rules="emailRules" label="E-mail" append-icon="mdi-send"
            @keydown.enter="send" @click:append="send" />
          <!-- <v-input
            v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            append-icon="mdi-send"
            @click:append="send"
          >
          </v-input> -->
          <!-- <v-btn outlined to="/questions" >
              Join Waitlist
              <v-icon color="secondary"> keyboard_arrow_right </v-icon>
            </v-btn> -->
        </v-card-actions>
      </v-card>
      <br>

      <br>

      <v-spacer />
    </v-card>
    <v-dialog v-model="dialog" max-width="800">

      <div>
        <v-card class="row-fif" flat>
          <v-card-title class="headline">
            Join the waitlist and meet other Enneagram type {{ enneagramType }}'s
            <br>
            <v-spacer />
          </v-card-title>

          <v-card-actions>
            <v-text-field v-model="email" style="margin: 10px" :rules="emailRules" label="E-mail" append-icon="mdi-send"
              @keydown.enter="send" @click:append="send" />
          </v-card-actions>
        </v-card>

      </div>

    </v-dialog>
  </div>
</template>

<script>
import { endpoints } from '../models/endpoints'
export default {
  layout: 'home',
  // <!-- https://introjs.com/ -->
  components: {
    EnneagramInstructions: () => import('../components/shared/enneagramInstructions.vue')
    // SvgBackground: () => import('../components/shared/svgBackground'),
  },
  data: () => ({
    email: '',
    emailRules: [
      // v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    pics: [
      './demo2-comment.PNG',
      './demo-commentHide.PNG',
      './demo-rando.PNG',
      './demo-sorting.PNG'

    ],
    dialog: false,
    enneagramType: null
  }),
  computed: {
    user() {
      return this.$store.getters.getUser
    }
  },
  methods: {
    async send() {
      console.log(this.email)
      const resp = await this.$axios
        .post(`${endpoints.addEmail}`, { email: this.email })
      console.log(resp)
      this.$store.dispatch('toastSuccess', 'Signed up', 5000)
      this.email = ''
      this.dialog = false
    },
    typeChosen(enneagramType) {
      this.enneagramType = enneagramType
      this.dialog = true

    }
  },

  head() {
    const title = 'Home'
    const description = 'Community for Enneagram people'
    const href = 'https://9takes.com/'

    return {
      titleTemplate: title,
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description
        },
        {
          property: 'og:url',
          content: href
        },
        {
          property: 'og:description',
          content: description
        },
        { property: 'og:title', content: title },
        {
          name: 'twitter:description',
          content: description
        },
        {
          name: 'twitter:title',
          content: title
        },
        {
          name: 'twitter:site',
          content: '@9takesdotcom'
        }
      ],

      link: [{ rel: 'canonical', href }]
    }
  }
}
</script>
<style lang="scss">
.row-mid {
  width: 100%;
  display: flex;
  justify-content: center;
}

.row-fif {
  display: flex !important;
  flex-direction: column;
  align-items: center;
  // width: 50%;
  // height: 190px;
  justify-content: center;
}

@media (max-width: 1265px) {
  .row-fif {
    width: 100%;
  }

  .row-mid {
    flex-direction: column;
    max-width: 500px;
  }

  .margin {
    margin: 1em 0;
  }
}

.center-mid {

  h2,
  p,
  ul,
  li {
    max-width: 500px;
    margin: auto;

  }
}

.index-page p,
ul,
li {
  // font-size: x-large;
  font-size: large;
  // color: white !important;
  color: black;
}

.boldify {
  font-size: xx-large;
  color: #f72585;
  // text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
  //   1px 1px 0 #000;
}
</style>
