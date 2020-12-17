<template>
  <div>
    <h1>Forgot Password</h1>
    <form>
      <v-text-field
        v-model="email"
        label="Enter your email"
        required
        :error-messages="emailErrors"
      />
      <v-btn @click="sendLink">
        Send Link
      </v-btn>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { endpoints } from '~/models/endpoints'
export default defineComponent({
  name: 'ForgotPassword',
  mixins: [validationMixin],
  validations: {
    email: { required, email }
  },
  data: () => ({
    email: ''
  }),
  computed: {
    emailErrors () {
      const errors: string[] = []
      if (!this.$v.email.$dirty) {
        return errors
      }
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    }
  },
  methods: {
    async sendLink () {
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
})
</script>

<style></style>
