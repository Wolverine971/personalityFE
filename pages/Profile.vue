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
          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              v-model="$auth.user.mbtiId"
              :items="MBTITypes"
              item-text="type"
              label="MBTI"
              @change="formDisabled = false"
            />
          </v-col>
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
    enneagramTypes: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    MBTITypes: [
      { type: 'ISTJ', name: ' The Inspector' },
      { type: 'ISTP', name: ' The Crafter' },
      { type: 'ISFJ', name: ' The Protector' },
      { type: 'ISFP', name: ' The Artist' },
      { type: 'INFJ', name: ' The Advocate' },
      { type: 'INFP', name: ' The Mediator' },
      { type: 'INTJ', name: ' The Architect' },
      { type: 'INTP', name: ' The Thinker' },
      { type: 'ESTP', name: ' The Persuader' },
      { type: 'ESTJ', name: ' The Director' },
      { type: 'ESFP', name: ' The Performer' },
      { type: 'ESFJ', name: ' The Caregiver' },
      { type: 'ENFP', name: ' The Champion' },
      { type: 'ENFJ', name: ' The Giver' },
      { type: 'ENTP', name: ' The Debater' },
      { type: 'ENTJ', name: ' The Commander' }
    ],
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
          : this.$auth.user.enneagramId,

        mbtiId: this.staticUser.mbtiId
          ? this.staticUser.mbtiId
          : this.$auth.user.mbtiId
      }

      this.$axios.put(endpoints.updateUserRoute, data)
      this.$store.dispatch('toastSuccess', 'Updated Profile')
    }
  }
}
</script>

<style scoped></style>
