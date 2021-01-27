<template>
  <div>
    <h1 class="brick-background">
      &nbsp;&nbsp;1 Wall
    </h1>
    <h3>the "reformer", the "idealist", and the "advocate"</h3>
    <personality :type="1" />
  </div>
</template>

<script>
export default {
  name: '1',
  components: { Personality: () => import('../../components/personality') },
  middleware: ['accessToken'],
  head () {
    return {
      title: 'Type 1 Wall',
      meta: [
        {
          hid: '1description',
          name: 'description',
          content:
            'The community for the enneagram type one aka the reformer, the idealist, or the advocate.'
        }
      ]
    }
  }
}
</script>

<style></style>
