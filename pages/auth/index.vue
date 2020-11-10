<template>
  <div>
    <v-row>
      <v-btn-toggle v-model="selected">
        <v-btn @click="change(true)">
          Login
        </v-btn>
        <v-btn @click="change(false)">
          Register
        </v-btn>
      </v-btn-toggle>
    </v-row>
    <div v-if="!login">
      <Register @goToLogin="change(true)" />
    </div>
    <div v-if="login">
      <div v-if="forgotPassword">
        <forgot-password @goToLogin="change(true)" />
      </div>
      <div v-else>
        <Login />
        <br>
        <br>
        <a @click="forgotPassword = true">
          Forgot Password
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'
import Register from '../../components/auth/Register'
import Login from '../../components/auth/Login'
import ForgotPassword from '../../components/auth/ForgotPassword'

export default {
  name: 'Index',
  components: { Register, Login, ForgotPassword },
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required, minLength }
  },
  data: () => ({
    email: '',
    password: '',
    login: true,
    selected: 0,
    forgotPassword: false
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

    change (val) {
      console.log(val)
      this.login = val
      if (this.login) {
        this.forgotPassword = false
      }
    }
  }
}
</script>
