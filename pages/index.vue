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
            We are centered around asking questions. We are not twitter giving hottakes you didn't ask for. You get what you ask for in the form of answers to your questions.
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
          <v-carousel hide-delimiters style="max-width: 1000px; margin: auto;" v-if="!$vuetify.breakpoint.mobile">
              <v-carousel-item
                v-for="(pic, i) in pics"
                :key="i"
                :src="pic"
              >
              </v-carousel-item>
            </v-carousel>


          <br>
          <h2 class="white--text outline-text">
            The Catch
          </h2>

          <p>
            <ul>
              <li>
                You cannot see the responses until you respond
                <!-- <v-img src="./demo-commentHide.PNG">
                </v-img> -->
              </li>
              <li>
                You can only comment once per question with out creating an account. To ask a question you need to register.
                <!-- <v-img src="./demo-rando.PNG">
                </v-img> -->
              </li>

              <li>
                Your profile and responses to questions are anonymous however others can request to DM you.
                <!-- <v-img src="./demo-comments.PNG">
                </v-img> -->
              </li>
              <li>
                The only thing that identifies you is your <a>
                  <enneagram-instructions
                    :label="'enneagram personality'"
                  /></a> (you can be "unknown"), and you can sort the responses by personality type

                <!-- <v-img src="./demo-sorting.PNG">
                </v-img> -->
              </li>
            </ul>
          </p>

          <!-- <p>
            We need to find those that are similar to us and be accepting of
            those that are different
          </p> -->
          <br>
          <!-- <p>That's why <span class="boldify">9takes</span> is here</p> -->
        </v-card-text>
        <br>
      </v-card>
      <br>
      <v-divider />
      <br>

      <!-- <v-card class="row-fif">
        <v-card-title class="headline">
          <h3 class="primary_v--text">
            Find people similar to you
          </h3>
        </v-card-title>
        <v-card-text class="center-mid">
          <p style="margin: 23px">
            What are they doing? How are you similar?
            Where Are they?
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn outlined to="/blog" color="secondary">
            <v-icon color="secondary">
              keyboard_arrow_left
            </v-icon>
            Go to the Blog
          </v-btn>
        </v-card-actions>
      </v-card> -->
      <!-- <div class="row-mid"> -->
      <v-card class="row-fif" flat>
        <v-card-title class="headline">
          Join Waitlist
        </v-card-title>
        <div class="center-mid">
          <p style="margin: 23px" />
        </div>
        <v-card-actions>
          <v-text-field
            v-model="email"
            style="margin: 10px"
            :rules="emailRules"
            label="E-mail"
            append-icon="mdi-send"

            @keydown.enter="send"
            @click:append="send"
          />
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
      <!-- <v-divider />
      <br />
      <v-card class="row-fif" flat>
        <h3 class="primary_v--text">Blog</h3>
        <div class="center-mid">
          <p style="margin: 23px">
            Topics, implications, predictions, and musings surrounding 9takes
            will be discussed.
          </p>
        </div>
        <v-card-actions>
          <v-btn outlined to="/blog" color="secondary">
            <v-icon color="secondary"> keyboard_arrow_left </v-icon>
            Read Blog
          </v-btn>
        </v-card-actions>
      </v-card>
      <br /> -->
      <!-- <v-divider /> -->
      <br>
      <!-- </div> -->
      <!-- <v-card class="row-fif" flat>
        <v-card-title class="headline">
          <h3 class="primary_v--text">One More Thing</h3>
        </v-card-title>
        <v-card-text class="center-mid">
          <p style="margin: 23px">
            Questions and Comments are <b>anonymous</b>
            <br />
            The only thing that identifies you in the community is your
            personality type if you know it
          </p>
        </v-card-text>
      </v-card> -->
      <v-spacer />
    </v-card>
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

    ]
  }),
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    async send () {
      console.log(this.email)
      const resp = await this.$axios
        .post(`${endpoints.addEmail}`, { email: this.email })
        console.log(resp)
    }
  },

  head () {
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
  h2, p {
  max-width: 500px;
  margin: auto;
  }
}

.index-page p {
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
