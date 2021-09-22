<template>
  <div>
    <h1 class="primary_v--text">
      Admin
    </h1>
    <v-tabs v-if="!$vuetify.breakpoint.mobile" v-model="tab">
      <v-tab v-for="(item, i) in tabs" :key="i">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-select
      v-else
      v-model="select"
      :items="tabs"
    />
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <all-questions :admin="true" />
      </v-tab-item>
      <v-tab-item>
        <all-comments :admin="true" />
      </v-tab-item>
      <v-tab-item>
        <div>
          Content
        </div>
      </v-tab-item>
      <v-tab-item>
        <all-users :admin="true" />
      </v-tab-item>
      <v-tab-item>
        <create-blog />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  middleware: ['accessToken', 'isAdmin'],
  components: {
    AllQuestions: () => import('../components/questions/allQuestions'),
    AllComments: () => import('../components/questions/allComments'),
    AllUsers: () => import('../components/shared/allUsers'),
    CreateBlog: () => import('../components/blog/createBlog.vue')
  },
  data: () => ({
    tab: 'Questions',
    select: 'Questions',
    tabs: [
      'Questions',
      'Comments',
      'Content',
      'Users',
      'Create Blog'
    ]
  }),
  watch: {
    select (val) {
      this.tab = this.tabs.indexOf(val)
    }
  },
  head () {
    return {
      title: 'Admin Panel',
      script: [
        {
          src: 'https://cdnjs.deepai.org/deepai.min.js',
          async: true,
          defer: true
        }
      ]
    }
  }

}
</script>

<style>

</style>
