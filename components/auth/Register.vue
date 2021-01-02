<template>
  <div class="col-center">
    <h1>Register</h1>
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
        <enneagram-instructions class="btn-center" @typeSelected="typeChosen" />
      </div>
      <v-btn
        @click="register"
      >
        Register
      </v-btn>
    </v-form>
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
          if (resp) {
            this.$emit('goToLogin', true)
          }
        } catch (error) {
          console.log(error)
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
@media only screen and (max-width: 380px) {
  .wrap-on-small {
    display: block;
  }
}
.btn-center {
  margin-left: 30px;
  margin-top: 10px;
}
</style>
