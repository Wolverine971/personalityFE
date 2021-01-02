<template>
  <div class="col-center">
    <h1>Forgot Password</h1>
    <v-form
      ref="forgotForm"
      class="form-width"
    >
      <v-text-field
        v-model="emailAddress"
        label="Enter your email"
        :rules="emailRules"
        required
      />
      <v-btn @click="sendLink">
        Send Link
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { endpoints } from '~/models/endpoints'
export default defineComponent({
  name: 'ForgotPassword',

  data: () => ({
    emailAddress: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ]
  }),

  methods: {
    async sendLink () {
      if (this.$refs.forgotForm.validate()) {
        try {
          const data = {
            email: this.email
          }
          const resp = await this.$axios.post(endpoints.forgotPasswordRoute, data)
          if (resp) {
            this.$emit('goToLogin', true)
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
})
</script>

<style></style>
