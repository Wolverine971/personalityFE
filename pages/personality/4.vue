<template>
  <div>
    <h1 class="brick-background">
      &nbsp;&nbsp;4 Wall
    </h1>
    <h3>the "individualist", "the aristocrat", and the "bohemian"</h3>
    <personality :type="4" />
  </div>
</template>

<script>
export default {
  name: '4',
  components: { Personality: () => import('../../components/personality') },
  middleware: ['accessToken'],
  head () {
    return {
      title: 'Type 4 Wall',
      meta: [
        {
          hid: '4description',
          name: 'description',
          content:
            'The community for the enneagram type four aka the individualist, the aristocrat, or the bohemian.'
        }
      ]
    }
  }
}
</script>

<style></style>
