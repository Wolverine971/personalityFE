<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="800">
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark v-bind="attrs" v-on="on">
          Find Out Enneagram
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          Here are the broad strokes for finding out your enneagram.
        </v-card-title>
        <v-card-text>
          <h1>Questions</h1>
          <p>
            Which core emotion do you most encounter, wrestle with or deal with
            the most? For example this emotion is in the back of your mind,
            maybe you actively use it or supress it or even you realize it kinda
            comes up unconciously alot?
          </p>
          <v-btn-toggle>
            <v-btn @click="coreEmotion = 'shame'">
              Shame
            </v-btn>
            <v-btn @click="coreEmotion = 'fear'">
              Fear
            </v-btn>
            <v-btn @click="coreEmotion = 'anger'">
              Anger
            </v-btn>
          </v-btn-toggle>
          <br>
          <div v-if="coreEmotion">
            <h2>
              {{ coreEmotion.toUpperCase() }} Triad /
              {{
                coreEmotion === 'shame'
                  ? 'Heart'
                  : coreEmotion === 'fear'
                    ? 'Head'
                    : 'Body'
              }}
              Center
            </h2>
            <h3>Which type sounds most like you?</h3>
            <p>
              Take a moment and think carefully, maybe ask a friend, which of
              these sounds most like you?
            </p>
            <div v-if="coreEmotion === 'shame'">
              <v-card>
                <v-card-title>Type 2</v-card-title><v-card-text>
                  <h3>Description</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-2">
                    The Caring, Interpersonal Type: Demonstrative, Generous,
                    People-Pleasing, and Possessive
                  </blockquote>
                  <h3>Core Desire</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-2">
                    To feel loved
                  </blockquote>
                  <h3>Core Fear</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-2">
                    Of being unwanted, unworthy of being loved
                  </blockquote>
                </v-card-text>
                <v-card-actions>
                  <a href="https://www.enneagraminstitute.com/type-2">
                    More Info
                  </a>
                </v-card-actions>
              </v-card>
              <br>
              <v-card>
                <v-card-title>Type 3</v-card-title><v-card-text>
                  <h3>Description</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-3">
                    The Success-Oriented, Pragmatic Type: Adaptive, Excelling,
                    Driven, and Image-Conscious
                  </blockquote>
                  <h3>Core Desire</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-3">
                    To feel valuable and worthwhile
                  </blockquote>
                  <h3>Core Fear</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-3">
                    Of being worthless
                  </blockquote>
                </v-card-text><v-card-actions>
                  <a href="https://www.enneagraminstitute.com/type-3">
                    More Info
                  </a>
                </v-card-actions>
              </v-card>
              <br>
              <v-card>
                <v-card-title>Type 4</v-card-title><v-card-text>
                  <h3>Description</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-4">
                    The Sensitive, Withdrawn Type: Expressive, Dramatic,
                    Self-Absorbed, and Temperamental
                  </blockquote>
                  <h3>Core Desire</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-4">
                    To find themselves and their significance (to create an
                    identity)
                  </blockquote>
                  <h3>Core Fear</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-4">
                    That they have no identity or personal significance
                  </blockquote>
                </v-card-text><v-card-actions>
                  <a href="https://www.enneagraminstitute.com/type-4">
                    More Info
                  </a>
                </v-card-actions>
              </v-card>
            </div>
            <div v-if="coreEmotion === 'fear'">
              <v-card>
                <v-card-title>Type 5</v-card-title><v-card-text>
                  <h3>Description</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-5">
                    The Intense, Cerebral Type: Perceptive, Innovative,
                    Secretive, and Isolated
                  </blockquote>
                  <h3>Core Desire</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-5">
                    To be capable and competent
                  </blockquote>
                  <h3>Core Fear</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-5">
                    Being useless, helpless, or incapable
                  </blockquote>
                </v-card-text><v-card-actions>
                  <a href="https://www.enneagraminstitute.com/type-5">
                    More Info
                  </a>
                </v-card-actions>
              </v-card>
              <br>
              <v-card>
                <v-card-title>Type 6</v-card-title><v-card-text>
                  <h3>Description</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-6">
                    The Committed, Security-Oriented Type: Engaging,
                    Responsible, Anxious, and Suspicious
                  </blockquote>
                  <h3>Core Desire</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-6">
                    To have security and support
                  </blockquote>
                  <h3>Core Fear</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-6">
                    Of being without support and guidance
                  </blockquote>
                </v-card-text><v-card-actions>
                  <a href="https://www.enneagraminstitute.com/type-6">
                    More Info
                  </a>
                </v-card-actions>
              </v-card>
              <br>
              <v-card>
                <v-card-title>Type 7</v-card-title><v-card-text>
                  <h3>Description</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-7">
                    The Busy, Fun-Loving Type: Spontaneous, Versatile,
                    Distractible, and Scattered
                  </blockquote>
                  <h3>Core Desire</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-7">
                    To be satisfied and content—to have their needs fulfilled
                  </blockquote>
                  <h3>Core Fear</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-7">
                    Of being deprived and in pain
                  </blockquote>
                </v-card-text><v-card-actions>
                  <a href="https://www.enneagraminstitute.com/type-7">
                    More Info
                  </a>
                </v-card-actions>
              </v-card>
            </div>
            <div v-if="coreEmotion === 'anger'">
              <v-card>
                <v-card-title>Type 8</v-card-title><v-card-text>
                  <h3>Description</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-8">
                    The Powerful, Dominating Type: Self-Confident, Decisive,
                    Willful, and Confrontational
                  </blockquote>
                  <h3>Core Desire</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-8">
                    To protect themselves (to be in control of their own life
                    and destiny)
                  </blockquote>
                  <h3>Core Fear</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-8">
                    Of being harmed or controlled by others
                  </blockquote>
                </v-card-text><v-card-actions>
                  <a href="https://www.enneagraminstitute.com/type-8">
                    More Info
                  </a>
                </v-card-actions>
              </v-card>
              <br>
              <v-card>
                <v-card-title>Type 9</v-card-title><v-card-text>
                  <h3>Description</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-9">
                    The Easygoing, Self-Effacing Type: Receptive, Reassuring,
                    Agreeable, and Complacent
                  </blockquote>
                  <h3>Core Desire</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-9">
                    To have inner stability "peace of mind"
                  </blockquote>
                  <h3>Core Fear</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-9">
                    Of loss and separation
                  </blockquote>
                </v-card-text><v-card-actions>
                  <a href="https://www.enneagraminstitute.com/type-9">
                    More Info
                  </a>
                </v-card-actions>
              </v-card>
              <br>
              <v-card>
                <v-card-title>Type 1</v-card-title><v-card-text>
                  <h3>Description</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-1">
                    The Rational, Idealistic Type: Principled, Purposeful,
                    Self-Controlled, and Perfectionistic
                  </blockquote>
                  <h3>Core Desire</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-1">
                    To be good, to have integrity, to be balanced
                  </blockquote>
                  <h3>Core Fear</h3>
                  <blockquote cite="https://www.enneagraminstitute.com/type-1">
                    Of being corrupt/evil, defective
                  </blockquote>
                </v-card-text><v-card-actions>
                  <a href="https://www.enneagraminstitute.com/type-1">
                    More Info
                  </a>
                </v-card-actions>
              </v-card>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          I am Type ...
          <v-select
            v-model="chosenType"
            :items="enneagramTypes"
            label="Enneagram Type"
            @change="chosen"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'EnneagramInstructions',
  data () {
    return {
      dialog: false,
      coreEmotion: null,
      enneagramTypes: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      chosenType: null
    }
  },
  methods: {
    chosen (type) {
      if (type) {
        // console.log(type)
        this.$emit('typeSelected', type)
        this.dialog = false
      }
    }
  }
}
</script>
