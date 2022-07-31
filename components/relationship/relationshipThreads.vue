<template>
  <div>
    <div v-if="shownRelationship">
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
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  outlined
                  :disabled="!text"
                  v-on="on"
                  @click="submitPost"
                >
                  Post
                </v-btn>
              </template>
              <span>send it</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>

        Total Threads: {{ shownRelationship.count }}
        <v-card
          v-for="(thread, i) in shownRelationship.RelationshipData"
          :key="i"
          class="margin-bot"
        >
          <thread
            :thread="thread"
            @threadUpdated="threadUpdated({ index: i, text: $event })"
          />
        </v-card>

        <div
          v-if="
            shownRelationship.RelationshipData.length <
              shownRelationship.count && !loading
          "
          class="row"
          @click="loadMore"
        >
          <v-btn outlined color="secondary"> Load More </v-btn>
        </div>
        <v-progress-linear v-else-if="loading" indeterminate />
      </div>
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
      default() {
        return {}
      },
      required: false,
    },
    types: {
      type: Array,
      default() {
        return []
      },
      required: false,
    },
  },
  data() {
    return {
      text: '',
      loading: false,
      shownRelationship: null,
    }
  },
  watch: {
    relationship(val) {
      this.shownRelationship = val
    },
  },
  mounted() {
    this.shownRelationship = this.relationship
  },
  methods: {
    loadMore() {
      this.loading = true
      this.contentLoading = true
      return this.$axios
        .get(
          `${endpoints.relationship}/${this.selectedType}/${
            this.lastDate || ''
          }`
        )
        .then((resp) => {
          if (resp && resp.data) {
            const content = [...this.selectedPosts, ...resp.data.content]
            this.$store.commit('setPosts', {
              [this.selectedType]: {
                content,
                count: this.count,
              },
            })
          }
        })
    },
    async submitPost() {
      const resp = await this.$axios.post(
        `${endpoints.relationship}/create/${this.types[0]}/${this.types[1]}`,
        { text: this.text }
      )
      if (resp && resp.data) {
        this.shownRelationship.RelationshipData = [
          resp.data,
          ...this.shownRelationship.RelationshipData,
        ]
        this.shownRelationship.count += 1
        this.text = ''
      } else {
        console.log('failed')
      }
    },
    async threadUpdated(event) {
      const selectedComment = {
        ...this.shownRelationship.RelationshipData[event.index],
      }
      const resp = await this.$axios.post(
        `${endpoints.updateThread}/${selectedComment.id}`,
        {
          text: event.text,
        }
      )
      if (resp && resp.data) {
        this.shownRelationship.RelationshipData[event.index].text = event.text
        this.$store.dispatch('toastSuccess', 'Updated Thread')
      } else {
        this.$store.dispatch('toastError', 'Update Thread Failure')
      }
    },
  },
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
