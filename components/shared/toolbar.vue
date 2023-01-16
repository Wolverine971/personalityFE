<template>
  <client-only>
    <header
      id="toolbar"
      class="toolbar master-container shadow fun-color"
      :class="{ 'mobile-toolbar': $vuetify.breakpoint.mobile }"
    >
      <div class="row-center">
        <v-menu transition="fab-transition">
          <template v-slot:activator="{ on: menu, attrs }">
            <v-btn
              color="secondary"
              text
              v-bind="attrs"
              :class="{ 'x-small': $vuetify.breakpoint.mobile }"
              v-on="{ ...menu }"
            >
              <v-icon>menu</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-if="!user && $vuetify.breakpoint.mobile"
              router
              :to="{ path: '/auth/login' }"
            >
              <v-list-item-action>
                <v-icon>mdi-login</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title> Login/ Register</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-if="user && user.role === 'admin'"
              router
              :to="{ path: '/admin' }"
            >
              <v-list-item-action>
                <v-icon>settings</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title> Admin Page</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :to="{ path: item.to, query: {} }"
              :disabled="(item.validation && !user) || item.inprogress"
              router
              exact
            >
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
                <span class="secondary">
                  {{ item.inprogress ? 'Coming Soon' : '' }}
                  {{ item.validation && !user ? 'Login' : '' }}
                </span>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        <h3 class="glow clickable-no-hov secondary_v--text" @click="goHome">
          {{ title }}
        </h3>
      </div>
      <v-spacer />
      <!-- <div v-if="user || accessToken"> -->
      <div v-if="user">
        <v-menu>
          <template v-slot:activator="{ on: menu, attrs }">
            <v-btn color="secondary" text v-bind="attrs" v-on="{ ...menu }">
              <v-icon color="secondary">
                {{
                  notifications && notifications.length
                    ? 'notifications_active'
                    : 'notifications_none'
                }}
              </v-icon>
              {{
                notifications && notifications.length
                  ? notifications.length
                  : ''
              }}
            </v-btn>
          </template>
          <notifications :notifications="notifications" />
        </v-menu>

        <v-menu>
          <template v-slot:activator="{ on: menu, attrs }">
            <v-btn color="secondary" text v-bind="attrs" v-on="{ ...menu }">
              <v-icon>account_circle</v-icon>
            </v-btn>
          </template>
          <v-list>
            <!-- :disabled="(item.validation && !user)" -->
            <v-list-item v-if="!user" :to="'/auth/login'" router exact>
              <v-list-item-content>
                <v-list-item-title v-text="'Login/ Register'" />
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="user" :to="'/profile'" router exact>
              <v-list-item-content>
                <v-list-item-title v-text="'Profile'" />
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="user" @click="logout">
              <v-list-item-content>
                <v-list-item-title v-text="'Logout'" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <v-btn
        v-else-if="
          $route.name &&
            !$route.name.includes('auth') &&
            !$vuetify.breakpoint.mobile
        "
        :to="{ path: '/auth/login', query: {} }"
        class="shadow btn-shrink-mobile authBtn"
      >
        Login/ Register
        <v-icon right dark>
          mdi-login
        </v-icon>
      </v-btn>
      <!-- </div> -->
    </header>
  </client-only>
</template>

<script>
// import debounce from 'lodash.debounce'
// import { endpoints } from '../../models/endpoints'
export default {
  name: 'Toolbar',
  components: { notifications: () => import('~/components/notifications') },
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
          icon: 'mdi-post',
          title: 'Blog',
          to: '/blog'
        },

        {
          icon: 'question_answer',
          title: 'Question and Answer',
          to: '/questions'
        }
        // {
        //   icon: 'psychology',
        //   title: 'Personality Walls',
        //   to: '/personality'
        // },
        // {
        //   icon: 'mdi-account-multiple',
        //   title: 'Relationships',
        //   to: '/relationships'
        // },
        // {
        //   icon: 'emoji_people',
        //   title: 'Meetup',
        //   to: '/meetup',
        //   inprogress: true
        // },
        // {
        //   icon: 'mdi-comment-search-outline',
        //   title: 'Deep Search',
        //   to: '/questions/DeepSearch',
        //   inprogress: true
        // }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: '9takes',
      notifications: [],
      header: null,
      sticky: 0
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
    user () {
      this.subscribeToNotifs()
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
    // this.header = document.getElementById('toolbar')
    // this.sticky = this.header.offsetTop
    // window.onscroll = () => { this.stickyFunc() }
  },
  sockets: {
    connect () {
      this.subscribeToNotifs()
    }
  },

  methods: {
    logout () {
      this.$store.dispatch('logout')
      // this.$store.dispatch('setAnonymous')
      this.$router.push({ path: '/auth/login' })
      this.$router.go(1)
    },
    // handlerClose: debounce(function (e) {
    //   if (this.user) {
    //     e.preventDefault()
    //     const focus = document.hasFocus()
    //     if (focus) {
    //       this.$axios.get(endpoints.userEnter).then((resp) => {
    //         if (resp) {
    //           console.log(resp)
    //         }
    //       })
    //     } else {
    //       this.$axios.get(endpoints.userLeave).then((resp) => {
    //         if (resp) {
    //           console.log(resp)
    //         }
    //       })
    //     }
    //   }
    // }, 1000),

    goHome () {
      this.$router.push({ path: '/', query: {} })
      this.$router.go(1)
    },
    subscribeToNotifs () {
      if (this.$socket && this.user && this.user.id) {
        this.$socket.client.emit('join', this.user.id)
        if (this.$socket.$subscribe) {
          this.$socket.$subscribe(
            `push:notifications:${this.user.id}`,
            async (data) => {
              const notification = await JSON.parse(data)
              if (notification) {
                this.notifications = [...notification]
              }
            }
          )
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/variables.scss';

.pad-title {
  padding: 0 50px;
}

.fun-color {
  border: 2px solid var(--primary) !important;
  border-color: var(--primary) !important;
  background-color: #ffffff;
}
</style>
