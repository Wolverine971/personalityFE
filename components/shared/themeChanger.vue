<template>
  <!--      dark-mode switch -->
  <v-card-text>
    <v-card
      v-for="(theme, index) in themes"
      :key="index"
      class="my-2"
      :disabled="$vuetify.theme.themes.name === theme.name"
      hover
      outlined
      @click="setTheme(theme)"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            {{ theme.name }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-avatar
            v-if="$vuetify.theme.themes.name === theme.name"
            color="success"
            size="30"
          >
            <v-icon>mdi-check</v-icon>
          </v-avatar>
        </v-list-item-action>
      </v-list-item>
      <div class="my-2">
        <v-chip
          v-for="(key, i) in Object.keys(theme.dark)"
          :key="i"
          class="mx-1"
          label
          :color="theme.dark[key]"
        >
          {{ key }}
        </v-chip>
      </div>
      <div class="my-2">
        <v-chip
          v-for="(key, i) in Object.keys(theme.light)"
          :key="i"
          class="mx-1"
          label
          :color="theme.light[key]"
        >
          {{ key }}
        </v-chip>
      </div>
    </v-card>
  </v-card-text>
  <!--      menu content end -->
</template>

<script>
import colors from 'vuetify/es5/util/colors'
export default {
  name: 'ThemeChanger',
  data: () => ({
    //   primary: '#121212', // a color that is not in the material colors palette
    // accent: '#F72585',
    // secondary: colors.amber.darken3,
    // info: colors.teal.lighten1,
    // warning: colors.amber.base,
    // error: colors.deepOrange.accent4,
    // success: colors.green.accent3,
    // fmidnight: '#191970',
    // fpink: '#F72585',
    // fcultured: '#F3F3F4'
    menu: false,
    themes: [
      {
        name: 'Theme 1',
        dark: {
          primary: '#121212',
          accent: '#F72585',
          secondary: '#191970',
          success: '#F72585',
          info: '#F3F3F4',
          warning: '#FB8C00',
          error: '#FF5252'
        },
        light: {
          primary: '#22daff',
          accent: '#ff6b99',
          secondary: '#26ff8c',
          success: '#a5d64c',
          info: '#ff53d0',
          warning: '#ff8e00',
          error: '#ff5252'
        },
        another: {
          primary: '#121212', // a color that is not in the material colors palette
          accent: '#F72585',
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      },
      {
        name: 'Theme 2',
        dark: {
          primary: '#E65100',
          accent: '#7CB342',
          secondary: '#689F38',
          success: '#4CAF50',
          info: '#6156d8',
          warning: '#1565C0',
          error: '#FF7043'
        },
        light: {
          primary: '#ffa450',
          accent: '#a1e754',
          secondary: '#92de4e',
          success: '#6dff74',
          info: '#7365ff',
          warning: '#2e8ac0',
          error: '#ff5e3c'
        }
      }
    ]
  }),
  methods: {
    setTheme (theme) {
      // close menu
      this.menu = false
      const name = theme.name
      const dark = theme.dark
      const light = theme.light
      // set themes
      Object.keys(dark).forEach((i) => {
        this.$vuetify.theme.themes.dark[i] = dark[i]
      })
      Object.keys(light).forEach((i) => {
        this.$vuetify.theme.themes.light[i] = light[i]
      })
      // also save theme name to disable selection
      this.$vuetify.theme.themes.name = name
    }
  }
}
</script>
