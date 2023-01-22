<template>
  <div>
    <h1>Sign Ups</h1>
    <div>
      <h2>Count: {{ count }}</h2>
      <v-expansion-panels>
        <v-expansion-panel v-for="(signup, i) in signups" :key="i">
          <v-expansion-panel-header>
            {{ signup.email }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-btn outlined small>
              Created At: {{ getTime(signup.dateCreated) }}
            </v-btn>
            <v-btn outlined small> id: {{ signup.id }} </v-btn>
            <v-btn v-if="admin" outlined small>
              DateCreated: {{ getTime(comment.dateCreated) }}
            </v-btn>

            <v-btn
              v-if="admin"
              outlined
              small
              color="red"
              @click="deleteEmailById(email)"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
import { msToDate } from '~/utils'
import { endpoints } from '~/models/endpoints'
export default {
  name: 'signups',
  data: () => {
    return {
      signups: [],
      count: [],
    }
  },
  async mounted() {
    await this.getSignups()
  },

  methods: {
    async getSignups() {
      const resp = await this.$axios.get(`${endpoints.getSignups}`)
      this.signups = resp.data.emails
      this.count = resp.data.count
    },
    async deleteEmailById(email) {
      console.log(email)
    },
    getTime(time) {
      return msToDate(time)
    },
  },
}
</script>

<style></style>
