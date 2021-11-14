<template>
  <v-row>
    <v-select
      v-model="params.enneagramTypes"
      :disabled="!user"
      :items="enneaTypes"
      dense
      multiple
      outlined
      label="Enneagram Type"
      @change="search"
    >
      <template slot="default">
        All Types
      </template>
    </v-select>
    <v-select
      v-model="params.dateRange"
      :disabled="!user"
      :items="dateChoices"
      dense
      outlined
      label="Date Range"
      @change="search"
    >
      <template slot="default">
        All Time
      </template>
    </v-select>
    <v-select
      v-model="params.sortBy"
      :disabled="!user"
      :items="sortByChoices"
      dense
      outlined
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
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  mounted () {
    this.$emit('triggerNewSearch', this.params)
  },
  methods: {
    search () {
      this.$emit('triggerNewSearch', this.params)
    }
  }
}
</script>

<style></style>
