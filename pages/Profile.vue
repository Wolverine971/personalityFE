<template>
  <div>
    <h1>Profile Page</h1>
    <div v-if="$auth.user">
      <v-form>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="$auth.user.firstName"
              v-model.trim="$auth.user.firstName"
              label="First Name"
              @input="formDisabled = false"
            />
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="$auth.user.lastName"
              v-model.trim="$auth.user.lastName"
              label="Last Name"
              @input="formDisabled = false"
            />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="$auth.user.email"
              v-model.trim="$auth.user.email"
              label="Email"
              @input="formDisabled = false"
            />
          </v-col>
          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              v-model="$auth.user.enneagramId"
              :items="enneagramTypes"
              label="Enneagram"
              @change="formDisabled = false"
            />
          </v-col>
          <!-- <v-col class="d-flex" cols="12" sm="6">
            <v-select
              v-model="$auth.user.mbtiId"
              :items="MBTITypes"
              item-text="type"
              label="MBTI"
              @change="formDisabled = false"
            />
          </v-col> -->
        </v-row>
        <v-btn :disabled="formDisabled" @click="submit">
          Submit
        </v-btn>
      </v-form>
    </div>
  </div>
</template>
<script>
import { endpoints } from '../models/endpoints'
export default {
  name: 'Profile',
  data: () => ({
    index: null,
    staticUser: {},
    enneagramTypes: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    formDisabled: true
  }),
  middleware: 'authenticated',

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
