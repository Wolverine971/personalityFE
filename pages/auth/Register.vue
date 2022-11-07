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
        <v-btn depressed> Register </v-btn>
      </NuxtLink>
    </v-btn-toggle>
    <div class="col-center">
      <v-card class="margin-top">
        <v-container v-if="!registerSuccess">
          <v-form ref="registerForm" class="form-width">
            <v-text-field
              v-model="emailAddress"
              autofocus
              type="email"
              label="E-mail"
              :rules="emailRules"
              autocomplete="email"
              required
            />
            <v-text-field
              v-model="password"
              label="Password"
              :type="passwordType"
              hint="At least 8 characters"
              min="8"
              required
              autocomplete="new-password"
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
            <div class="wrap-on-small">
              <v-select
                v-model="enneagramType"
                :items="enneagramTypes"
                label="Enneagram Type"
                :rules="enneagramRules"
                required
              />
              <v-spacer />
              <!-- <div class="margin-all">Or</div>
              <v-spacer /> -->
              <!-- </div> -->
              <div style="margin: 20px 0 20px 10px">
                <enneagram-instructions
                  class="btn-center"
                  @typeSelected="typeChosen"
                />
              </div>
            </div>
            <v-btn class="margin-top" color="secondary" @click="register">
              Register
            </v-btn>
          </v-form>
        </v-container>
        <div v-else class="col-center">
          <h1 class="primary_v--text">Register Success</h1>
          <p>Confirm your email address {{ emailAddress }}</p>
          <p>
            Please confirm your email address then
            <v-btn
              color="secondary"
              router
              :to="{ path: '/auth/login', query: {} }"
            >
              login
            </v-btn>
          </p>
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { email, required, minLength } from 'vuelidate/lib/validators'
import { endpoints } from '~/models/endpoints'

export default {
  name: 'Register',
  components: {
    EnneagramInstructions: () =>
      import('@/components/shared/enneagramInstructions'),
  },
  mixins: [validationMixin],
  validations: {
    emailAddress: { required, email },
    password: { required, minLength: minLength(8) },
    enneagramType: { required },
  },
  data: () => ({
    emailAddress: '',
    password: '',
    enneagramType: null,
    enneagramTypes: [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'Unknown',
      'Rando',
    ],
    registerSuccess: false,
    passwordType: 'password',

    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) => (v && v.length >= 8) || 'Password must be at least 8 characters',
    ],
    enneagramRules: [(v) => !!v || 'Enneagram Type is required'],
  }),

  methods: {
    async register() {
      if (this.$refs.registerForm.validate()) {
        const data = {
          email: this.emailAddress,
          password: this.password,
          enneagramType: this.enneagramType,
        }
        try {
          const resp = await this.$axios.post(endpoints.registerRoute, data)
          if (resp && resp.data) {
            this.registerSuccess = true
            this.$emit('goToLogin', true)
          } else {
            let message = 'Failed to register'
            if (resp && resp.response && resp.response.data) {
              message = resp.response.data
            }
            this.registerSuccess = false
            this.$store.dispatch('toastError', message)
          }
        } catch (e) {
          this.registerSuccess = false
          this.$store.dispatch('toastError', e)
        }
      }
    },
    typeChosen(e) {
      console.log(e)
      this.enneagramType = e
    },
  },
}
</script>
<style>
.wrap-on-small {
  display: flex;
}
@media only screen and (max-width: 600px) {
  .wrap-on-small {
    display: block;
  }
}
.btn-center {
  margin-left: 30px;
  margin-top: 10px;
}
.margin-all {
  margin: 20px 0;
}
</style>
