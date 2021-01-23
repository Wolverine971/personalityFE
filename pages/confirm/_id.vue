<template>
  <div>
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
        Feel free to
        <NuxtLink :to="{path: '/auth', query: {}}">
          login
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { endpoints } from '~/models/endpoints'

export default defineComponent({

  name: 'Confirm',
  data: () => ({
    confirmationSuccess: false
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
      })
      .catch((error) => {
        this.$store.dispatch('toastError', error)
        this.confirmationSuccess = false
      })
  }

})
</script>
<style>
</style>
