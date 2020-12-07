<template>
  <div>
    <h1>Login</h1>
    <form>
      <v-text-field
        v-model="email"
        label="E-mail"
        :error-messages="emailErrors"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      />
      <v-text-field
        v-model="password"
        label="Enter your password"
        hint="At least 8 characters"
        min="8"
        required
        :error-messages="passwordErrors"
      />
      <v-btn @click="goLogin">
        login
      </v-btn>
      <v-btn @click="clear">
        clear
      </v-btn>
    </form>
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required, minLength }
  },
  data: () => ({
    email: '',
    password: '',
    login: true,
    selected: 0
  }),

  computed: {
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) {
        return errors
      }
      !this.$v.password.required && errors.push('password is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) {
        return errors
      }
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    }
  },
  methods: {
    goLogin () {
      this.$v.$touch()
      const data = {
        email: this.email,
        password: this.password
      }
      try {
        this.$store.dispatch('login', data).then((resp) => {
          if (resp) {
            this.$router.push({
              path: '/profile'
            })
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    clear () {
      this.$v.$reset()
      this.password = ''
      this.email = ''
    },
    forgotPassword () {
      this.$router.push({
        path: '/auth'
      })
    },
    change (val) {
      this.login = val
    }
  }
}
</script>
