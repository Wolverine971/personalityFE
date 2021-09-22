<template>
  <div>
    <h1 class="brick-background">
      &nbsp;&nbsp;6 Wall
    </h1>
    <h3 class="primary_v--text">
      the "loyalist", the "defender", and the "buddy"
    </h3>
    <personality :type="6" />
  </div>
</template>

<script>
export default {
  name: '6',
  components: { Personality: () => import('../../components/personality') },
  middleware: ['accessToken'],
  head () {
    return {
      title: 'Type 6 Wall',
      meta: [
        {
          hid: '6description',
          name: 'description',
          content:
            'The community for the enneagram type six aka the loyalist, the defender, or the buddy.'
        }
      ],
      link: [
        { rel: 'canonical', href: 'https://9takes.com/personality/6' }
      ]
    }
  }
}
</script>

<style></style>
