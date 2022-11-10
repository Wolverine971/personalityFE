<template>
  <div class="align-center index-page">
    <v-card class="m-col align-center" flat>
      <v-card flat>
        <v-card-title class="headline">
          <h2 class="secondary--text" style="margin: auto; padding: 10px">
            We are both different and similar
          </h2>
        </v-card-title>
        <v-card-text class="center-mid">
          <br />
          <p>It feels like these moments are happening less and less</p>
          <br />
          <p>
            We need to find our people and our connection but also be curious
            and accepting of those that are different
          </p>
          <br />
          <!-- <p>
            We need to find those that are similar to us and be accepting of
            those that are different
          </p> -->
          <br />
          <p>That's why <span class="boldify">9takes</span> is here</p>
        </v-card-text>
        <br />
      </v-card>
      <br />
      <v-divider />
      <br />

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
        <h3 class="primary_v--text">Questions</h3>
        <!-- </v-card-title> -->
        <div class="center-mid">
          <p style="margin: 23px">
            Ask and answer questions anonymously.
            <b>All answers to questions will be hidden until you answer.</b> We
            welcome your voice to the conversation, go ahead, share your
            thoughts and feelings!
          </p>
        </div>
        <v-card-actions>
          <v-btn outlined to="/questions" color="secondary">
            Ask Questions
            <v-icon color="secondary"> keyboard_arrow_right </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
      <br />
      <v-divider />
      <br />
      <v-card class="row-fif" flat>
        <!-- <v-card-title class="headline"> -->
        <h3 class="primary_v--text">Blog</h3>
        <!-- </v-card-title> -->
        <div class="center-mid">
          <p style="margin: 23px">
            Topics, implications, predictions, and musings surrounding 9takes
            will discussed.
          </p>
        </div>
        <v-card-actions>
          <v-btn outlined to="/blog" color="secondary">
            <v-icon color="secondary"> keyboard_arrow_left </v-icon>
            Read Blog
          </v-btn>
        </v-card-actions>
      </v-card>
      <br />
      <!-- <v-divider /> -->
      <br />
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
export default {
  layout: 'home',
  // <!-- https://introjs.com/ -->
  // components: {
  //   SvgBackground: () => import('../components/shared/svgBackground'),
  // },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
  },
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
  max-width: 500px;
  margin: auto;
}

.index-page p {
  font-size: x-large;
}
.boldify {
  font-size: xx-large;
  color: #f72585;
  // text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
  //   1px 1px 0 #000;
}
</style>
