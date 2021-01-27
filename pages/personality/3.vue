<template>
  <div>
    <h1 class="brick-background">
      &nbsp;&nbsp;3 Wall
    </h1>
    <h3>the "achiever", the "charmer", and the "professional"</h3>
    <personality :type="3" />
  </div>
</template>

<script>
export default {
  name: '3',
  components: { Personality: () => import('../../components/personality') },
  middleware: ['accessToken'],
  head () {
    return {
      title: 'Type 3 Wall',
      meta: [
        {
          hid: '3description',
          name: 'description',
          content:
            'The community for the enneagram type three aka the achiever, the charmer, or the professional.'
        }
      ]
    }
  }
}
</script>

<style></style>
