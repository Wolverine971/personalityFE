<template>
  <div>
    <v-btn class="ma-2 authBtn" :to="{ path: '/auth/login', query: {} }" router>
      <v-icon> keyboard_backspace</v-icon>
      Login/ Register
      <v-icon right dark> mdi-login </v-icon>
    </v-btn>
    <div class="col-center">
      <h1 class="primary_v--text">Forgot Password</h1>
      <v-form ref="forgotForm" class="form-width">
        <v-text-field
          v-model="emailAddress"
          autofocus
          type="email"
          label="Enter your email"
          :rules="emailRules"
          required
        />
        <v-btn outlined @click="sendLink"> Send Link </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import { endpoints } from '~/models/endpoints'
export default {
  name: 'ForgotPassword',
  data: () => ({
    emailAddress: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
  }),

  methods: {
    async sendLink() {
      if (this.$refs.forgotForm.validate()) {
        try {
          const data = {
            email: this.emailAddress,
          }
          const resp = await this.$axios.post(
            endpoints.forgotPasswordRoute,
            data
          )
          if (resp && resp.data) {
            this.$router.push({ path: '/auth/login' })
            this.$store.dispatch('toastSuccess', 'Reset Password Link Sent')
          } else if (resp && resp.response) {
            this.$store.dispatch('toastError', resp.response.data)
          } else {
            this.$store.dispatch('toastError', 'Cannot reset password')
          }
        } catch (e) {
          console.log(e)
          this.$store.dispatch('toastError', 'Cannot reset password')
        }
      }
    },
  },
}
</script>

<style></style>
