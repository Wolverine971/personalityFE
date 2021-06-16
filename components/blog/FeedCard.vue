<template>
  <v-col cols="12" :md="size === 2 ? 6 : size === 3 ? 4 : undefined">
    <v-card
      flat
      tile
      :height="value.prominent ? 450 : 350"
      color="grey lighten-1"
      dark
      href="#!"
    >
      <v-img
        height="100%"
        router
        :to="{ path: `/blog/${value.title}` }"
        gradient="rgba(0, 0, 0, .42), rgba(0, 0, 0, .42)"
      >
        <v-row v-if="!value.prominent" class="fill-height text-right ma-0">
          <v-col cols="12">
            <h3 class="title font-weight-bold mb-2">
              {{ value.title }}
            </h3>
            <h4 v-html="value.preview" />
            <div class="caption">
              {{
                value.author
                  ? value.author.firstName + ' ' + value.author.lastName
                  : ''
              }}
              <br>Date {{ getTime(value.dateCreated) }}
            </div>
          </v-col>

          <v-col align-self="end">
            <v-chip
              class="text-uppercase ma-0"
              color="primary"
              label
              small
              router
              :to="{ path: `/blog/${value.title.replaceAll(' ', '-')}` }"
            >
              Read More
            </v-chip>
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
  components: {},

  props: {
    size: {
      type: Number,
      required: true
    },
    value: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    getTime (time) {
      return msToDate(time)
    }
  }
}
</script>

<style>
.v-image__image {
  transition: 0.3s linear;
}
</style>
