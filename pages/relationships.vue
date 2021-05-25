<template>
  <div>
    <h1>Relationships</h1>
    <h2>Share Experiences</h2>
    <div class="circle-container cont">
      <!-- <input
        type="number"
        class="viewer"
        maxlength="1"
        min="1"
        max="9"
        step="1"
      > -->
      <div class="row">
        <div class="col col-width align-center">
          <div v-for="(type, i) in enneagramTypes" :key="i">
            <v-btn
              class="circle"
              fab
              :class="`class${type.name}Background ${type.name === type1 ? 'big' : ''}`"
              @click="type1 = type.name"
            >
              <!-- @click="expand(type)" -->
              {{ type.name }}
            </v-btn>
          </div>
        </div>

        <!-- <div id="container" style="position:relative;">
    <div id="div1" style="position:absolute; top:0; left:0;"></div>
    <div id="div2" style="position:absolute; top:0; left:0;"></div>
</div> -->

        <div class="circle-join-box" style="position:relative;">
          <v-btn v-if="type1 && type2" @click="seeRelationship">
            View {{ type1 }} Relationship with {{ type2 }}
          </v-btn>
          <div class="types circle-join" :class="`class${type1}Background`" style="position:absolute; top:10%;">
            {{ type1 }}
          </div>
          <div class="types circle-join" :class="`class${type2}Background`" style="position:absolute; top:40%;">
            {{ type2 }}
          </div>
        </div>
        <div class="col col-width align-center">
          <div v-for="(type, i) in enneagramTypes" :key="i">
            <v-btn
              class="circle"
              fab
              :class="`class${type.name}Background ${type.name === type2 ? 'big' : ''}`"
              @click="type2 = type.name"
            >
              <!-- @click="expand(type)" -->
              {{ type.name }}
            </v-btn>
          </div>
        </div>
      </div>
    </div>
    <!-- <v-menu v-for="(type, i) in enneagramTypes" :key="i" offset-y>
          <template v-slot:activator="{ attrs, on }">
            <div v-bind="attrs" v-on="on">
              <v-btn class="circle" fab :class="`class${type.name}Background`">
                {{ type.name }}
              </v-btn>
              <div
                v-if="selectedType && i === selectedIndex"
                :class="`class${selectedType}Background`"
                class="circle-pair"
              >
                {{ selectedType }}
              </div>
            </div>
          </template>

          <v-list>
            <v-list-item v-for="(littleCircle, j) in enneagramTypes" :key="j">
              <v-list-item-title @click="typeSelect(i, littleCircle.name)">
                {{ littleCircle.name }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu> -->
    <!-- </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'Relationships',
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
    type2: ''
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
    expand (type) {
      console.log(type)
      // type.expanded = !type.expanded
      this.enneagramTypes.forEach((e) => {
        e.expanded = false
      })
      type.expanded = !type.expanded
      // this[type] = true
    },
    typeSelect (index, type) {
      console.log(index)
      this.selectedType = type
      this.selectedIndex = index
    },
    seeRelationship () {

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
  width: 200px;
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
  max-width: 700px;
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
  width: 50px;
  height: 50px;
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

  // @keyframes example {
  //   from {
  //     background-color: red;
  //   }
  //   to {
  //     background-color: yellow;
  //   }
  // }
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
@keyframes stretchOut {
  0% {
    transform: scale(0.3);
    background-color: rgb(178, 193, 197);
    border-radius: 100%;
  }
  50% {
    background-color: rgb(0, 255, 221);
  }
  100% {
    transform: scale(1.5);
    background-color: rgb(26, 156, 207);
  }
}

.viewer {
  color: #c97874;
  float: left;
  line-height: 3em;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 7.5em;
  height: 3em;
}

.viewer:focus {
  outline: none !important;
}

.circle-join {
  border-radius: 50%;
  cursor: pointer;
  width: 100%;
  opacity: 50%;
  position: absolute;
}

// .circle-join2 {
//   top: 20% !important;
// }

.circle-join-box {
  flex: 1;
  text-align: center;
}
.big {
  font-size: 5em !important;
    height: 100px !important;
    width: 100px !important;
}

// .cont{
//   font-size: 28px;
//   margin: 0 auto;
//   width: 10em;

//   &::before,
//   &::after {
//     content: " ";
//     display: table;
//   }

//   &::after {
//     clear: both;
//   }
// }

input[type='number'] {
  -moz-appearance: textfield !important;
  -webkit-appearance: none !important;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
