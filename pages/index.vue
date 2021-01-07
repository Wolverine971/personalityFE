<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Welcome to 9takes
        </v-card-title>
        <v-card-text>
          <!-- OSMEAC
            -Orientation:
              Time: 1500 7 Jan 2021
              Location: Glen Burnie, MD
              Weather: Sunny 45 degrees fahrenheit
                KOCOA
                  Key Terrain:
                    Facebook- social network
                    Twitter- short form communication network
                    Google- universial resource locator network
                    Amazon- shopping and delivery network
                    TicToc- short video sharing network
                  Observations:
                    All networks are accessable via the internet which can be connected to via computer or mobile device.
                    All networks listed above are free to view but monitize your attention in different ways
                  Cover and Concealment:
                    Most people are on these networks
                    Few people in my estimation choose to opt out of these networks
                    Some use multiple email addresses to prevent revealing their all their social activity
                  Obstacles:
                    To communicate with or influence others people must be active on these networks.
                    Less popular networks exist but the less poplular the network the less power your voice is.
                  Avenues of Approach:
                    Join existing network
                    Do without any network
                    Make a new network

            -Situation:
              Rising tensions and political divide seem to be at all time highs. The US resembles a powerkeg with lines drawn, no middle ground and where any disagreement seems escalate and be excentuated.
              Yesterday there was a protest at the senate in an attempt to stop the certification of election results.
              Both sides demonize the other and neither side understands the other.
              Enemy
                SALUTE
                DRAW-D
                MPCOA
                MDCOA
              Friendly
                Task
                Commander's Intent

            -Mission:

            -Execution:

            -Command and Signal

            -Admin and Logistics -->
          <h3>Situation</h3>
          <p>
            We live in a world where people are different.
            We all know people are different but we don't exactly know how or in what ways we are different.
            And we get suprised when people don't do, think or feel the way we do.
          </p>
          <h3>Solution</h3>
          <p>
            9takes seeks to explore our psychology by creating a community where we can discover our similarities and differences.
            9takes gets its roots from the enneagram where broadly speaking there are 9 types of personality.
            Therefore there can be at least 9 takes on any subject or situation.
            <!-- These nine takes come from the enneagram personality test, which digs into our core motivations and fears and forms 9 goups of thinking or personalities. -->
            Here in this site we will get at those differences and commonalities, through question and answering.
          </p>
          <h3>How to use this site</h3>
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
export default {
}
</script>
