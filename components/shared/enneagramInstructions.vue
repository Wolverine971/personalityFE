<template>
  <v-dialog v-model="dialog" max-width="800">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-if="type === 'btn'"
        dark
        v-bind="attrs"
        color="primary"
        outlined
        v-on="on"
      >
        {{ label }}
      </v-btn>
      <a v-else dark v-bind="attrs" v-on="on">
        {{ label }}
      </a>
    </template>
    <v-card>
      <v-card-title> Broad Strokes Of The Enneagram. </v-card-title>
      <v-card-subtitle> - 5 minutes </v-card-subtitle>
      <v-card-text>
        <p>
          There are 3 core/ dominate emotions according to the Enneagram. Anger,
          Fear, and Shame
        </p>
        <p>
          Along with that there are 3 centers of Intelligence. Head, Heart, Body
        </p>
        <p>
          These core/ dominant emotions and centers of intelligence form triads
          where each emotion lies within an intelligence center
        </p>
        <p>They map together like this:</p>
        <ul>
          <li>Body Intelligence -> Anger</li>
          <li>Head Intelligence -> Fear</li>
          <li>Heart Intelligence -> Shame</li>
        </ul>
        <br />
        <!-- <p>
          Within each triad there are 3 core enneagram types
        </p>
        <ul>
          <li>
            Body Intelligence -> Anger
            8 9 1
          </li>
          <li>
            Head Intelligence -> Fear
            2 3 4
          </li>
          <li>
            Heart Intelligence -> Shame
            5 6 7
          </li>
        </ul> -->
        <!-- Body Intelligence -> Anger
          8 9 1
          Head Intelligence -> Fear
          2 3 4
          Heart Intelligence -> Shame
          5 6 7 -->
        <p>
          Each type per triad uses that core emotion in a different way. One
          actively uses that emotion, or externalizes that emotion. One is
          unaware of that driving emotion that drives them to action. One
          represses that emotion, or internalizes that emotion. With there being
          9 enneagram types there are 3 types for each core emotion. Explore the
          3 different core emotions. Which of these core emotions would you say
          you encounter the most? In other words, which emotion is in the back
          of your mind, maybe you actively use it or suppress it or even you
          realize it kinda comes up unconsciously a lot?
        </p>

        <label for="btn-toggle" style="font-weight: bold"> Choose One:</label>
        <v-btn-toggle id="btn-toggle" tile style="display: block">
          <v-btn @click="coreEmotion = 'shame'">
            Shame/ Grief
            <v-icon v-if="coreEmotion === 'shame'">
              keyboard_arrow_down
            </v-icon>
          </v-btn>
          <v-btn @click="coreEmotion = 'fear'">
            Fear/ Anxiety
            <v-icon v-if="coreEmotion === 'fear'"> keyboard_arrow_down </v-icon>
          </v-btn>
          <v-btn @click="coreEmotion = 'anger'">
            Anger/ Rage
            <v-icon v-if="coreEmotion === 'anger'">
              keyboard_arrow_down
            </v-icon>
          </v-btn>
        </v-btn-toggle>
        <br />
        <div v-if="coreEmotion">
          <h2 class="secondary--text">
            {{
              coreEmotion === 'shame'
                ? 'Heart'
                : coreEmotion === 'fear'
                ? 'Head'
                : 'Body'
            }}
            Center /
            {{ coreEmotion.charAt(0).toUpperCase() + coreEmotion.slice(1) }}
            Triad
          </h2>
          <h3 class="primary_v--text">Which type sounds most like you?</h3>
          <p>Take a moment and think carefully, maybe ask a friend.</p>
          <div v-if="coreEmotion === 'shame'">
            <div
              :class="type === 'btn' ? 'clickable-no-hov hover-background' : ''"
              @click="chosen('2')"
            >
              <v-card>
                <v-card-text>
                  <h1 style="margin-bottom: 10px">Type 2</h1>
                  <h3 class="primary_v--text">Description</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-2">
                    The Caring, Interpersonal Type: Demonstrative, Generous,
                    People-Pleasing, and Possessive
                  </blockquote>
                  <h3 class="primary_v--text">Core Desire</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-2">
                    To feel loved
                  </blockquote>
                  <h3 class="primary_v--text">Core Fear</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-2">
                    Of being unwanted, unworthy of being loved
                  </blockquote>
                </v-card-text>
              </v-card>
              <a
                href="https://www.enneagraminstitute.com/type-2"
                target="_blank"
                alt="enneagram institute type 2"
              >
                More Info
              </a>
            </div>
            <br />
            <div
              :class="type === 'btn' ? 'clickable-no-hov hover-background' : ''"
              @click="chosen('3')"
            >
              <v-card>
                <v-card-text>
                  <h1 style="margin-bottom: 10px">Type 3</h1>
                  <h3 class="primary_v--text">Description</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-3">
                    The Success-Oriented, Pragmatic Type: Adaptive, Excelling,
                    Driven, and Image-Conscious
                  </blockquote>
                  <h3 class="primary_v--text">Core Desire</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-3">
                    To feel valuable and worthwhile
                  </blockquote>
                  <h3 class="primary_v--text">Core Fear</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-3">
                    Of being worthless
                  </blockquote>
                </v-card-text>
              </v-card>
              <a
                href="https://www.enneagraminstitute.com/type-3"
                target="_blank"
                alt="enneagram institute type 3"
              >
                More Info
              </a>
            </div>
            <br />
            <div
              :class="type === 'btn' ? 'clickable-no-hov hover-background' : ''"
              @click="chosen('4')"
            >
              <v-card>
                <v-card-text>
                  <h1 style="margin-bottom: 10px">Type 4</h1>
                  <h3 class="primary_v--text">Description</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-4">
                    The Sensitive, Withdrawn Type: Expressive, Dramatic,
                    Self-Absorbed, and Temperamental
                  </blockquote>
                  <h3 class="primary_v--text">Core Desire</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-4">
                    To find themselves and their significance (to create an
                    identity)
                  </blockquote>
                  <h3 class="primary_v--text">Core Fear</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-4">
                    That they have no identity or personal significance
                  </blockquote>
                </v-card-text>
              </v-card>
              <a
                href="https://www.enneagraminstitute.com/type-4"
                target="_blank"
                alt="enneagram institute type 4"
              >
                More Info
              </a>
            </div>
          </div>
          <div v-if="coreEmotion === 'fear'">
            <div
              :class="type === 'btn' ? 'clickable-no-hov hover-background' : ''"
              @click="chosen('5')"
            >
              <v-card>
                <v-card-text>
                  <h1 style="margin-bottom: 10px">Type 5</h1>
                  <h3 class="primary_v--text">Description</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-5">
                    The Intense, Cerebral Type: Perceptive, Innovative,
                    Secretive, and Isolated
                  </blockquote>
                  <h3 class="primary_v--text">Core Desire</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-5">
                    To be capable and competent
                  </blockquote>
                  <h3 class="primary_v--text">Core Fear</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-5">
                    Being useless, helpless, or incapable
                  </blockquote>
                </v-card-text>
              </v-card>
              <a
                href="https://www.enneagraminstitute.com/type-5"
                target="_blank"
                alt="enneagram institute type 5"
              >
                More Info
              </a>
            </div>
            <br />
            <div
              :class="type === 'btn' ? 'clickable-no-hov hover-background' : ''"
              @click="chosen('6')"
            >
              <v-card>
                <v-card-text>
                  <h1 style="margin-bottom: 10px">Type 6</h1>
                  <h3 class="primary_v--text">Description</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-6">
                    The Committed, Security-Oriented Type: Engaging,
                    Responsible, Anxious, and Suspicious
                  </blockquote>
                  <h3 class="primary_v--text">Core Desire</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-6">
                    To have security and support
                  </blockquote>
                  <h3 class="primary_v--text">Core Fear</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-6">
                    Of being without support and guidance
                  </blockquote>
                </v-card-text>
              </v-card>
              <a
                href="https://www.enneagraminstitute.com/type-6"
                target="_blank"
                alt="enneagram institute type 6"
              >
                More Info
              </a>
            </div>
            <br />
            <div
              :class="type === 'btn' ? 'clickable-no-hov hover-background' : ''"
              @click="chosen('7')"
            >
              <v-card>
                <v-card-text>
                  <h1 style="margin-bottom: 10px">Type 7</h1>
                  <h3 class="primary_v--text">Description</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-7">
                    The Busy, Fun-Loving Type: Spontaneous, Versatile,
                    Distractible, and Scattered
                  </blockquote>
                  <h3 class="primary_v--text">Core Desire</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-7">
                    To be satisfied and content—to have their needs fulfilled
                  </blockquote>
                  <h3 class="primary_v--text">Core Fear</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-7">
                    Of being deprived and in pain
                  </blockquote>
                </v-card-text>
              </v-card>
              <a
                href="https://www.enneagraminstitute.com/type-7"
                target="_blank"
                alt="enneagram institute type 7"
              >
                More Info
              </a>
            </div>
          </div>
          <div v-if="coreEmotion === 'anger'">
            <div
              :class="type === 'btn' ? 'clickable-no-hov hover-background' : ''"
              @click="chosen('8')"
            >
              <v-card>
                <v-card-text>
                  <h1 style="margin-bottom: 10px">Type 8</h1>
                  <h3 class="primary_v--text">Description</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-8">
                    The Powerful, Dominating Type: Self-Confident, Decisive,
                    Willful, and Confrontational
                  </blockquote>
                  <h3 class="primary_v--text">Core Desire</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-8">
                    To protect themselves (to be in control of their own life
                    and destiny)
                  </blockquote>
                  <h3 class="primary_v--text">Core Fear</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-8">
                    Of being harmed or controlled by others
                  </blockquote>
                </v-card-text>
              </v-card>
              <a
                href="https://www.enneagraminstitute.com/type-8"
                target="_blank"
                alt="enneagram institute type 8"
              >
                More Info
              </a>
            </div>
            <br />
            <div
              :class="type === 'btn' ? 'clickable-no-hov hover-background' : ''"
              @click="chosen('9')"
            >
              <v-card>
                <v-card-text>
                  <h1 style="margin-bottom: 10px">Type 9</h1>
                  <h3 class="primary_v--text">Description</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-9">
                    The Easygoing, Self-Effacing Type: Receptive, Reassuring,
                    Agreeable, and Complacent
                  </blockquote>
                  <h3 class="primary_v--text">Core Desire</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-9">
                    To have inner stability "peace of mind"
                  </blockquote>
                  <h3 class="primary_v--text">Core Fear</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-9">
                    Of loss and separation
                  </blockquote>
                </v-card-text>
              </v-card>
              <a
                href="https://www.enneagraminstitute.com/type-9"
                target="_blank"
                alt="enneagram institute type 9"
              >
                More Info
              </a>
            </div>
            <br />
            <div
              :class="type === 'btn' ? 'clickable-no-hov hover-background' : ''"
              @click="chosen('1')"
            >
              <v-card>
                <v-card-text>
                  <h1 style="margin-bottom: 10px">Type 1</h1>
                  <h3 class="primary_v--text">Description</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-1">
                    The Rational, Idealistic Type: Principled, Purposeful,
                    Self-Controlled, and Perfectionistic
                  </blockquote>
                  <h3 class="primary_v--text">Core Desire</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-1">
                    To be good, to have integrity, to be balanced
                  </blockquote>
                  <h3 class="primary_v--text">Core Fear</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-1">
                    Of being corrupt/evil, defective
                  </blockquote>
                </v-card-text>
              </v-card>
              <a
                href="https://www.enneagraminstitute.com/type-1"
                target="_blank"
                alt="enneagram institute type 1"
              >
                More Info
              </a>
            </div>
          </div>
        </div>
      </v-card-text>
      <v-card-actions v-if="type === 'btn' && coreEmotion">
        <v-spacer />
        I am a...
        <v-select
          v-model="chosenType"
          :items="enneagramTypes"
          label="Enneagram Type"
          @change="chosen"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'EnneagramInstructions',
  props: {
    label: {
      type: String,
      required: false,
      default: 'Find Your Enneagram',
    },
    type: {
      type: String,
      required: false,
      default: 'btn',
    },
  },
  data() {
    return {
      dialog: false,
      coreEmotion: null,
      enneagramTypes: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'Unknown',
        'Rando',
      ],
      chosenType: null,
    }
  },
  methods: {
    chosen(type) {
      if (type && this.type === 'btn') {
        this.$emit('typeSelected', type)
        this.dialog = false
      }
      if (type && this.type === 'btn') {
        this.$store.dispatch('toastSuccess', `Wooo Type ${type}!`)
      }
    },
  },
}
</script>
<style lang="scss">
.hover-background {
  :hover {
    background-color: grey;
  }
}
</style>
