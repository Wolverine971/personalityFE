<template>
  <div>
    <div v-if="validLink" class="col-center">
      <h1>Reset Password</h1>
      <v-form ref="registerForm" class="form-width">
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          hint="At least 8 characters"
          min="8"
          required
          :rules="passwordRules"
        />
        <v-btn @click="reset">
          Reset
        </v-btn>
      </v-form>
    </div>
    <div v-else class="col-center">
      <h1>Link is invalid</h1>
      <p>
        Forgot password links expire after 24 hours
      </p>
      <p>
        If your link isn’t working for any reason,
        you can <NuxtLink to="/auth/forgotPassword">
          request a new one
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
import { endpoints } from '~/models/endpoints'

export default defineComponent({
  name: 'Reset',
  mixins: [validationMixin],
  validations: {
    password: { required, minLength: minLength(8) }
  },
  data: () => ({
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 8) || 'Password must be at least 8 characters'
    ],
    validLink: true
  }),
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  mounted () {
    this.$axios
      .get(`${endpoints.resetRoute}/${this.$route.params.id}`)
      .then((resp) => {
        if (resp && resp.data) {
          this.validLink = true
        } else {
          this.validLink = false
        }
      })
      .catch((error) => {
        this.$store.dispatch('toastError', error)
        this.validLink = false
      })
  },

  methods: {
    async reset () {
      if (this.$refs.registerForm.validate()) {
        const data = {
          password: this.password
        }
        try {
          const resp = await this.$axios.post(`${endpoints.resetPassword}/${this.id}`, data)
          if (resp) {
            this.$router.push({ path: '/auth' })
            this.$store.dispatch('toastSuccess', 'Password Reset Success')
          }
        } catch (error) {
          console.log(error)
          this.$store.dispatch('toastError', error)
        }
      }
    }
  }

})
</script>
<style></style>
