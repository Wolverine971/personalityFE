<template>
  <v-row justify="center" align="center">
    <v-col cols="12" md="8">
      <v-card>
        <v-card-title class="headline">
          <h1>Welcome to 9takes</h1>
        </v-card-title>
        <v-card-subtitle class="min-marg-top">
          <h3>This is community for questions</h3>
        </v-card-subtitle>
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
            <v-icon color="fmidnight">
              flag
            </v-icon>
            The Goal
          </h2>
          <p>
            To start conversations and provide a lense through which we can
            generate empathy and curiosity for one another.

            <!-- Why do we expect others to have the same reaction as us? If everyone
            is different, then conflict and resolution is trickier to navigate
            than we might think. When someone does something we disagree with,
            many a times, it is rarely as intentional as we believe it to be, so
            why are we so quick to take offense? The expectation of the other to
            think, feel, and act the same as us, can impedes our understanding
            of others more than we realize. -->

            <!-- Are people all the same? Are people all different? We are similar to
            some people, and to others we are not. Why do we get angry, anxious,
            or feel inferior towards others? Let me suggest it is because we
            believe others should either act, think or feel like how we do. -->
            <!-- We live in a world where people are different. We all know people
            are different but we don't exactly know how or in what ways we are
            different. And we tend to get surprised when people don't do, think
            or feel the way we do. -->
          </p>
          <!-- <h2>
            <v-icon color="#ad5252">
              help_outline
            </v-icon>
            How it works
          </h2>
          <ul>
            <li>
              Join the community of 9takes by finding out your
              <enneagram-instructions :label="'enneagram!'" :type="'link'" />
            </li>
            <li>
              All answers to questions will be hidden until you respond, we
              welcome your voice to the conversation, go ahead, share your
              thoughts!
            </li>
            <li>
              Each Enneagram Wall is reserved for only that type's enneagram to
              respond. You can only write on your enneagram wall but feel free
              to peruse through the other walls to learn more!
            </li>
          </ul> -->
          <h2>
            <v-icon color="fmidnight">
              directions_walk
            </v-icon>
            How We Get There
          </h2>
          <p>
            9takes is built on the idea that by asking raw and real questions
            and giving honest answers we can gain a broad understanding of those
            around us. 9takes gets its name from the enneagram and hints at there
            being nine different ways of viewing any situation or question.
            Therefore, to get at these different viewpoints we ask questions
            which we hope will spawn follow up questions and a general curiosity
            for the other... maybe even some empathy.

            <!-- 9takes seeks to create a community where our similarities and
            differences can be celebrated. We do this through asking thoughtful
            questions and giving honest answers and filtering everything through
            the lense of the enneagram. In the enneagram there are 9 core
            personality types which means there can be at least 9 categorical
            takes on any subject or situation. -->
            <!-- 9takes seeks to explore our psychology by creating a community where
            we can discover our similarities and differences. 9takes gets its
            roots from the enneagram where broadly speaking there are 9 types of
            personality. Therefore there can be at least 9 takes on any subject
            or situation. -->
            <!-- These nine takes come from the enneagram personality test, which
            digs into our core motivations and fears and forms 9 goups of thinking
            or personalities. -->
          </p>

          <!-- <h2>
            <v-icon color="#887373"> build </v-icon>
            Constantly Under Construction
          </h2>
          <ul>
            <li>
              We welcome feedback and suggestions. Any suggestions should be
              sent to <a href="mailto:usersup@9takes.com">usersup@9takes.com</a>
            </li>
          </ul>
          <hr class="my-3" />
          <p>Thank you for checking out the 9takes community.</p> -->

          <hr class="my-3">
        </v-card-text>
        <v-card-actions>
          <div class="row-mid">
            <div class="row-fif margin">
              <h3>Questions</h3>
              <p style="margin: 13px">
                All answers to questions will be hidden until you respond, we
                welcome your voice to the conversation, go ahead, share your
                thoughts!
              </p>
              <v-btn outlined to="/questions">
                <v-icon> keyboard_arrow_left </v-icon>
                Go to Questions
              </v-btn>
            </div>
            <v-divider vertical class="margin" />
            <div class="row-fif margin">
              <h3>Wall</h3>
              <p style="margin: 13px">
                Each Enneagram Wall is reserved for only that type's enneagram to
                respond. You can only write on your enneagram wall but feel free
                to peruse through the other walls to learn more!
              </p>
              <v-btn outlined to="/personality">
                Go to the Walls
                <v-icon> keyboard_arrow_right </v-icon>
              </v-btn>
            </div>
          </div>
        </v-card-actions>
        <hr class="my-3">
        <v-card-actions>
          <div class="center-div">
            <h3>One More Thing</h3>
            <p>
              All Comments, Questions, and Wall posts are <b>anonymous</b>
              <br>
              The only thing that ids you to the community is your type
            </p>
          </div>
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
<style lang="scss">
.min-marg-top {
  margin-top: -10px !important;
}
.row-mid {
  display: flex;
}
.row-fif {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 190px;
  justify-content: space-around;
}
@media (max-width: 1265px) {
  .row-fif {
    width: 100%;
  }
  .row-mid {
    flex-direction: column;
  }
  .margin {
    margin: 10px 0;
  }
}
.center-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
