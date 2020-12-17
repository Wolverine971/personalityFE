<template>
  <div>
    <v-card v-if="type === 'comments'" class="margin-top">
      <v-row no-gutters>
        <v-select
          v-model="params.enneagramTypes"
          :items="enneaTypes"
          dense
          multiple
          label="Enneagram Type"
          @change="search"
        >
          <template slot="default">
            All Types
          </template>
        </v-select>
        <v-select
          v-model="params.dateRange"
          :items="dateChoices"
          dense
          label="Date Range"
          @change="search"
        >
          <template slot="default">
            All Time
          </template>
        </v-select>
        <v-select
          v-model="params.sortBy"
          :items="sortByChoices"
          dense
          label="Sort By"
          item-text="id"
          value="id"
          @change="search"
        >
          <template slot="default">
            Newest
          </template>
        </v-select>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Sort',
  props: {
    type: {
      type: String,
      required: true,
      default: null
    }
  },
  data () {
    return {
      data: null,
      params: {
        enneagramTypes: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
        dateRange: 'All Time',
        sortBy: 'newest'
      },
      enneaTypes: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      dateChoices: ['Today', 'Week', 'Month', '3 Months', 'Year', 'All Time'],
      sortByChoices: [
        {
          id: 'likes',
          displayName: 'Most Liked'
        },
        {
          id: 'newest',
          displayName: 'Newest'
        },
        {
          id: 'oldest',
          displayName: 'Oldest'
        }
      ]
    }
  },
  mounted () {
    this.$emit('triggerNewSearch', this.params)
  },
  methods: {
    search () {
      console.log(this.params)
      console.log('search')
      this.$emit('triggerNewSearch', this.params)
    }
  }
}
</script>

<style></style>
