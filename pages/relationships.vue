<template>
  <div>
    <h1>Relationships</h1>
    <h2>Share Experiences</h2>
    <div class="circle-container cont">
      <div class="row">
        <div class="m-col col-width align-center">
          <div v-for="(type, i) in enneagramTypes" :key="i">
            <v-btn
              class="circle"
              fab
              :disabled="lock"
              :class="`class${type.name}Background ${
                type.name === type1 ? 'big' : ''
              }`"
              @click="type1 = type.name"
            >
              {{ type.name }}
            </v-btn>
          </div>
        </div>

        <div class="circle-join-box">
          <div v-if="!relationshipThreads" class="m-col align-center">
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
          <div v-else>
            <v-btn
              v-if="type1 && type2"
              @click="unlock"
            >
              View Another Relationship
            </v-btn>
            <relationship-threads
              :relationship="relationshipThreads"
              :types="[type1, type2]"
            />
          </div>
        </div>
        <div class="m-col col-width align-center">
          <div v-for="(type, i) in enneagramTypes" :key="i">
            <v-btn
              class="circle"
              fab
              :disabled="lock"
              :class="`class${type.name}Background ${
                type.name === type2 ? 'big' : ''
              }`"
              @click="type2 = type.name"
            >
              {{ type.name }}
            </v-btn>
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
    shuffleSpeed: 'shuffleMedium',
    enneagramTypes: [
      {
        name: 1,
        expanded: false
      },
      {
        name: 2,
        expanded: false
      },
      {
        name: 3,
        expanded: false
      },
      {
        name: 4,
        expanded: false
      },
      {
        name: 5,
        expanded: false
      },
      {
        name: 6,
        expanded: false
      },
      {
        name: 7,
        expanded: false
      },
      {
        name: 8,
        expanded: false
      },
      { name: 9, expanded: false }
    ],
    selectedType: null,
    selectedIndex: null,
    enneagramType: -1,
    type1: '',
    type2: '',
    relationshipThreads: null,
    lock: false
  }),
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  watch: {
    enneagramType (val) {
      this.$router.push({ path: `/relationships/${val}` })
      this.$router.go(1)
    }
  },
  methods: {
    async seeRelationship () {
      this.lock = true
      const resp = await this.$axios.get(
        `${endpoints.relationship}/${this.type1}/${this.type2}/10`
      )
      if (resp && resp.data) {
        console.log(resp.data)
        this.relationshipThreads = resp.data
      } else {
        console.log('failed')
      }
    },
    unlock () {
      this.lock = false
      this.relationshipThreads = null
    }
  },
  head () {
    return {
      title: 'Relationships'
    }
  }
}
</script>

<style lang="scss">
// .noshow{
//   // display: none;
//   visibility: hidden;
//   opacity: 0;
// }

.col-width {
  width: 100px;
}
.types {
  font-size: 10em;
}
.hidden {
  display: none;
  // visibility: hidden;
  opacity: 0;
}

.shuffleMedium-move {
  transition: transform 1s;
  top: 300px;
  transform-origin: right bottom;
  animation-name: opacityOnAndOff;
  visibility: visible;
  opacity: 1;
}
@keyframes opacityOnAndOff {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
// .shuffleMedium-leave {
//   transition: transform 1s;
//   top: 300px;
//   transform-origin: right bottom;
// }

.circle-container {
  display: flex;
  align-items: flex-start;
  list-style: none;
  margin: 50px auto 20px auto;
  flex-wrap: wrap;
}
.hoverBackground {
  :hover {
    border-radius: 50%;
    background-color: rgb(24, 24, 122);
  }
}
.noBackground {
  background-color: transparent !important;
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

.circle-pair {
  z-index: 2;
  opacity: 0.6;
  border-radius: 50%;
  height: 56px;
  width: 56px;
  align-items: center;
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
  line-height: normal;
}

.little_circle {
  width: 20px;
  height: 20px;
  // background-color: #61619e;
  border-radius: 50%;
  font: {
    size: 10px;
    family: sans-serif;
    weight: bold;
  }
  cursor: pointer;
  line-height: 20px;
  text-align: center;

  transition: all 1s linear;
  display: block;

  transition: transform 1s;
  top: 300px;
  transform-origin: right bottom;
  animation-name: opacityOnAndOff;
  visibility: visible;
  opacity: 0.4;
  :hover {
    background-color: rgb(124, 61, 61) !important;
    color: blue;
  }
}

@keyframes opacityOnAndOff {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
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
