import Vue from 'vue'
import colors from 'vuetify/es5/util/colors'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify, {
  treeShake: true,
  theme: {
    primary: '#121212', // a color that is not in the material colors palette
    accent: '#F72585',
    secondary: colors.amber.darken3,
    info: colors.teal.lighten1,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3
  }
})
