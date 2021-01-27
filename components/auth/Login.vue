<template>
  <div class="col-center">
    <v-form
      ref="loginForm"
      class="form-width"
    >
      <v-text-field
        v-model="emailAddress"
        label="E-mail"
        :rules="emailRules"
        required
      />
      <v-text-field
        v-model="password"
        label="Enter your password"
        hint="At least 8 characters"
        type="password"
        min="8"
        required
        :rules="passwordRules"
      />

      <v-btn outlined @click="goLogin">
        login
      </v-btn>
      <v-btn outlined @click="clear">
        clear
      </v-btn>
    </v-form>
  </div>
</template>
<script>

export default {
  name: 'Login',

  data: () => ({
    emailAddress: '',
    password: '',
    login: true,
    selected: 0,
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail not valid'
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 8) || 'Password not Valid'
    ]
  }),

  methods: {
    goLogin () {
      if (this.$refs.loginForm.validate()) {
        const data = {
          email: this.emailAddress,
          password: this.password
        }
        this.$store.dispatch('login', data).then((resp) => {
          if (resp) {
            this.$router.push({
              path: '/profile'
            })
          }
        })
      }
    },
    clear () {
      this.$refs.loginForm.reset()
    }
  }
}
</script>
