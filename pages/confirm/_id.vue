<template>
  <div v-if="!loading">
    <div v-if="!confirmationSuccess" class="col-center">
      <h1>Not Confirmed</h1>
      <p>
        Bad link, try to
        <NuxtLink :to="{path: '/auth', query: {}}">
          re-register
        </NuxtLink>
      </p>
    </div>
    <div v-else class="col-center">
      <h1>Confirmation Success</h1>
      <p>
        You may now
        <NuxtLink :to="{path: '/auth', query: {}}">
          login
        </NuxtLink>
      </p>
    </div>
  </div>
  <div v-else>
    <v-progress-circular indeterminate color="fpink" />
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { endpoints } from '~/models/endpoints'

export default defineComponent({

  name: 'Confirm',
  data: () => ({
    confirmationSuccess: false,
    loading: true
  }),
  mounted () {
    this.$axios
      .get(`${endpoints.confirmRoute}/${this.$route.params.id}`)
      .then((resp) => {
        if (resp && resp.data) {
          this.confirmationSuccess = true
        } else {
          this.confirmationSuccess = false
        }
        this.loading = false
      })
      .catch((error) => {
        this.$store.dispatch('toastError', error)
        this.confirmationSuccess = false
        this.loading = false
      })
  }

})
</script>
<style>
</style>
