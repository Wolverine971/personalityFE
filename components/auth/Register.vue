<template>
  <div>
    <div v-if="!registerSuccess" class="col-center">
      <v-form
        ref="registerForm"
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
          label="Password"
          type="password"
          hint="At least 8 characters"
          min="8"
          required
          :rules="passwordRules"
        />
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
      <h1>Register Success</h1>
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
import { defineComponent } from '@nuxtjs/composition-api'
import { validationMixin } from 'vuelidate'
import { email, required, minLength } from 'vuelidate/lib/validators'
import EnneagramInstructions from '../shared/enneagramInstructions'
import { endpoints } from '~/models/endpoints'

export default defineComponent({

  name: 'Register',
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
  components: {
    EnneagramInstructions
  },

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
          console.log(error)
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

})
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
