<template>
  <div>
    <v-list v-if="notifs && notifs.length">
      <v-list-item
        v-for="(notification, i) in notifs"
        :key="i"
        class="clickable"
      >
        <v-list-item-content @click="goToNotification(notification, i)">
          <v-list-item-title v-if="notification.question">
            <p class="overFlow">
              Question: {{ notification.question.text }}
            </p>
            <p class="overFlow">
              Comment: {{ notification.notification.text }}
            </p>
          </v-list-item-title>
          <v-list-item-subtitle v-if="notification.question">
            {{ getTime(notification.time) }}
          </v-list-item-subtitle>
          <v-list-item-title v-else>
            <p>{{ notifs }}</p>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list v-else>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title v-text="'No Notifications'" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { msToTime } from '../utils'
import { endpoints } from '~/models/endpoints'
export default {
  name: 'Notifications',
  props: {
    notifications: {
      type: Array,
      required: true,
      default: null
    }
  },
  data () {
    return {
      notifs: []
    }
  },
  watch: {
    notifications (vals) {
      if (vals) {
        this.notifs = vals
      }
    }
  },
  mounted () {
    this.notifs = this.notifications
  },
  methods: {
    async goToNotification (notification, i) {
      this.$router.push({ path: `/questions/${notification.question.url}` })
      this.$router.go(1)
      this.notifs.splice(i, 1)
      await this.$axios.put(endpoints.clearNotifications)
      setTimeout(() => {
        const scrollSpot = document.getElementById(notification.notification.id)
        if (scrollSpot) {
          scrollSpot.scrollIntoView()
          if (window) {
            window.find(notification.notification.text)
          }
        }
      }, 1000)
    },
    getTime (time) {
      return msToTime(time)
    }
  }
}
</script>

<style>
.overFlow {
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 300px;
  margin-bottom: 5px !important;
}

.clickable:hover {
  background-color: #fafafb;
}
</style>
