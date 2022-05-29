<template>
  <div class="row align-center">
    <div class="m-col align-center">
      <v-card>
        <v-card-title class="headline">
          <h1 class="secondary--text">
            Welcome to the 9takes Beta
          </h1>
        </v-card-title>
        <v-card-subtitle class="min-marg-top">
          <h3 class="secondary--text">
            When you run out of questions, you not only run out of answers, you run out of hope
          </h3>
        </v-card-subtitle>
        <v-card-text>
          <h2 class="secondary--text">
            <v-icon color="primary">
              flag
            </v-icon>
            The Goal
          </h2>
          <p>
            People are different, but there are similarities. We don't know exactly how and in what ways we are different and the same, but we are aware.
            The mission here at 9takes is to start conversations that explore our similarities and differences so that we can generate both empathy and curiosity.
          </p>
          <div>
            <h3> Two contrasting and unproductive trains of thought, that stifle conversation</h3>
            <div>
              "People are all different, and no one understands or can understand me"
            </div>
            <div>
              "People are all the same, we all have the same problems "
            </div>
          </div>
          <h2 class="secondary--text">
            <v-icon color="primary">
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
        </v-card-text>
      </v-card>
      <div class="row-mid">
        <v-card class="row-fif margin">
          <h3 class="primary_v--text">
            Blog
          </h3>
          <p style="margin: 23px">
            Topics, implications, and predictions surrounding 9takes will
            discussed.
          </p>
          <v-btn outlined to="/blog" color="secondary">
            <v-icon color="secondary">
              keyboard_arrow_left
            </v-icon>
            Go to the Blog
          </v-btn>
        </v-card>
        <v-card class="row-fif">
          <h3 class="primary_v--text">
            Questions
          </h3>
          <p style="margin: 23px">
            All answers to questions will be hidden until you respond, we
            welcome your voice to the conversation, go ahead, share your
            thoughts!
          </p>
          <v-btn outlined to="/questions" color="secondary">
            Go to Questions
            <v-icon color="secondary">
              keyboard_arrow_right
            </v-icon>
          </v-btn>
        </v-card>
      </div>
      <v-card class="center-div margin row-fif">
        <h3 class="primary_v--text">
          One More Thing
        </h3>
        <p style="margin: 23px">
          All Comments, Questions, and Wall posts are <b>anonymous</b>
          <br>
          The only thing that identifies you to the community is your
          personality type
        </p>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'home'
  // <!-- https://introjs.com/ -->
}
</script>
<style lang="scss">
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
  width: 50%;
  height: 190px;
  justify-content: center;
}
@media (max-width: 1265px) {
  .row-fif {
    width: 100%;
  }
  .row-mid {
    flex-direction: column;
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
</style>
