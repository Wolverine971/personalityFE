<template>
  <v-list v-if="notifs && notifs.length">
    <v-list-item v-for="(notification, i) in notifs" :key="i" class="selectable">
      <v-list-item-content @click="goToNotification(notification, i)">
        <v-list-item-title v-if="notification.question">
          <p class="overFlow">
            Question: {{ notification.question.text }}
          </p>
          <p class="overFlow">
            Comment: {{ notification.notification.text }}
          </p>
          <p>
            {{ msToTime(notification.time) }}
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
        <v-list-item-title>
          <p>No Notifications</p>
          <p>{{ notifs }}</p>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
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
      document.getElementById(n.notification.id).scrollIntoView()
      const vis = window.find(n.notification.text)
      console.log(vis)
    },
    msToTime (time) {
      const newDate = new Date()
      let s = newDate - new Date(time)

      const ms = s % 1000
      s = (s - ms) / 1000
      const secs = s % 60
      s = (s - secs) / 60
      const mins = s % 60
      s = (s - mins) / 60
      const hrs = s % 60
      s = (s - hrs) / 24
      const days = s % 24

      if (days) {
        return days + ' days ago'
      } else if (hrs) {
        return hrs + ' hours ago'
      } else {
        return mins + ' minutes ' + secs + ' seconds ago'
      }
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
.selectable {
  cursor: pointer;
}
.selectable:hover {
  background-color: #fafafb;
}
</style>
