<template>
  <div class="align-center">
    <v-card class="m-col align-center" flat>
      <v-card flat>
        <v-card-title class="headline">
          <h1 class="secondary--text center">
            9takes Beta
          </h1>
        </v-card-title>
        <v-card-subtitle class="min-marg-top">
          <h3 class="secondary--text" style="text-align: center">
            Ask questions, get the familiar and the unexpected
          </h3>
        </v-card-subtitle>
        <v-card-actions v-if="!user">
          <v-tooltip bottom :close-delay="1000" :open-delay="100">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                to="/auth/register"
                color="secondary"
                class="center signup-button"
                v-bind="attrs"
                v-on="on"
              >
                Join
                <!-- <v-icon color="secondary">
              keyboard_arrow_up
            </v-icon> -->
              </v-btn>
            </template>
            It'll be sooo great
          </v-tooltip>
        </v-card-actions>
      </v-card>
      <v-divider />

      <v-card flat>
        <v-card-text class="center-mid">
          <h2 class="secondary--text">
            <v-icon color="primary">
              flag
            </v-icon>
            Background
          </h2>
          <p>
            People are different, but they are also similar. The dividing line
            between the similarities and differences is not well understood.
            There are many ways to "classify" people or "label" them but how
            helpful or limiting are these labels?<b>
              It is no secret that the world is divided and division revolves
              around labeling others and a sense of certainty.</b>
            I want to disrupt this by introducing uncertainty in the form of
            questions and removing labels introducing anonymity. By doing so I
            hope to generate curiosity and maybe a little empathy.
          </p>
          <div>
            <h3>Two contrasting and unproductive trains of thought</h3>
            <ul>
              <li>
                People are all different, and no one understands or can
                understand me
              </li>
              <li>People are all the same, we all have the same problems</li>
            </ul>
          </div>
        </v-card-text>
      </v-card>
      <v-divider />

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
        <!-- <v-card-title class="headline"> -->
        <h3 class="primary_v--text">
          Questions
        </h3>
        <!-- </v-card-title> -->
        <div class="center-mid">
          <p style="margin: 23px">
            All answers to questions will be hidden until you respond, we
            welcome your voice to the conversation, go ahead, share your
            thoughts!
          </p>
        </div>
        <v-card-actions>
          <v-btn outlined to="/questions" color="secondary">
            Go to Questions
            <v-icon color="secondary">
              keyboard_arrow_right
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
      <!-- <v-divider /> -->
      <v-card class="row-fif" flat>
        <!-- <v-card-title class="headline"> -->
        <h3 class="primary_v--text">
          Blog
        </h3>
        <!-- </v-card-title> -->
        <div class="center-mid">
          <p style="margin: 23px">
            Topics, implications, and predictions surrounding 9takes will
            discussed.
          </p>
        </div>
        <v-card-actions>
          <v-btn outlined to="/blog" color="secondary">
            <v-icon color="secondary">
              keyboard_arrow_left
            </v-icon>
            Go to the Blog
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-divider />
      <!-- </div> -->
      <v-card class="row-fif" flat>
        <v-card-title class="headline">
          <h3 class="primary_v--text">
            One More Thing
          </h3>
        </v-card-title>
        <v-card-text class="center-mid">
          <p style="margin: 23px">
            All Comments, Questions, and Wall posts are <b>anonymous</b>
            <br>
            The only thing that identifies you to the community is your
            personality type
          </p>
        </v-card-text>
      </v-card>
      <v-spacer />
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'home',
  // <!-- https://introjs.com/ -->
  computed: {
    user () {
      return this.$auth.user
    }
  }
}
</script>
<style lang="scss">
.signup-button {
  height: 200px !important;
  width: 90%;
}
.min-marg-top {
  margin-top: -10px !important;
}
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
.center-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.center-mid {
  max-width: 500px;
  margin: auto;
}
</style>
