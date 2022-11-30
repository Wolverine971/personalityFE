<template>
  <div class="stary-background">
    <svg
      height="100%"
      width="100%"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        v-for="(s, i) in svgs"
        :key="i"
        :style="{
          'transform-box': 'fill-box',
          'transform-origin': '50% 50%',
        }"
        :width="s.width"
        :height="s.height"
        class="stary-star"
        :transform="s.transform"
        stroke="#000"
        fill="#3c233c"
        d="M24 2q3-1.2 2 2.5L31 18h10.5l7.5 1.5-13 11 4 17-2.5-1.5-11-7h-3l-13 9-.5-2.5 4-15-13-11L8.5 18H19l5-16Z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'SvgBackground',

  data: () => {
    return {
      svgs: [],
      height: '100%',
      width: '100%'
    }
  },

  mounted () {
    setTimeout(() => {
      this.renderBackground()
    }, '1000')

    // this.$nextTick(() => {
    //   window.addEventListener('resize', this.onResize)
    // })
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  },

  methods: {
    onResize () {
      this.height = window.innerHeight
      this.renderBackground()
    },
    renderDynamicBackground (svg) {
      const parentContainer = document.querySelector('#__layout')
      const encodedData = window.btoa(svg.outerHTML)
      const url = 'data:image/svg+xml;base64,' + encodedData
      parentContainer.style.backgroundImage = 'url(' + url + ')'
    },
    renderBackground () {
      const body = document.documentElement.getElementsByTagName('body')[0]
      this.height = body.offsetHeight
      this.width = body.offsetWidth

      for (let i = 0; i < 300; i++) {
        const x = Math.floor(Math.random() * (this.height - 1) + 1)
        const y = Math.floor(Math.random() * (this.width - 1) + 1)

        const width = Math.floor(Math.random() * (200 - 1) + 1)
        const height = Math.floor(Math.random() * (200 - 1) + 1)
        const scaleValue = Math.floor(Math.random() * (3 - 1) + 1)
        this.svgs.push({
          width: width * scaleValue,
          height: height * scaleValue,
          x,
          y,
          translate: `translate(${x}, ${x})`,
          scale: `scale(${scaleValue})`,
          rotate: `rotate(${Math.floor(Math.random() * (180 - 1) + 1)})`,
          transform: `translate(${Math.floor(
            Math.random() * (this.width - 1) + 1
          )}, ${Math.floor(
            Math.random() * (this.height - 1) + 1
          )}) rotate(${Math.floor(
            Math.random() * (360 - 1) + 1
          )}), scale(${scaleValue})`
        })
      }
    }
  }
}
</script>
<style lang="scss">
.stary-background {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100vw;
  // background-image: linear-gradient(to bottom, #3d3d99, #000000);
  // background-image: linear-gradient(to bottom, white, black 100%);
  // background-image: linear-gradient(
  //   to bottom,
  //   white,
  //   var(--secondary),
  //   var(--primary),
  //   black 100%
  // );
}
.stary-star {
  opacity: 0.3;
  fill: var(--primary);
  stroke: var(--primary_v);
  &:hover {
    fill: var(--secondary);
    stroke: var(--secondary_v);
    pointer-events: all;
    transition: all 0.1s ease-in-out 0.2s;
    -webkit-transition: all 0.1s ease-in-out 0.1s;
    opacity: 1;
  }
}
</style>
