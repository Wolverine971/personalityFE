<template>
  <div>
    <h1 class="brick-background">
      &nbsp;&nbsp;5 Wall
    </h1>
    <h3>the "investigator", the "iconoclast", and the "problem solver"</h3>
    <personality :type="5" />
  </div>
</template>

<script>
export default {
  name: '5',
  components: { Personality: () => import('../../components/personality') },
  middleware: ['accessToken'],
  head () {
    return {
      title: 'Type 5 Wall',
      meta: [
        {
          hid: '5description',
          name: 'description',
          content:
            'The community for the enneagram type five aka the investigator, the iconoclast, or the problem solver.'
        }
      ],
      link: [
        { rel: 'canonical', href: 'https://9takes.com/personality/5' }
      ]
    }
  }
}
</script>

<style></style>
