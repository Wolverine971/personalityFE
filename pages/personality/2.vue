<template>
  <div>
    <h1 class="brick-background">
      &nbsp;&nbsp;2 Wall
    </h1>
    <h3 class="primary_v--text">
      the "helper", the "servant", and the "host/hostess"
    </h3>
    <personality :type="2" />
  </div>
</template>

<script>
export default {
  name: '2',
  components: { Personality: () => import('../../components/personality') },
  middleware: ['accessToken'],

  head () {
    return {
      title: 'Type 2 Wall',
      meta: [
        {
          hid: '2description',
          name: 'description',
          content:
            'The community for the enneagram type two aka the helper, the servant, or the Host/Hostess can post here.'
        }
      ],
      link: [
        { rel: 'canonical', href: 'https://9takes.com/personality/2' }
      ]
    }
  }
}
</script>

<style></style>
