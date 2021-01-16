<template>
  <div>
    <v-btn
      class="ma-2"
      outlined
      :to="{path: '/auth', query: {}}"
      router
    >
      <v-icon> keyboard_backspace</v-icon>
      Login/ Register
    </v-btn>
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
            email: this.emailAddress
          }
          const resp = await this.$axios.post(endpoints.forgotPasswordRoute, data)
          if (resp) {
            this.$router.push({ path: '/auth' })
            this.$store.dispatch('toastSuccess', 'Reset Password Link Sent')
          } else {
            this.$store.dispatch('toastError', 'Cannot reset password')
          }
        } catch (error) {
          console.log(error)
          this.$store.dispatch('toastError', 'Cannot reset password')
        }
      }
    }
  }
})
</script>

<style></style>
