<template>
  <v-list v-if="notifs && notifs.length">
    <v-list-item v-for="(notification, i) in notifs" :key="i" class="clickable">
      <v-list-item-content @click="goToNotification(notification, i)">
        <v-list-item-title v-if="notification.question">
          <p class="overFlow">
            Question: {{ notification.question.text }}
          </p>
          <p class="overFlow">
            Comment: {{ notification.notification.text }}
          </p>
          <p>
            {{ getTime(notification.time) }}
          </p>
        </v-list-item-title>
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
      const n = notification
      console.log(n)
      this.$router.push({ path: `/questions/${n.question.id}` })
      this.$router.go(1)
      this.notifs.splice(i, 1)
      await this.$axios.put(endpoints.clearNotifications)
      setTimeout(() => {
        const scrollSpot = document.getElementById(n.notification.id)
        if (scrollSpot) {
          scrollSpot.scrollIntoView()
          window.find(n.notification.text)
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
