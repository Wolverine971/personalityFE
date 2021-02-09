<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="color-btn"
        v-bind="attrs"
        elevation="1"
        fab
        small
        v-on="on"
        @click="updatedContent = content"
      >
        <v-icon> edit </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h2>{{ label }}</h2>
      </v-card-title>
      <v-card-text>
        <v-textarea
          v-model="updatedContent"
          :label="label"
          type="text"
          rows="1"
          auto-grow
          hide-details
          class="pad-bot"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn class="color-btn" @click="updateContent">
          {{ label }}
          <v-icon> keyboard_arrow_right </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'EditContent',
  props: {
    content: {
      type: String,
      required: true,
      default: ''
    },
    label: {
      type: String,
      required: true,
      default: ''
    }
  },
  data: () => ({
    updatedContent: '',
    dialog: false
  }),
  methods: {
    updateContent () {
      const formattedContent = this.updatedContent.replace('?', '')
      this.$emit('updateContent', formattedContent)
      this.dialog = false
    }
  }
}
</script>

<style></style>
