<template>
  <div>
    <h1>Relationships</h1>
    <h2>Share Experiences</h2>
    <div class="circle-container cont">
      <div class="row">
        <div class="m-col col-width align-center justify-start">
          <div v-for="(type, i) in enneagramTypes" :key="i">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="circle"
                  fab
                  v-bind="attrs"
                  :disabled="lock"
                  :class="`class${type.name}Background ${
                    type.name === type1 ? 'big' : ''
                  }`"
                  v-on="on"
                  @click="type1 = type.name"
                >
                  {{ type.name }}
                </v-btn>
              </template>
              <span>pick me, {{ type.tooltip1 }}</span>
            </v-tooltip>
          </div>
        </div>

        <div v-if="(type1 || type2) && !threads" class="circle-join-box">
          <div class="m-col align-center">
            <v-btn
              v-if="type1 && type2"
              class="view-btn"
              @click="seeRelationship"
            >
              View {{ type1 }} Relationship with {{ type2 }}
            </v-btn>

            <v-btn
              class="types circle-join extra-big"
              fab
              :class="`class${type1}Background`"
              style="position: absolute; top: calc(30% - 7.5vw)"
            >
              {{ type1 }}
            </v-btn>
            <v-btn
              class="types circle-join extra-big"
              fab
              :class="`class${type2}Background`"
              style="position: absolute; top: calc(70% - 7.5vw)"
            >
              {{ type2 }}
            </v-btn>
          </div>
        </div>
        <div v-else class="circle-join-box">
          <div class="m-col">
            <v-btn v-if="type1 && type2" @click="unlock">
              View Another Relationship
            </v-btn>
            <relationship-threads
              :relationship="threads"
              :types="[type1, type2]"
            />
          </div>
        </div>
        <div class="m-col col-width align-center justify-start">
          <div v-for="(type, i) in enneagramTypes" :key="i">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  class="circle"
                  fab
                  :disabled="lock"
                  :class="`class${type.name}Background ${
                    type.name === type2 ? 'big' : ''
                  }`"
                  v-on="on"
                  @click="type2 = type.name"
                >
                  {{ type.name }}
                </v-btn>
              </template>
              <span>relationships? {{ type.tooltip2 }}</span>
            </v-tooltip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { endpoints } from '../models/endpoints'
export default {
  name: 'Relationships',
  components: {
    RelationshipThreads: () =>
      import('../components/relationship/relationshipThreads')
  },
  data: () => ({
    enneagramTypes: [
      {
        name: 1,
        expanded: false,
        tooltip1: 'we so perfect',
        tooltip2: 'already improving mine'
      },
      {
        name: 2,
        expanded: false,
        tooltip1: 'we so nice',
        tooltip2: 'yes plz'
      },
      {
        name: 3,
        expanded: false,
        tooltip1: 'we so awesome',
        tooltip2: 'get on my lvl'
      },
      {
        name: 4,
        expanded: false,
        tooltip1: 'we so deep',
        tooltip2: 'maybe, maybe not'
      },
      {
        name: 5,
        expanded: false,
        tooltip1: 'we so smart',
        tooltip2:
          "google defines a relationship as: 'the way in which two or more concepts, objects, or people are connected, or the state of being connected'"
      },
      {
        name: 6,
        expanded: false,
        tooltip1: 'we so loyal',
        tooltip2: 'part of the ship part of the crew'
      },
      {
        name: 7,
        expanded: false,
        tooltip1: 'we so fun',
        tooltip2: 'sure if you can keep up'
      },
      {
        name: 8,
        expanded: false,
        tooltip1: 'we so strong',
        tooltip2: 'lets fight!'
      },
      {
        name: 9,
        expanded: false,
        tooltip1: 'we so calm ;)',
        tooltip2: 'mmmmmmmmh'
      }
    ],
    type1: '',
    type2: '',
    threads: null,
    lock: false,
    viewRelationship: false
  }),
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    async seeRelationship () {
      this.viewRelationship = !this.viewRelationship
      this.lock = true
      const resp = await this.$axios.get(
        `${endpoints.relationship}/${this.type1}/${this.type2}/10`
      )
      if (resp && resp.data) {
        this.threads = resp.data
      } else {
        console.log('failed')
        this.$store.dispatch('toastError', 'Failed to get threads')
      }
    },
    unlock () {
      this.lock = false
      this.threads = null
    }
  },
  head () {
    return {
      title: 'Relationships',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Relationships across enneagram types'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.col-width {
  width: 100px;
}
.types {
  font-size: 10em;
}

.circle-container {
  display: flex;
  align-items: flex-start;
  list-style: none;
  margin: 50px auto 20px auto;
  flex-wrap: wrap;
}
.circle {
  width: 5vw;
  height: 5vw;
  // position: absolute;
  // z-index: -1;
  color: rgb(152, 152, 167);
  border-radius: 50%;
  font: {
    size: 20px;
    family: sans-serif;
    weight: bold;
  }
  cursor: pointer;
  line-height: 50px;
  text-align: center;
  &:nth-child(even) {
    align-self: flex-end;
  }
  &:nth-child(odd) {
    align-self: flex-start;
  }
}

.circle-join {
  border-radius: 50%;
  cursor: pointer;
  width: 50%;
  opacity: 50%;
  position: absolute;
}

// .circle-join2 {
//   top: 20% !important;
// }

.circle-join-box {
  flex: 1;
  text-align: center;
  flex: 1;
  // min-width: 500px;
}

@media only screen and (min-width: 740px) {
  .circle-join-box {
    min-width: 500px;
  }
}

.big {
  font-size: 5vw !important;
  height: 10vw !important;
  width: 10vw !important;
}
.extra-big {
  font-size: 10vw !important;
  height: 15vw !important;
  width: 15vw !important;
}
.view-btn {
  z-index: 12;
  position: absolute;
  top: calc(50% - 18px);
}
</style>
