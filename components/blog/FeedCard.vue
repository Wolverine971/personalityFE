<template>
  <v-col cols="12" :md="blog.size === 2 ? 6 : blog.size === 3 ? 4 : 0">
    <v-card
      :id="blog.title"
      flat
      tile
      :height="blog.prominent ? 450 : 350"
      color="grey lighten-1"
      dark
    >
      <v-img
        id="img"
        :src="
          blog.img && blog.img.length < 40
            ? `https://personality-app.s3.amazonaws.com/${blog.img}`
            : blog.img
        "
        router
        :style="{ 'background-size': 'auto' }"
        width="100%"
        height="100%"
        :to="{ path: `/blog/${blog.title}` }"
      >
        <v-row v-if="!blog.prominent" class="fill-height text-right ma-0">
          <v-col cols="12">
            <h3 class="title font-weight-bold mb-2 primary_v--text">
              {{ blog.title }}
            </h3>
            <h4 class="secondary_v--text" v-html="blog.description" />
            <div class="caption">
              {{
                blog.author
                  ? blog.author.firstName + ' ' + blog.author.lastName
                  : ''
              }}
              <br />Date {{ getTime(blog.dateCreated) }}
            </div>
          </v-col>

          <v-col align-self="end">
            <NuxtLink
              :to="{
                path: `/blog/${blog.title.replaceAll(' ', '-')}`,
                query: {},
              }"
            >
              <v-chip
              style="cursor: pointer"
              class="text-uppercase ma-0"
              color="primary"
              label
              small

            >
              Read More
            </v-chip>
            </NuxtLink>
            <!-- <v-chip
              class="text-uppercase ma-0"
              color="primary"
              label
              small
              router
              :to="{ path: `/blog/${blog.title.replaceAll(' ', '-')}` }"
            >
              Read More
            </v-chip> -->
          </v-col>
        </v-row>
      </v-img>
    </v-card>
  </v-col>
</template>

<script>
import { msToDate } from '../../utils'
export default {
  name: 'FeedCard',

  props: {
    preview: {
      type: Boolean,
      default: false,
      required: false,
    },
    blog: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    getTime(time) {
      return msToDate(time)
    },
  },
}
</script>

<style>
.v-image__image {
  transition: 0.3s linear;
}
</style>
