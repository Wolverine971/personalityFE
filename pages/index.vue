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
          <h2>
            <v-icon color="#7f9c7f">
              public
            </v-icon>
            Situation
          </h2>
          <p>
            Are people all the same? Are people all different? We are similar to
            some people, and to others we are not. Why do we get angry, anxious,
            or feel inferior towards others? Let me suggest it is because we
            believe others should either act, think or feel like how we do.
            <!-- We live in a world where people are different. We all know people
            are different but we don't exactly know how or in what ways we are
            different. And we tend to get surprised when people don't do, think
            or feel the way we do. -->
          </p>
          <h2>
            <v-icon color="#969675">
              emoji_objects
            </v-icon>
            Solution
          </h2>
          <p>
            9takes seeks to create a community where our similarities and
            differences can be celebrated. We do this through asking thoughtful
            questions and giving honest answers and filtering everything through
            the lense of the enneagram. In the enneagram there are 9 core
            personality types which means there can be at least 9 categorical
            takes on any subject or situation.
            <!-- 9takes seeks to explore our psychology by creating a community where
            we can discover our similarities and differences. 9takes gets its
            roots from the enneagram where broadly speaking there are 9 types of
            personality. Therefore there can be at least 9 takes on any subject
            or situation. -->
            <!-- These nine takes come from the enneagram personality test, which digs into our core motivations and fears and forms 9 goups of thinking or personalities. -->
            Here in this site we will get at those differences and
            commonalities, through question and answering.
            <u>Our goal to start conversations and provide a lense through which
              we can generate empathy and curiosity for one another.</u>
          </p>
          <h2>
            <v-icon color="#ad5252">
              info
            </v-icon>
            Site Mechanics
          </h2>
          <ul>
            <li>
              Know or find out your <a
                href="https://www.enneagraminstitute.com/type-descriptions"
                target="_blank"
                rel="noopener noreferrer"
              >Enneagram Number</a>
            </li>
            <li>Inorder to see answers to questions, you have to answer the question</li>
            <li>Personality walls are for viewing, you can only post on your own personaity type's wall</li>
          </ul>
          <h2>
            <v-icon color="#887373">
              build
            </v-icon>
            Constantly Under Construction
          </h2>
          <ul>
            <li>
              We welcome feedback and suggestions. Any suggestions should be sent
              to <a href="mailto:usersup@9takes.com">usersup@9takes.com</a>
            </li>
          </ul>
          <hr class="my-3">
          <p>Thank you for checking out the 9takes community.</p>

          <hr class="my-3">
          <!-- Built using
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
          </a> -->
          <!-- <br> -->
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
