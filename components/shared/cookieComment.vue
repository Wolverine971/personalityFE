<template>
  <p class="ml-3">
    {{ text }}
  </p>
</template>

<script>
export default {
  name: 'CookieComment',
  props: {
    text: {
      type: String,
      required: false,
      default: null
    },
    likes: {
      type: Number,
      required: true,
      default: null
    },
    parentId: {
      type: String,
      required: true,
      default: null
    },
    showCookies: {
      type: Boolean,
      required: true,
      default: null
    }

  },
  data () {
    return {
      height: 0,
      width: 0,
      cookies: 20,
      canvas: null,
      ctx: null,
      color: 'pink'
    }
  },
  watch: {
    likes (newLikes) {
      if (this.showCookies) {
        if (newLikes) {
          this.getBox()
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
          this.drawCookies(newLikes)
        } else {
          const canvasBox = document.getElementById(this.parentId)
          canvasBox.style.backgroundImage = 'none'
          canvasBox.style.cssText = ''
        }
      }
    },
    showCookies (val) {
      if (val && this.likes) {
        this.getBox()
        this.drawCookies(this.likes)
      }
    }
  },
  mounted () {
  },
  methods: {

    drawCookies (cookies, recurse) {
      if (cookies <= 0 && recurse) {
        this.canvasBox.style.backgroundImage = 'url(' + this.canvas.toDataURL('image/png') + ')'
        return
      }
      const height = parseInt(this.height)
      const width = parseInt(this.width)
      const cookieCount = cookies
      const area = height * width
      const cookieArea = area / cookieCount
      // this needs changed
      const cookieBox = Math.round(Math.sqrt(cookieArea) * 100) / 100

      const cookieRadius = Math.sqrt(cookieArea / 2.14)
      const cookieDiameter = Math.round(cookieRadius * 2 * 100) / 100
      if (cookies > 0) {
        const img = new Image()

        let contWidth = Math.floor(width / cookieBox)
        if (contWidth > cookieCount) {
          contWidth = cookieCount
        }

        const contHeight = Math.floor(height / cookieBox) || 1

        img.onload = () => {
          let cookiesCreated = 0
          if (cookieCount === 1) {
            cookiesCreated++
            this.ctx.drawImage(
              img,
              0,
              0
            )
            // this.canvasBox.style.backgroundImage = 'url(' + this.canvas.toDataURL('image/png') + ')'
          } else {
            for (let i = 0; i < contHeight; i++) {
              for (let j = 0; j < contWidth; j++) {
                cookiesCreated++
                this.ctx.drawImage(
                  img,
                  j * cookieBox,
                  i * cookieBox,
                  cookieBox,
                  cookieBox
                )
              }
            }
          }
          if (cookiesCreated) {
            const more = cookies - cookiesCreated
            if (more > 0) {
              this.drawCookies(more, true)
            } else {
              this.canvasBox.style.backgroundImage = 'url(' + this.canvas.toDataURL('image/png') + ')'
            }
          }
        }
        img.crossOrigin = 'anonymous'
        if (this.color === 'pink') {
          // ffc0cb
          // #ff0000
          const pinkColor = 'ffd1d9'
          img.src =
          `https://api.iconify.design/mdi-cookie-outline.svg?color=%23${pinkColor}&height=${cookieDiameter}`
          this.color = 'blue'
        } else {
          // 8acfef
          // aedef4
          const blueColor = 'aedef4'
          img.src =
          `https://api.iconify.design/mdi-cookie-outline.svg?color=%23${blueColor}&rotate=270deg&height=${cookieDiameter}`
          this.color = 'pink'
        }
      }
    },
    getBox () {
      this.canvasBox = document.getElementById(this.parentId)

      this.width = this.canvasBox.clientWidth
      this.height = this.canvasBox.clientHeight

      this.canvas = document.createElement('canvas')

      this.canvas.height = this.height
      this.canvas.width = this.width
      this.ctx = this.canvas.getContext('2d')
      this.ctx.height = this.height
      this.ctx.width = this.width
    }
  }
}
</script>

<style></style>
