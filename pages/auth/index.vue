<template>
  <div class="col-center">
    <v-btn-toggle v-model="selected">
      <v-btn @click="change(true)"> Login </v-btn>
      <v-btn @click="change(false)"> Register </v-btn>
    </v-btn-toggle>
    <br />
    <!-- <div v-if="!login">
      <Register @goToLogin="change(true)" />
    </div>
    <div v-if="login">
      <Login />
      <br>
      <br>
      <v-btn router to="/auth/forgotPassword">
        Forgot Password
      </v-btn>
    </div> -->
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Index',
  components: {
    // Register: () => import('~/components/auth/Register'),
    // Login: () => import('~/components/auth/Login')
  },
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required, minLength },
  },
  data: () => ({
    email: '',
    password: '',
    login: false,
    selected: 0,
  }),

  computed: {
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) {
        return errors
      }
      !this.$v.password.required && errors.push('password is required.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) {
        return errors
      }
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
  },
  methods: {
    goLogin() {
      this.$v.$touch()
      const data = {
        email: this.email,
        password: this.password,
      }
      try {
        this.$store.dispatch('login', data).then((resp) => {
          if (resp) {
            this.$router.push({
              path: '/profile',
            })
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    clear() {
      this.$v.$reset()
      this.password = ''
      this.email = ''
    },

    change(val) {
      this.login = val
    },
  },
}
</script>
