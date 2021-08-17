<template>
  <header id="toolbar" class="toolbar master-container fun-color shadow">
    <div class="row-center">
      <v-menu transition="fab-transition">
        <template v-slot:activator="{ on: menu, attrs }">
          <v-btn color="fpink" text v-bind="attrs" v-on="{ ...menu }">
            <v-icon>menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-if="user && user.role === 'admin'" router :to="{ path: '/admin' }">
            <v-list-item-action>
              <v-icon>admin_panel_settings</v-icon>
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
              <span class="coming-soon">
                {{ item.inprogress ? 'Coming Soon' : '' }}
                {{ item.validation && !user ? 'Login' : '' }}
              </span>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <h1 class="glow clickable-no-hov" @click="goHome">
        {{ title }}
      </h1>
    </div>
    <v-spacer />
    <div v-if="user">
      <v-menu>
        <template v-slot:activator="{ on: menu, attrs }">
          <v-btn color="fpink" text v-bind="attrs" v-on="{ ...menu }">
            <v-icon color="fpink">
              {{
                notifications && notifications.length
                  ? 'notifications_active'
                  : 'notifications_none'
              }}
            </v-icon>
            {{ notifications.length ? notifications.length : '' }}
          </v-btn>
        </template>
        <notifications :notifications="notifications" />
      </v-menu>

      <v-menu>
        <template v-slot:activator="{ on: menu, attrs }">
          <v-btn color="fpink" text v-bind="attrs" v-on="{ ...menu }">
            <v-icon>account_circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <!-- :disabled="(item.validation && !user)" -->
          <v-list-item v-if="!user" :to="'/auth'" router exact>
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
      v-else
      :to="{ path: '/auth', query: {} }"
      color="fpink"
      class="shadow btn-shrink-mobile"
    >
      Login/ Register
    </v-btn>
  </header>
</template>

<script>
import debounce from 'lodash.debounce'
import { endpoints } from '../../models/endpoints'
import notifications from '~/components/notifications'
export default {
  name: 'Toolbar',
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
          icon: 'mdi-post',
          title: 'Blog',
          to: '/blog'
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
          icon: 'mdi-account-multiple',
          title: 'Relationships',
          to: '/relationships'
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
      title: '9takes Beta',
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
      this.subscrbeToNotifs()
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
      this.subscrbeToNotifs()
    }
  },

  methods: {
    logout () {
      this.$store.commit('setAccessToken', '')
      this.$store.commit('setUser', null)
      this.$9tcookie.set('9tcookie', null)
      this.$router.push({ path: '/auth' })
      this.$router.go(1)
    },
    handlerClose: debounce(function (e) {
      if (this.user) {
        e.preventDefault()
        const focus = document.hasFocus()
        if (focus) {
          this.$axios.get(endpoints.userEnter).then((resp) => {
            if (resp) {
              console.log(resp)
            }
          })
        } else {
          this.$axios.get(endpoints.userLeave).then((resp) => {
            if (resp) {
              console.log(resp)
            }
          })
        }
      }
    }, 1000),

    goHome () {
      this.$router.push({ path: '/', query: {} })
      this.$router.go(1)
    },
    subscrbeToNotifs () {
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

.fun-color {
  background: $midnight !important;
}
.glow {
  color: #fff;
  text-align: center;
  -webkit-animation: glow 1s ease-in-out infinite alternate !important;
  -moz-animation: glow 1s ease-in-out infinite alternate !important;
  animation: glow 1s ease-in-out infinite alternate !important;
}
@-webkit-keyframes glow {
  to {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073,
      0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
  }
  from {
    text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6,
      0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
  }
}
@keyframes glow {
  to {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073,
      0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
  }
  from {
    text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6,
      0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
  }
}

.pad-title {
  padding: 0 50px;
}
</style>
