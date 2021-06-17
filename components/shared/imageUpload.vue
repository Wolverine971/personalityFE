<template>
  <div>
    <input
      id="fileElem"
      ref="fileElem"
      type="file"
      multiple
      accept="image/*"
      style="display: none"
      @change="uploadImage($event)"
    >
    <v-btn outlined @click="$refs.fileElem.click()">
      <heartbeat v-if="imgLoading" class="heart" />
      <span v-else>
        {{ showElem ? 'Re-Upload Image' : 'Upload Image' }}
      </span>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'ImageUpload',
  components: { Heartbeat: () => import('../shared/heart') },
  props: {
    parentWidth: {
      type: Number,
      default: 0,
      required: true
    }
  },

  data () {
    return {
      src: null,
      imgLoading: false,
      showElem: false
    }
  },
  methods: {
    async uploadImage () {
      this.imgLoading = true
      try {
        const fileElem = document.getElementById('fileElem')
        if (fileElem && fileElem.files && fileElem.files.length) {
          /* eslint-disable */
          await deepai.setApiKey(process.env.DEEPAI)
          const result = await deepai.callStandardApi('content-moderation', {
            image: fileElem,
          })
          /* eslint-enable */
          if (result && result.output && result.output.nsfw_score <= 0.1) {
            const reader = new FileReader()
            reader.readAsDataURL(fileElem.files[0])
            this.showElem = true
            reader.onload = (event) => {
              this.src = event.target.result
              this.imgLoading = false

              this.$emit('image', this.src)
              this.$nextTick(this.sizeit)
            }
            reader.onerror = (error) => {
              console.log(error)
              throw new Error('image reader error')
            }
          } else {
            throw new Error('Image Upload Prevented')
          }
        } else {
          this.imgLoading = false
          this.$emit('image', null)
        }
      } catch (e) {
        console.log(e)
        this.$emit('image', null)
        this.imgLoading = false
        this.$store.dispatch('toastError', e)
      }
    },
    sizeit () {
      // hacky set proper image width
      const img = document.getElementById('img')
      if (img) {
        img.width = this.parentWidth - 30
      }
    }
  }
}
</script>

<style>
</style>
