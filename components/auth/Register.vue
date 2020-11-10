<template>
  <div>
    <h1>Register</h1>
    <form>
      <v-text-field
        v-model="emailAddress"
        label="E-mail"
        :error-messages="emailErrors"
        required
        @input="$v.emailAddress.$touch()"
        @blur="$v.emailAddress.$touch()"
      />
      <v-text-field
        v-model="password"
        label="Enter your password"
        hint="At least 8 characters"
        min="8"
        required
        :error-messages="passwordErrors"
      />
      <v-btn @click="register">
        Register
      </v-btn>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { validationMixin } from 'vuelidate'
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength } from 'vuelidate/lib/validators'
// vuelidate/validators'
import { endpoints } from '~/models/endpoints'

export default defineComponent({
  setup () {
    const emailAddress = ref('')
    const rules = {
      emailAddress: { required, email },
      password: { required, minLength }
    }

    const $v = useVuelidate(rules, { name, emailAddress })

    return { name, emailAddress, $v }
  },

  name: 'Register',
  mixins: [validationMixin],
  data: () => ({
    email: '',
    password: ''
  }),

  computed: {
    emailErrors () {
      const errors: string[] = []
      if (this.$v.email) {
        if (!this.$v.email.$dirty) {
          return errors
        }
        !this.$v.emailAddress.email && errors.push('Must be valid e-mail')
        !this.$v.emailAddress.required && errors.push('E-mail is required')
      }
      return errors
    },
    passwordErrors () {
      const errors: string[] = []
      if (this.$v.password) {
        if (!this.$v.password.$dirty) {
          return errors
        }
        !this.$v.password.required && errors.push('password is required.')
      }
      return errors
    }
  },
  methods: {
    async register () {
      console.log('register')
      if (this.$v) {
        // this.$v.$touch()
        const data = {
          email: this.emailAddress,
          password: this.password
        }
        try {
          const resp = await this.$axios.post(endpoints.registerRoute, data) // api.register(data)
          if (resp) {
            // this.$router.push({
            //   path: '/auth'
            // })
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
