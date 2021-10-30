<template>
  <v-card>
    <v-card-title>
      <h1 class="primary_v--text">
        Profile Page
      </h1>
    </v-card-title>
    <v-form v-if="user">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="user.firstName"
              v-model.trim="user.firstName"
              label="First Name"
              @input="formDisabled = false"
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="user.lastName"
              v-model.trim="user.lastName"
              label="Last Name"
              @input="formDisabled = false"
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="user.email"
              v-model.trim="user.email"
              label="Email"
              @input="formDisabled = false"
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="user.enneagramId"
              :items="enneagramTypes"
              label="Enneagram"
              @change="formDisabled = false"
            />
          </v-col>
        </v-row>
        <v-btn outlined :disabled="formDisabled" @click="submit">
          Submit
        </v-btn>
      </v-container>
    </v-form>

    <v-spacer />
    <dashboard />
    <theme-changer />
  </v-card>
</template>
<script>
import { endpoints } from '../models/endpoints'
export default {
  name: 'Profile',
  components: {
    Dashboard: () => import('~/components/dashboard'),
    ThemeChanger: () => import('~/components/shared/themeChanger.vue')
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

        email: this.staticUser.email ? this.staticUser.email : this.user.email,

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

<style></style>
