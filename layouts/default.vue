<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="6">
            <v-toolbar>
              <v-app-bar-nav-icon>
                <v-menu>
                  <template v-slot:activator="{ on: menu, attrs }">
                    <v-btn
                      color="primary"
                      text
                      v-bind="attrs"
                      v-on="{ ...menu }"
                    >
                      <v-icon>menu</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(item, i) in items"
                      :key="i"
                      :to="{ path: item.to, query: {} }"
                      router
                      exact
                    >
                      <!-- { path: 'register', query: { plan: 'private' }} -->
                      <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title v-text="item.title" />
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-app-bar-nav-icon>
              <v-toolbar-title class="primary--text bubble-font" text>
                <h1>{{ title }}</h1>
              </v-toolbar-title>
              <v-spacer />
              <v-menu>
                <template v-slot:activator="{ on: menu, attrs }">
                  <v-btn color="primary" text v-bind="attrs" v-on="{ ...menu }">
                    <v-icon>account_circle</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item :to="'/profile'" router exact>
                    <v-list-item-content>
                      <v-list-item-title v-text="'Profile'" />
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item @click="logout">
                    <v-list-item-content>
                      <v-list-item-title v-text="'Logout'" />
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>

            <v-main>
              <v-container>
                <nuxt />
              </v-container>
            </v-main>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  /* eslint-disable no-console */
  name: 'DefaultLayout',

  data () {
    return {
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'home',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'emoji_people',
          title: 'Meetup',
          to: '/meetup'
        },
        {
          icon: 'question_answer',
          title: 'Question and Answer',
          to: '/questions'
        },
        {
          icon: 'mdi-comment-search-outline',
          title: 'Search Questions',
          to: '/questions/SearchQuestion'
        },
        {
          icon: 'dashboard',
          title: 'Dashboard',
          to: '/Dashboard'
        },
        {
          icon: 'psychology',
          title: 'Personality',
          to: '/personality'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: '9takes'
    }
  },
  computed: {
    routes () {
      return this.$router.options.routes
    }
  },
  updated () {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        console.log('*****************DJ SW**************************')
        // this.playWithSW('yo')
      })
    }
  },

  methods: {
    logout () {
      this.$store.commit('setAccessToken', '')
      this.$auth.setUserToken('')

      this.$router.push({
        path: '/auth'
      })
    }
  }
}
</script>
