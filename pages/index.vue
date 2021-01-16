<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          <h1>Welcome to 9takes</h1>
          <h5>A community for question and answering based on personality</h5>
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
          <h2>Situation</h2>
          <p>
            We live in a world where people are different. We all know people
            are different but we don't exactly know how or in what ways we are
            different. And we tend to get surprised when people don't do, think
            or feel the way we do.
          </p>
          <h2>Solution</h2>
          <p>
            9takes seeks to explore our psychology by creating a community where
            we can discover our similarities and differences. 9takes gets its
            roots from the enneagram where broadly speaking there are 9 types of
            personality. Therefore there can be at least 9 takes on any subject
            or situation.
            <!-- These nine takes come from the enneagram personality test, which digs into our core motivations and fears and forms 9 goups of thinking or personalities. -->
            Here in this site we will get at those differences and
            commonalities, through question and answering.
            <u>Our goal to start conversations and provide a lense through which
              we can generate empathy and curiosity for one another.</u>
          </p>
          <h2>How to use this site</h2>
          <p>
            First and foremost in order to use this site you need to know your
            enneagram number. Our advice is to go to an enneagram site, read the
            number descriptions and through reflection and asking friends,
            decide on which number you most resonate with. We suggest reading
            the
            <a
              href="https://www.enneagraminstitute.com/type-descriptions"
              target="_blank"
              rel="noopener noreferrer"
            >Enneagram Institute's type descriptions</a>
            if you don't know your enneagram type.
            <!-- <a
              href="https://www.enneagraminstitute.com/type-descriptions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Enneagram Descriptions </a>. -->
          </p>
          <h3>Please note that this site is constantly being improved</h3>
          <p>
            We welcome feedback and suggestions. Any suggestions should be sent
            to <a href="mailto:usersup@9takes.com">usersup@9takes.com</a>
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
          <p>Thank you for checking out the 9takes community.</p>

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
            Go to Questions
          </v-btn> <v-spacer />
          <v-btn to="/personality">
            Go to the Walls
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  head: {
    titleTemplate: '%s - Home for personality Q&A',
    title: '9takes',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'content-language', content: 'en' },
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
    ]
  }
}
</script>
