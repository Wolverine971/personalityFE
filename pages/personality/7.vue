<template>
  <div>
    <h1 class="brick-background">
      &nbsp;&nbsp;7 Wall
    </h1>
    <h3>the "enthusiast", the "entertainer", and the "realist"</h3>
    <personality :type="7" />
  </div>
</template>

<script>
export default {
  name: '7',
  components: { Personality: () => import('../../components/personality') },
  middleware: ['accessToken'],
  head () {
    return {
      title: 'Type 7 Wall',
      meta: [
        {
          hid: '7description',
          name: 'description',
          content:
            'The community for the enneagram type seven aka the enthusiast, the entertainer, or the realist.'
        }
      ]
    }
  }
}
</script>

<style></style>
