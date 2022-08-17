<template>
  <div>
    <div v-if="validLink" class="col-center">
      <h1 class="primary_v--text">
        Reset Password
      </h1>
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
        <v-btn outlined @click="reset">
          Reset
        </v-btn>
      </v-form>
    </div>
    <div v-else class="col-center">
      <h1 class="primary_v--text">
        Link is invalid
      </h1>
      <p>
        Forgot password links expire after 24 hours
      </p>
      <p>
        If your link isn’t working for any reason,
        you can <NuxtLink :to="{path: '/auth/forgotPassword', query: {}}">
          request a new one
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
<script>
import { endpoints } from '~/models/endpoints'

export default {
  name: 'Reset',
  data: () => ({
    validLink: true,
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 8) || 'Password not Valid'
    ]
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
          if (resp && resp.data) {
            this.$router.push({ path: '/auth' })
            this.$store.dispatch('toastSuccess', 'Password Reset Success')
          } else {
            this.$store.dispatch('toastError', 'Password Reset Fail')
          }
        } catch (e) {
          console.log(e)
          this.$store.dispatch('toastError', e)
        }
      }
    }
  }

}
</script>
<style></style>
