<template>
  <div class="col-center">
    <v-btn-toggle>
      <NuxtLink
        :to="{
          path: `/auth/login`,
          query: {},
        }"
        router
        style="text-decoration: none"
      >
        <v-btn> Login </v-btn>
      </NuxtLink>
      <NuxtLink
        :to="{
          path: `/auth/register`,
          query: {},
        }"
        router
        style="text-decoration: none"
      >
        <v-btn> Register </v-btn>
      </NuxtLink>
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
  head() {
    const title = '9takes Authenticion Page'
    const description = 'Authenticion for Enneagram people'
    const href = 'https://9takes.com/auth'

    return {
      titleTemplate: title,
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        {
          property: 'og:url',
          content: href,
        },
        {
          property: 'og:description',
          content: description,
        },
        { property: 'og:title', content: title },
        {
          name: 'twitter:description',
          content: description,
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:site',
          content: '@9takesdotcom',
        },
      ],
      script: [
        {
          src: 'https://cdnjs.deepai.org/deepai.min.js',
          async: true,
          defer: true,
        },
      ],
      link: [{ rel: 'canonical', href }],
    }
  },
}
</script>
