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
        <v-btn depressed> Login </v-btn>
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

    <div class="col-center">
      <v-card class="margin-top">
        <v-container>
          <v-form ref="loginForm" class="form-width">
            <v-text-field
              v-model="emailAddress"
              type="email"
              label="E-mail"
              :rules="emailRules"
              autocomplete="email"
              required
            />
            <v-text-field
              id="password"
              ref="password"
              v-model="password"
              label="Enter your password"
              hint="At least 8 characters"
              :type="passwordType"
              autocomplete="current-password"
              min="8"
              required
              :rules="passwordRules"
            >
              <template v-slot:append>
                <v-btn
                  icon
                  @click="
                    passwordType === 'password'
                      ? (passwordType = 'text')
                      : (passwordType = 'password')
                  "
                >
                  <v-icon color="secondary">
                    {{
                      passwordType === 'password'
                        ? 'mdi-eye-outline'
                        : 'mdi-eye-off-outline'
                    }}
                  </v-icon>
                </v-btn>
                <template />
              </template>
            </v-text-field>

            <v-btn autofocus color="secondary" @click="goLogin"> login </v-btn>
            <v-btn @click="clear"> clear </v-btn>
          </v-form>
        </v-container>
      </v-card>
    </div>
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
    passwordType: 'password',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail not valid',
    ],
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) => (v && v.length >= 8) || 'Password not Valid',
    ],
  }),

  methods: {
    goLogin() {
      if (this.$refs.loginForm.validate()) {
        const data = {
          email: this.emailAddress,
          password: this.password,
        }

        this.$store.dispatch('login', data).then((resp) => {
          if (resp) {
            this.$router.push({
              path: '/questions',
            })
          }
        })

        // const response = await this.$auth.loginWith('refresh', { data })
        // console.log(response)
        // this.$store.commit('setUser', response.data.user)

        // // this.$store.dispatch('login', data).then((resp) => {
        // if (response) {
        //   this.$9tcookie.set('9tcookie', response.data.refreshToken, {
        //     path: '/',
        //     maxAge: 100 * 60 * 60 * 24 * 7
        //   })
        //   this.$router.push({
        //     path: '/questions'
        //   })
        // }
        // })
      }
    },
    clear() {
      this.$refs.loginForm.reset()
    },
  },
}
</script>
<style scoped>
.center {
  margin: auto;
  padding: 5px;
}
</style>
