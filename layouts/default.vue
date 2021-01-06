<template>
  <v-app id="inspire">
    <v-container>
      <client-only>
        <v-toolbar class="fun-color">
          <v-app-bar-nav-icon>
            <v-menu transition="fab-transition">
              <template v-slot:activator="{ on: menu, attrs }">
                <v-btn color="" text v-bind="attrs" v-on="{ ...menu }">
                  <v-icon>menu</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                  :to="{ path: item.to, query: {} }"
                  :disabled="
                    (item.validation && !$auth.user) || item.inprogress
                  "
                  router
                  exact
                >
                  <v-list-item-action>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title" />
                    <span class="coming-soon">
                      {{ item.inprogress ? 'Coming Soon' : '' }}
                      {{ item.validation && !$auth.user ? 'Login' : '' }}
                    </span>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-app-bar-nav-icon>
          <v-toolbar-title text>
            <h1>{{ title }}</h1>
          </v-toolbar-title>
          <v-spacer />

          <v-menu>
            <template v-slot:activator="{ on: menu, attrs }">
              <v-btn color="" text v-bind="attrs" :disabled="!$auth.user" v-on="{ ...menu }">
                <v-icon :color="(notifications && notifications.length) ? 'blue' : ''">
                  {{ (notifications && notifications.length) ? 'notifications_active' : 'notifications' }}
                </v-icon>
                {{ notifications.length }}
              </v-btn>
            </template>
            <notifications :notifications="notifications" />
          </v-menu>

          <v-menu>
            <template v-slot:activator="{ on: menu, attrs }">
              <v-btn color="" text v-bind="attrs" v-on="{ ...menu }">
                <v-icon>account_circle</v-icon>
              </v-btn>
            </template>
            <v-list>
              <!-- :disabled="(item.validation && !$auth.user)" -->
              <v-list-item v-if="!$auth.user" :to="'/auth'" router exact>
                <v-list-item-content>
                  <v-list-item-title v-text="'Login/ Register'" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="$auth.user" :to="'/profile'" router exact>
                <v-list-item-content>
                  <v-list-item-title v-text="'Profile'" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="$auth.user" @click="logout">
                <v-list-item-content>
                  <v-list-item-title v-text="'Logout'" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </client-only>

      <v-main>
        <v-container>
          <nuxt />
        </v-container>
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
import debounce from 'lodash.debounce'
import { endpoints } from '../models/endpoints'
import notifications from '~/components/notifications.vue'
export default {

  /* eslint-disable no-console */
  name: 'DefaultLayout',
  components: { notifications },

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
          icon: 'psychology',
          title: 'Personality Walls',
          to: '/personality'
        },

        {
          icon: 'question_answer',
          title: 'Question and Answer',
          to: '/questions'
        },

        {
          icon: 'dashboard',
          title: 'Dashboard',
          to: '/Dashboard',
          validation: true
        },
        {
          icon: 'emoji_people',
          title: 'Meetup',
          to: '/meetup',
          inprogress: true
        },
        {
          icon: 'mdi-comment-search-outline',
          title: 'Deep Search',
          to: '/questions/DeepSearch',
          inprogress: true
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: '9takes',
      notifications: []
    }
  },
  computed: {
    routes () {
      return this.$router.options.routes
    },
    user () {
      return this.$store.getters.getUser
    }
  },
  watch: {
    user (user) {
      if (this.$socket && user) {
        this.$socket.client.emit('join', this.$auth.user.id)
        this.$socket.$subscribe(
          `push:notifications:${this.$auth.user.id}`,
          async (data) => {
            console.log(data)
            const notification = await JSON.parse(data)
            if (notification) {
              this.notifications = [...notification]
            }
          }
        )
      }
    }
  },

  mounted () {
    // let visibilityChange
    // if (typeof document.hidden !== 'undefined') {
    //   visibilityChange = 'visibilitychange'
    // } else if (typeof document.mozHidden !== 'undefined') {
    //   visibilityChange = 'mozvisibilitychange'
    // } else if (typeof document.msHidden !== 'undefined') {
    //   visibilityChange = 'msvisibilitychange'
    // } else if (typeof document.webkitHidden !== 'undefined') {
    //   visibilityChange = 'webkitvisibilitychange'
    // }

    // document.addEventListener(visibilityChange, this.handlerClose)
    // window.addEventListener('focus', this.handlerClose)
    // window.addEventListener('blur', this.handlerClose)
  },
  sockets: {
    connect () {
      if (this.$auth && this.$auth.user && this.$auth.user.id) {
        this.$socket.client.emit('join', this.$auth.user.id)
      }
    },
    notification (e, f) {
      console.log('new notification')
      console.log(e)
      console.log(f)
    }
  },

  methods: {
    logout () {
      this.$store.commit('setAccessToken', '')
      this.$auth.setUserToken('')
      this.$auth.setUser(null)

      this.$router.push({
        path: '/auth'
      })
    },
    handlerClose: debounce(function (e) {
      if (this.$auth.user) {
        e.preventDefault()
        const focus = document.hasFocus()
        if (focus) {
          console.log('has focus')
          this.$axios.get(endpoints.userEnter).then((resp) => {
            if (resp) {
              console.log(resp)
            }
          })
        } else {
          console.log('lost focus')
          this.$axios.get(endpoints.userLeave).then((resp) => {
            if (resp) {
              console.log(resp)
            }
          })
        }
      }
    }, 1000)
  }
}
</script>
<style>
.fun-color {
  background: linear-gradient(to right, pink, #89cff0);
}
</style>
