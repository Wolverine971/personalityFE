<template>
  <div>
    <v-card
      v-for="(theme, index) in themes"
      :key="index"
      class="my-2"
      :disabled="
        $vuetify.theme &&
          $vuetify.theme.themes &&
          $vuetify.theme.themes.name === theme.name
      "
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
            v-if="
              $vuetify.theme &&
                $vuetify.theme.themes &&
                $vuetify.theme.themes.name === theme.name
            "
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
  </div>
  <!--      menu content end -->
</template>

<script>
// import colors from 'vuetify/es5/util/colors'
// <h1 class="brick-background">
// <h1 class="brick-background primary--text">
// themes[ watermelon, midnight, carnival, clean]
export default {
  name: 'ThemeChanger',
  data: () => ({
    menu: false,
    themes: [
      {
        name: 'Theme 1',
        dark: {
          primary: '#191970',
          primary_v: '#311673',
          secondary: '#F72585',
          secondary_v: '#841648',
          accent: '#121212',
          accent_v: '#f6f6f6',
          success: '#F72585',
          info: '#F3F3F4',
          warning: '#FB8C00',
          error: '#FF5252'
        },
        light: {
          primary: '#191970',
          primary_v: '#311673',
          secondary: '#F72585',
          secondary_v: '#841648',
          accent: '#121212',
          accent_v: '#f6f6f6',
          success: '#F72585',
          info: '#F3F3F4',
          warning: '#FB8C00',
          error: '#FF5252'
        }
      },
      {
        name: 'Theme 2',
        dark: {
          primary: '#191970',
          primary_v: '#0f0f3c',
          secondary: '#cd25f7',
          secondary_v: '#7e1698',
          accent: '#7CB342',
          accent_v: '#f6f6f6',
          success: '#4CAF50',
          info: '#6156d8',
          warning: '#1565C0',
          error: '#FF7043'
        },
        light: {
          primary: '#191970',
          primary_v: '#0f0f3c',
          secondary: '#cd25f7',
          secondary_v: '#7e1698',
          accent: '#a1e754',
          accent_v: '#f6f6f6',
          success: '#6dff74',
          info: '#7365ff',
          warning: '#2e8ac0',
          error: '#ff5e3c'
        }
      },
      {
        name: 'Theme 3',
        dark: {
          primary: '#223982',
          primary_v: '#142350',
          secondary: '#3f3fbc',
          secondary_v: '#442cca',
          accent: '#ddfb63',
          accent_v: '#81923b',
          success: '#f2edf0',
          info: '#3a3a3a',
          warning: '#fb8c00',
          error: '#ff5252'
        },
        light: {
          primary: '#223982',
          primary_v: '#142350',
          secondary: '#3f3fbc',
          secondary_v: '#442cca',
          accent: '#ddfb63',
          accent_v: '#81923b',
          success: '#f2edf0',
          info: '#3a3a3a',
          warning: '#fb8c00',
          error: '#ff5252'
        }
      },
      {
        name: 'Theme 4',
        dark: {
          primary: '#4d4dad',
          primary_v: '#353579',
          secondary: '#03a9f4',
          secondary_v: '#2ea4db',
          accent: '#f6f6f6',
          accent_v: '#f6f6f6',
          success: '#f2edf0',
          info: '#3a3a3a',
          warning: '#fb8c00',
          error: '#ff5252'
        },
        light: {
          primary: '#4d4dad',
          primary_v: '#353579',
          secondary: '#03a9f4',
          secondary_v: '#2ea4db',
          accent: '#f6f6f6',
          accent_v: '#f6f6f6',
          success: '#f2edf0',
          info: '#3a3a3a',
          warning: '#fb8c00',
          error: '#ff5252'
        }
      },
      {
        name: 'Theme 5',
        dark: {
          primary: '#0c173a',
          primary_v: '#03060e',
          secondary: '#4e5065',
          secondary_v: '#292a38',
          accent: '#378ea9',
          accent_v: '#f6f6f6',
          success: '#f2edf0',
          info: '#3a3a3a',
          warning: '#fb8c00',
          error: '#ff5252'
        },
        light: {
          primary: '#0c173a',
          primary_v: '#03060e',
          secondary: '#4e5065',
          secondary_v: '#292a38',
          accent: '#378ea9',
          accent_v: '#f6f6f6',
          success: '#f2edf0',
          info: '#3a3a3a',
          warning: '#fb8c00',
          error: '#ff5252'
        }
      },
      {
        name: 'Theme 6',
        dark: {
          primary: '#8888d6',
          primary_v: '#5252bd',
          secondary: '#cd25f7',
          secondary_v: '#921daf',
          accent: '#7CB342',
          accent_v: '#f6f6f6',
          success: '#4CAF50',
          info: '#6156d8',
          warning: '#1565C0',
          error: '#FF7043'
        },
        light: {
          primary: '#8888d6',
          primary_v: '#5252bd',
          secondary: '#cd25f7',
          secondary_v: '#921daf',
          accent: '#a1e754',
          accent_v: '#f6f6f6',
          success: '#6dff74',
          info: '#7365ff',
          warning: '#2e8ac0',
          error: '#ff5e3c'
        }
      },
      {
        name: 'Theme 7',
        dark: {
          primary: '#4084FF',
          primary_v: '#223982',
          secondary: '#ff5252',
          secondary_v: '#e67878',
          accent: '#E0EF4D',
          accent_v: '#ccd670',
          success: '#4CAF50',
          info: '#6156d8',
          warning: '#1565C0',
          error: '#FF7043'
        },
        light: {
          primary: '#4084FF',
          primary_v: '#223982',
          secondary: '#ff5252',
          secondary_v: '#e67878',
          accent: '#E0EF4D',
          accent_v: '#ccd670',
          success: '#4CAF50',
          info: '#6156d8',
          warning: '#1565C0',
          error: '#FF7043'
        }
      },
      {
        name: 'Theme 8',
        dark: {
          primary: '#ae4def',
          primary_v: '#6a2f8f',
          secondary: '#ef4d8e',
          secondary_v: '#d67099',
          accent: '#e0ef4d',
          accent_v: '#959c32',
          success: '#4CAF50',
          info: '#6156d8',
          warning: '#1565C0',
          error: '#FF7043'
        },
        light: {
          primary: '#ae4def',
          primary_v: '#6a2f8f',
          secondary: '#ef4d8e',
          secondary_v: '#d67099',
          accent: '#e0ef4d',
          accent_v: '#959c32',
          success: '#4CAF50',
          info: '#6156d8',
          warning: '#1565C0',
          error: '#FF7043'
        }
      },
      {
        name: 'Theme 9',
        dark: {
          primary: '#191970',
          primary_v: '#1e1e80',
          secondary: '#701919',
          secondary_v: '#5e1414',
          accent: '#707019',
          accent_v: '#5c5b14',
          success: '#4CAF50',
          info: '#6156d8',
          warning: '#1565C0',
          error: '#FF7043'
        },
        light: {
          primary: '#191970',
          primary_v: '#1e1e80',
          secondary: '#701919',
          secondary_v: '#5e1414',
          accent: '#707019',
          accent_v: '#5c5b14',
          success: '#4CAF50',
          info: '#6156d8',
          warning: '#1565C0',
          error: '#FF7043'
        }
      },
      {
        name: 'Theme 10',
        dark: {
          primary: '#1e1e80',
          primary_v: '#1a1a69',
          secondary: '#e88b2d',
          secondary_v: '#ba6d21',
          accent: '#691a69',
          accent_v: '#873c86',
          success: '#4CAF50',
          info: '#6156d8',
          warning: '#1565C0',
          error: '#FF7043'
        },
        light: {
          primary: '#1e1e80',
          primary_v: '#1a1a69',
          secondary: '#e88b2d',
          secondary_v: '#ba6d21',
          accent: '#691a69',
          accent_v: '#873c86',
          success: '#4CAF50',
          info: '#6156d8',
          warning: '#1565C0',
          error: '#FF7043'
        }
      },
      {
        name: 'Watermelon',
        dark: {
          // green
          primary: '#42ef4b',
          primary_v: '#288f2d',
          // pink
          secondary: '#ff8aa3',
          secondary_v: '#a55f6e',
          // blueish
          accent: '#55c8e1',
          accent_v: '#2a6572',
          success: '#F72585',
          info: '#F3F3F4',
          warning: '#FB8C00',
          error: '#FF5252'
        },
        light: {
          // green
          primary: '#42ef4b',
          primary_v: '#288f2d',
          // pink
          secondary: '#ff8aa3',
          secondary_v: '#a55f6e',
          // blueish
          accent: '#55c8e1',
          accent_v: '#2a6572',
          success: '#F72585',
          info: '#F3F3F4',
          warning: '#FB8C00',
          error: '#FF5252'
        }
      },
      {
        name: 'Batman',
        dark: {
          // batman blue
          primary: '#111111',
          primary_v: '#111111',
          // black
          secondary: '#0088c0',
          secondary_v: '#0088c0',
          // grey
          accent: '#d0c8bb',
          accent_v: '#d0c8bb',
          success: '#F72585',
          info: '#F3F3F4',
          warning: '#FB8C00',
          error: '#FF5252'
        },
        light: {
          // batman blue
          primary: '#111111',
          primary_v: '#111111',
          // black
          secondary: '#0088c0',
          secondary_v: '#0088c0',
          // grey
          accent: '#d0c8bb',
          accent_v: '#d0c8bb',
          success: '#F72585',
          info: '#F3F3F4',
          warning: '#FB8C00',
          error: '#FF5252'
        }
      }
    ]
  }),
  methods: {
    setTheme (theme) {
      try {
        console.log('setting theme')
        // close menu
        this.menu = false
        const name = theme.name
        const dark = theme.dark
        const light = theme.light
        // set themes
        const bodyStyles = document.body.style
        Object.keys(dark).forEach((i) => {
          this.$vuetify.theme.themes.dark[i] = dark[i]
          bodyStyles.setProperty(`--${i}`, dark[i])
        })
        Object.keys(light).forEach((i) => {
          this.$vuetify.theme.themes.light[i] = light[i]
        })
        // also save theme name to disable selection
        this.$vuetify.theme.themes.name = name
      } catch (e) {
        console.log(e)
        console.log(e)
      }
    }
  }
}
</script>
