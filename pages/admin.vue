<template>
  <div>
    <h1 class="primary_v--text">Admin</h1>
    <v-btn @click="reindex"> ReIndex Questions </v-btn>
    <client-only>
      <v-tabs v-if="!$vuetify.breakpoint.mobile" v-model="tab">
        <v-tab v-for="(item, i) in tabs" :key="i">
          {{ item }}
        </v-tab>
      </v-tabs>

      <v-select v-else v-model="select" :items="tabs" />
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <admin-questions :admin="true" number-of-questions="100" />
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
        <v-tab-item>
          <sign-ups />
        </v-tab-item>
      </v-tabs-items>
    </client-only>
  </div>
</template>

<script>
import { endpoints } from '../models/endpoints'
export default {
  name: 'Admin',
  middleware: ['accessToken', 'isAdmin'],
  components: {
    AdminQuestions: () => import('../components/admin/adminQuestions'),
    AllComments: () => import('../components/admin/allComments'),
    AllUsers: () => import('../components/admin/allUsers'),
    CreateBlog: () => import('../components/admin/createBlog.vue'),
    SignUps: () => import('../components/admin/signups.vue'),
  },
  data: () => ({
    tab: 'Questions',
    select: 'Questions',
    tabs: [
      'Questions',
      'Comments',
      'Content',
      'Users',
      'Create Blog',
      'Sign Ups',
    ],
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
        await this.$axios.post(`${endpoints.updateGraphQL}`, {})
      } catch (e) {
        console.log(e)
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

<style></style>
