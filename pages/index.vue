<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome to 9takes
        </v-card-title>
        <v-card-text>
          <p>
            9takes illudes to a theory that there can be 9 takes on any subject.
            These nine takes come from the enneagram personality test, which digs into our core motivations and fears and forms 9 goups of thinking or personalities.
            Here in this site we will get at those differences and commonalities, through question and answering.
          </p>
          <p>
            First and foremost inorder to use this site you need to know your ennagram numnber.
            Our advice is to go to an enneagram site read the number descriptions and through reflection and asking friends decide on which number you most resonate with.
            <a
              href="https://www.enneagraminstitute.com/type-descriptions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Enneagram Descriptions </a>.
          </p>
          <p>
            Find a bug? Report it on the github
            <a
              href="https://github.com/Wolverine971/personalityFE"
              target="_blank"
              rel="noopener noreferrer"
              title="contribute"
            >
              Personality Frontend </a>.
          </p>
          <p>
            Thank you for checking out the 9takes community.
          </p>

          <hr class="my-3">
          Built using
          <a
            href="https://vuejs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vue
          </a>
          ,
          <a
            href="https://nuxtjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt
          </a>
          , and a whole bunch of other
          <a
            href="https://github.com/Wolverine971/personalityBE"
            target="_blank"
            rel="noopener noreferrer"
          >
            stuff
          </a>
          <br>
        </v-card-text>
        <v-card-actions>
          <v-btn to="/questions">
            See the Questions
          </v-btn> <v-spacer /> <v-btn to="/personality">
            Personality Walls
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  }
}
</script>
