<template>
  <div>
    <h1 class="brick-background">
      &nbsp;&nbsp;8 Wall
    </h1>
    <h3>the "challenger", the "maverick", and the "bear"</h3>
    <personality :type="8" />
  </div>
</template>

<script>
export default {
  name: '8',
  components: { Personality: () => import('../../components/personality') },
  middleware: ['accessToken'],
  head () {
    return {
      title: 'Type 8 Wall',
      meta: [
        {
          hid: '8description',
          name: 'description',
          content:
            'The community for the enneagram type eight aka the challenger, the maverick, or the bear.'
        }
      ],
      link: [
        { rel: 'canonical', href: 'https://9takes.com/personality/8' }
      ]
    }
  }
}
</script>

<style></style>
