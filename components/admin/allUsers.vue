<template>
  <div class="m-col">
    Total users: {{ totalUsers }}
    <v-card v-for="user in allUsers" :key="user.id" class="margin-bot">
      <v-card-text class="pad-bot clickable">
        <div class="row space-between">
          <div class="margin-left">
            Name: {{ user.firstName }} {{ user.lastName }}
          </div>
          <div>
            <v-btn v-if="admin" outlined small>
              Id: {{ user.id }}
            </v-btn>
            <v-btn v-if="admin" outlined small>
              Email: {{ user.email }}
            </v-btn>
            <v-btn v-if="admin" outlined small>
              Author Enneagram: {{ user.enneagramId }}
            </v-btn>
            <v-btn v-if="admin" outlined small>
              DateCreated: {{ getTime(user.dateCreated) }}
            </v-btn>
            <v-btn v-if="admin" outlined small>
              Role: {{ user.role }}
            </v-btn>
            <v-btn
              v-if="admin && user.email !== user.email"
              outlined
              small
              color="red"
              @click="deleteUser(user)"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <div
      v-if="usersCount < totalUsers && !usersLoading"
      class="row"
      @click="loadMoreUsers"
    >
      <v-btn outlined color="secondary">
        Load More
      </v-btn>
    </div>
    <v-progress-linear v-else-if="usersLoading" indeterminate />
  </div>
</template>

<script>
import { msToTime } from '../../utils'
import { endpoints } from '../../models/endpoints'
export default {
  name: 'AllUsers',
  props: {
    admin: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data () {
    return {
      allUsers: [],
      pageSize: 10,
      usersCount: 0,
      usersLoading: false,
      key: -1,
      cursorId: null
    }
  },
  computed: {
    users () {
      return this.$store.getters.getAllUsers
    },
    totalUsers () {
      return this.$store.getters.getAllUsersCount
    },
    user () {
      return this.$store.getters.getUser
    }
  },
  watch: {
    users (users) {
      this.parseUsers(users)
    },
    allUsers (val) {
      this.usersCount = val.length
    }
  },
  mounted () {
    if (!this.totalUsers) {
      this.$store.dispatch('getPaginatedUsers', this.cursorId)
    } else {
      const users = this.$store.getters.getAllUsers
      this.parseUsers(users)
    }
  },
  methods: {
    async loadMoreUsers () {
      this.usersLoading = true
      await this.$store.dispatch('getPaginatedUsers', this.cursorId)
      this.usersLoading = false
    },
    parseUsers (users) {
      this.allUsers = [...users]
      this.cursorId = users[users.length - 1].id
    },
    getTime (time) {
      return msToTime(time)
    },
    async deleteUser (user) {
      const resp = await this.$axios.post(
          `${endpoints.change}`,
          { type: 'user', tag: user.id }
      )
      if (resp && resp.data) {
        this.allUsers = this.allUsers.filter(q => q.id !== user.id)
      }
    }
  }

}
</script>

<style>

</style>
