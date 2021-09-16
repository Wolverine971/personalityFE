<template>
  <div class="row align-center">
    <div class="m-col align-center">
      <v-card>
        <!-- https://introjs.com/ -->
        <v-card-title class="headline">
          <h1>Welcome to the 9takes Beta</h1>
        </v-card-title>
        <v-card-subtitle class="min-marg-top">
          <h3>This is community for questions</h3>
        </v-card-subtitle>
        <v-card-text>
          <h2>
            <v-icon color="fmidnight">
              flag
            </v-icon>
            The Goal
          </h2>
          <p>
            To start conversations and provide a lense through which we can
            generate empathy and curiosity for one another.
          </p>
          <h2>
            <v-icon color="fmidnight">
              directions_walk
            </v-icon>
            How We Get There
          </h2>
          <p>
            9takes is built on the idea that by asking raw and real questions
            and giving honest answers we can gain a broad understanding of those
            around us. 9takes gets its name from the enneagram and hints at
            there being nine different ways of viewing any situation or
            question. Therefore, to get at these different viewpoints we ask
            questions which we hope will spawn follow up questions and a general
            curiosity for the other... maybe even some empathy.
          </p>
          <hr class="my-3">
          <div class="center-div">
            <h3>Questions</h3>
            <p>
              All answers to questions will be hidden until you respond, we
              welcome your voice to the conversation, go ahead, share your
              thoughts!
            </p>
            <v-btn outlined to="/questions" color="fpink">
              Go to Questions
              <v-icon color="fpink">
                keyboard_arrow_right
              </v-icon>
            </v-btn>
          </div>
          <hr class="my-3">
          <!-- <v-card-actions> -->
          <div class="center-div">
            <h3>One More Thing</h3>
            <p>
              All Comments, Questions, and Wall posts are <b>anonymous</b>
              <br>
              The only thing that ids you to the community is your type
            </p>
          </div>
        </v-card-text>
        <!-- </v-card-actions> -->
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'home',
  // <!-- https://introjs.com/ -->
  head: {
    titleTemplate: '%s - Home for personality Q&A',
    title: '9takes Beta',
    meta: [
      {
        name: 'description',
        content:
          'Community for questions and answers exploring 9 takes (enneagram) on any topic. Celebrate our differences and similarities in our personalities...'
      },
      { property: 'og:url', content: 'https://9takes.com' },
      {
        property: 'og:description',
        content:
          'Community for questions and answers exploring 9 takes (enneagram) on any topic. Celebrate our differences and similarities in our personalities...'
      },
      { property: 'og:title', content: '9takes' },
      {
        name: 'twitter:description',
        content:
          'Community for questions and answers exploring 9 takes (enneagram) on any topic. Celebrate our differences and similarities in our personalities...'
      },
      {
        name: 'twitter:title',
        content: '9takes | Home for personality Q&A'
      },
      {
        name: 'keywords',
        content:
          'enneagram, personality, personality network, enneagram questions, enneagram answers, personality explaination, Q&A, ask a question, type 1, type 2, type 3, type 4, type 5, type 6, type 7, type 8, type 9'
      }
    ],
    link: [
      { rel: 'canonical', href: 'https://9takes.com' }
    ]
  }
}
</script>
<style lang="scss">
.min-marg-top {
  margin-top: -10px !important;
}
.row-mid {
  display: flex;
  justify-content: center;
}
.row-fif {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 190px;
  justify-content: center;
}
@media (max-width: 1265px) {
  // .row-fif {
  //   width: 100%;
  // }
  // .row-mid {
  //   flex-direction: column;
  // }
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

</style>
