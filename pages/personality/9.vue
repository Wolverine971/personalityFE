<template>
  <div>
    <h1 class="brick-background">
      &nbsp;&nbsp;9 Wall
    </h1>
    <h3>the "peacemaker", the "referee", and the "dreamer"</h3>
    <personality :type="9" />
  </div>
</template>

<script>
export default {
  name: '9',
  components: { Personality: () => import('../../components/personality') },
  middleware: ['accessToken'],
  head () {
    return {
      title: 'Type 9 Wall',
      meta: [
        {
          hid: '9description',
          name: 'description',
          content:
            'The community for the enneagram type nine aka the peacemaker, the referee, or the dreamer.'
        }
      ]
    }
  }
}
</script>

<style></style>
