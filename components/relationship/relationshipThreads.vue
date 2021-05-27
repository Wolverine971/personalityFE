<template>
  <div v-if="shownRelationship">
    <h2>All Threads</h2>
    <div class="m-col">
      <v-card>
        <v-card-text>
          <v-textarea
            v-model="text"
            type="text"
            placeholder="Post something"
            outlined
            rows="1"
            auto-grow
            dense
            hide-details
            maxlength="500"
            counter
          />
        </v-card-text>
        <v-card-actions>
          <v-btn outlined @click="submitPost">
            Post
          </v-btn>
        </v-card-actions>
      </v-card>

      Total Threads: {{ shownRelationship.count }}
      <v-card v-for="thread in shownRelationship.RelationshipData" :key="thread.id" class="margin-bot">
        <thread :thread="thread" />
      </v-card>

      <div
        v-if="shownRelationship.RelationshipData.length < shownRelationship.count && !loading"
        class="row"
        @click="loadMore"
      >
        <v-btn outlined>
          Load More
        </v-btn>
      </div>
      <v-progress-linear v-else-if="loading" indeterminate />
    </div>
  </div>
</template>

<script>
import { endpoints } from '../../models/endpoints'
export default {
  name: 'RelationshipThreads',
  components: { Thread: () => import('./thread') },
  props: {
    relationship: {
      type: Object,
      default () {
        return {}
      },
      required: false
    },
    types: {
      type: Array,
      default () {
        return []
      },
      required: false
    }
  },
  data () {
    return {
      text: '',
      loading: false,
      shownRelationship: null
    }
  },
  watch: {
    relationship (val) {
      this.shownRelationship = val
    }
  },
  mounted () {
    this.shownRelationship = this.relationship
  },
  methods: {
    createThread () {
      console.log(this.text)
    },
    loadMore () {
      console.log('load more')
    },
    async submitPost () {
      console.log('submit post')
      // /create/:id1/:id2
      const resp = await this.$axios.post(
            `${endpoints.relationship}/create/${this.types[0]}/${this.types[1]}`, { text: this.text }
      )
      if (resp && resp.data) {
        console.log(resp.data)
        this.shownRelationship.RelationshipData = [...this.shownRelationship.RelationshipData, resp.data]
        this.shownRelationship.count += 1
      } else {
        console.log('failed')
      }
    }
  }
}
</script>

<style>
.card {
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
}

.button {
  border: thin solid currentColor;
  border-radius: 5px;
  box-sizing: border-box;
  /* padding: 10px; */
  height: 36px;
  min-width: 64px;
  padding: 0 16px;
  margin: 5px;
}
</style>
