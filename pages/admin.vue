<template>
  <div>
    <h1 class="primary_v--text">Admin</h1>
    <v-btn @click="reindex"> ReIndex Questions </v-btn>
    <v-tabs v-if="!$vuetify.breakpoint.mobile" v-model="tab">
      <v-tab v-for="(item, i) in tabs" :key="i">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-select v-else v-model="select" :items="tabs" />
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <all-questions :admin="true" number-of-questions="100" />
      </v-tab-item>
      <v-tab-item>
        <all-comments :admin="true" />
      </v-tab-item>
      <v-tab-item>
        <div>Content</div>
      </v-tab-item>
      <v-tab-item>
        <all-users :admin="true" />
      </v-tab-item>
      <v-tab-item>
        <create-blog :blog="blog" :label="'Create Post'" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { endpoints } from '../models/endpoints'
export default {
  name: 'Admin',
  middleware: ['accessToken', 'isAdmin'],
  components: {
    AllQuestions: () => import('../components/admin/allQuestions'),
    AllComments: () => import('../components/admin/allComments'),
    AllUsers: () => import('../components/admin/allUsers'),
    CreateBlog: () => import('../components/admin/createBlog.vue'),
  },
  data: () => ({
    tab: 'Questions',
    select: 'Questions',
    tabs: ['Questions', 'Comments', 'Content', 'Users', 'Create Blog'],
    blog: {
      img: '',
      body: '',
      title: '',
      description: '',
      dateCreated: null,
      size: 2,
    },
  }),
  watch: {
    select(val) {
      this.tab = this.tabs.indexOf(val)
    },
  },
  methods: {
    async reindex() {
      try {
        const resp = await this.$axios.post(`${endpoints.updateGraphQL}`, {})
        console.log(resp)
      } catch (error) {
        console.log(error)
      }
    },
  },
  head() {
    return {
      title: 'Admin Panel',
      script: [
        {
          src: 'https://cdnjs.deepai.org/deepai.min.js',
          async: true,
          defer: true,
        },
      ],
    }
  },
}
</script>

<style>
</style>
