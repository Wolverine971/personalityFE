<template>
  <div>
    <div v-if="!registerSuccess" class="col-center">
      <v-form
        ref="registerForm"
        class="form-width"
      >
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
          <template
            v-slot:append
          >
            <v-btn icon @click="passwordType === 'password' ? passwordType = 'text' : passwordType = 'password'">
              <v-icon>
                {{ passwordType === 'password' ? 'mdi-eye-outline' : 'mdi-eye-off-outline' }}
              </v-icon>
            </v-btn>
            <template />
          </template>
        </v-text-field>
        <div class="wrap-on-small">
          <v-select
            v-model="enneagramType"
            :items="enneagramTypes"
            label="What is your Enneagram Type?"
            :rules="enneagramRules"
            required
          />
          <div class="row align-center margin">
            Or
          </div>
          <div class="row align-center">
            <enneagram-instructions class="btn-center" @typeSelected="typeChosen" />
          </div>
        </div>
        <v-btn
          class="margin-top"
          outlined
          @click="register"
        >
          Register
        </v-btn>
      </v-form>
    </div>
    <div v-else class="col-center">
      <h1 class="primary_v--text">
        Register Success
      </h1>
      <p>
        Confirm your email address {{ emailAddress }}
      </p>
      <p>
        Please confirm your email address then
        <NuxtLink :to="{path: '/auth', query: {}}">
          login
        </NuxtLink>
      </p>
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
    EnneagramInstructions: () => import('../shared/enneagramInstructions')
  },
  mixins: [validationMixin],
  validations: {
    emailAddress: { required, email },
    password: { required, minLength: minLength(8) },
    enneagramType: { required }
  },
  data: () => ({
    emailAddress: '',
    password: '',
    enneagramType: null,
    enneagramTypes: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    registerSuccess: false,
    passwordType: 'password',

    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 8) || 'Password must be at least 8 characters'
    ],
    enneagramRules: [
      v => !!v || 'Enneagram Type is required'
    ]
  }),

  methods: {
    async register () {
      if (this.$refs.registerForm.validate()) {
        const data = {
          email: this.emailAddress,
          password: this.password,
          enneagramType: this.enneagramType
        }
        try {
          const resp = await this.$axios.post(endpoints.registerRoute, data)
          if (resp && resp.data) {
            this.registerSuccess = true
            // this.$emit('goToLogin', true)
          } else {
            let message = 'Failed to register'
            if (resp && resp.response && resp.response.data) {
              message = resp.response.data
            }
            this.registerSuccess = false
            this.$store.dispatch('toastError', message)
          }
        } catch (error) {
          this.registerSuccess = false
          this.$store.dispatch('toastError', error)
        }
      }
    },
    typeChosen (e) {
      console.log(e)
      this.enneagramType = e
    }
  }

}
</script>
<style>
.wrap-on-small {
    display: flex;
  }
@media only screen and (max-width: 500px) {
  .wrap-on-small {
    display: block;
  }
}
.btn-center {
  margin-left: 30px;
  margin-top: 10px;
}
.align-center {
  align-items: center;
}
.margin {
  margin: 20px;
}
</style>
