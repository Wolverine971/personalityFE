<template>
  <div>
    <div class="row space-between">
      <!-- <v-btn outlined to="/questions">
        <v-icon>
          keyboard_arrow_left
        </v-icon>
        Questions
      </v-btn> -->
      <!-- <v-btn outlined to="/personality">
        Walls
        <v-icon>
          keyboard_arrow_right
        </v-icon>
      </v-btn> -->
    </div>
    <h1 class="primary_v--text">
      Profile Page
    </h1>
    <div v-if="user">
      <v-form>
        <div class="row space-between">
          <div class="m-col text-min-width">
            <v-text-field
              v-model="user.firstName"
              v-model.trim="user.firstName"
              label="First Name"
              @input="formDisabled = false"
            />
          </div>

          <div class="m-col text-min-width">
            <v-text-field
              v-model="user.lastName"
              v-model.trim="user.lastName"
              label="Last Name"
              @input="formDisabled = false"
            />
          </div>
          <div class="m-col text-min-width">
            <v-text-field
              v-model="user.email"
              v-model.trim="user.email"
              label="Email"
              @input="formDisabled = false"
            />
          </div>
          <div class="m-col text-min-width">
            <v-select
              v-model="user.enneagramId"
              :items="enneagramTypes"
              label="Enneagram"
              @change="formDisabled = false"
            />
          </div>
        </div>
        <v-btn outlined :disabled="formDisabled" @click="submit">
          Submit
        </v-btn>
      </v-form>
    </div>
    <br>
    <hr>
    <br>
    <dashboard />
  </div>
</template>
<script>
import { endpoints } from '../models/endpoints'
export default {
  name: 'Profile',
  components: {
    Dashboard: () => import('../components/dashboard')
  },
  data: () => ({
    index: null,
    staticUser: {},
    enneagramTypes: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    formDisabled: true
  }),
  middleware: ['loggedIn', 'accessToken'],
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },

  methods: {
    submit () {
      this.formDisabled = false
      const data = {
        firstName: this.staticUser.firstName
          ? this.staticUser.firstName
          : this.user.firstName,
        lastName: this.staticUser.lastName
          ? this.staticUser.lastName
          : this.user.lastName,

        email: this.staticUser.email
          ? this.staticUser.email
          : this.user.email,

        enneagramId: this.staticUser.enneagramId
          ? this.staticUser.enneagramId
          : this.user.enneagramId

      }

      this.$axios.put(endpoints.updateUserRoute, data)
      this.$store.dispatch('toastSuccess', 'Updated Profile')
    }
  }
}
</script>

<style scoped></style>
