<template>
  <div class="m-col">
    Total users: {{ totalUsers }}

    <v-expansion-panels>
      <v-expansion-panel v-for="u in allUsers" :key="u.id">
        <v-expansion-panel-header>
          Name: {{ u.firstName }} {{ u.lastName }}, {{ u.email }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-btn v-if="admin" outlined small>
            Id: {{ u.id }}
          </v-btn>
          <v-btn v-if="admin" outlined small>
            Email: {{ u.email }}
          </v-btn>
          <v-btn v-if="admin" outlined small>
            Author Enneagram: {{ u.enneagramId }}
          </v-btn>
          <v-btn v-if="admin" outlined small>
            DateCreated: {{ getTime(u.dateCreated) }}
          </v-btn>
          <v-btn v-if="admin" outlined small>
            Role: {{ u.role }}
          </v-btn>
          <v-btn
            v-if="admin && u.email !== u.email"
            outlined
            small
            color="red"
            @click="deleteUser(u)"
          >
            <v-icon>delete</v-icon>
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

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
      lastDate: null
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
      return this.$auth.user
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
      this.$store.dispatch('getPaginatedUsers', this.lastDate)
    } else {
      const users = this.$store.getters.getAllUsers
      this.parseUsers(users)
    }
  },
  methods: {
    async loadMoreUsers () {
      this.usersLoading = true
      await this.$store.dispatch('getPaginatedUsers', this.lastDate)
      this.usersLoading = false
    },
    parseUsers (users) {
      this.allUsers = [...users]
      this.lastDate = users[users.length - 1].dateCreated
    },
    getTime (time) {
      return msToTime(time)
    },
    async deleteUser (user) {
      const resp = await this.$axios.post(`${endpoints.change}`, {
        type: 'user',
        tag: user.id
      })
      if (resp && resp.data) {
        this.allUsers = this.allUsers.filter(q => q.id !== user.id)
      }
    }
  }
}
</script>

<style>
</style>
