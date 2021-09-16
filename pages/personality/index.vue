<template>
  <div>
    <h3>Select a Wall</h3>
  </div>
</template>

<script>
export default {
  name: 'Personality',
  data: () => ({
    enneagramTypes: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    enneagramType: null
  }),
  watch: {
  },
  head () {
    return {
      title: 'Wall Selection',
      meta: [
        {
          hid: 'wall selection description',
          name: 'description',
          content:
          'Select which enneagram type wall/ page you want to go to'
        }
      ],
      link: [
        { rel: 'canonical', href: 'https://9takes.com/personality' }
      ]
    }
  }

}
</script>

<style></style>
