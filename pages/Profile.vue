<template>
  <div>
    <div class="row space-between">
      <v-btn outlined to="/questions">
        <v-icon>
          keyboard_arrow_left
        </v-icon>
        Questions
      </v-btn>
      <v-btn outlined to="/personality">
        Walls
        <v-icon>
          keyboard_arrow_right
        </v-icon>
      </v-btn>
    </div>
    <h1>Profile Page</h1>
    <div v-if="$auth.user">
      <v-form>
        <div class="row space-between">
          <div class="m-col text-min-width">
            <v-text-field
              v-model="$auth.user.firstName"
              v-model.trim="$auth.user.firstName"
              label="First Name"
              @input="formDisabled = false"
            />
          </div>

          <div class="m-col text-min-width">
            <v-text-field
              v-model="$auth.user.lastName"
              v-model.trim="$auth.user.lastName"
              label="Last Name"
              @input="formDisabled = false"
            />
          </div>
          <div class="m-col text-min-width">
            <v-text-field
              v-model="$auth.user.email"
              v-model.trim="$auth.user.email"
              label="Email"
              @input="formDisabled = false"
            />
          </div>
          <div class="m-col text-min-width">
            <v-select
              v-model="$auth.user.enneagramId"
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
import Dashboard from '../components/dashboard'
export default {
  name: 'Profile',
  components: { Dashboard },
  data: () => ({
    index: null,
    staticUser: {},
    enneagramTypes: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    formDisabled: true
  }),
  middleware: ['loggedIn', 'accessToken'], //, 'accessToken'

  methods: {
    submit () {
      this.formDisabled = false
      const data = {
        firstName: this.staticUser.firstName
          ? this.staticUser.firstName
          : this.$auth.user.firstName,
        lastName: this.staticUser.lastName
          ? this.staticUser.lastName
          : this.$auth.user.lastName,

        email: this.staticUser.email
          ? this.staticUser.email
          : this.$auth.user.email,

        enneagramId: this.staticUser.enneagramId
          ? this.staticUser.enneagramId
          : this.$auth.user.enneagramId

      }

      this.$axios.put(endpoints.updateUserRoute, data)
      this.$store.dispatch('toastSuccess', 'Updated Profile')
    }
  }
}
</script>

<style scoped></style>
