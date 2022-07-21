import Vue from 'vue'
import { toSvg, toPng } from 'html-to-image'
Vue.mixin({
  methods: {
    async turnIntoSVG(node) {
      return toSvg(node).then((dataUrl) => {
        return dataUrl
      })
    },
    async turnIntoPng(node){
      return toPng(node).then((dataUrl) => {
        return dataUrl
      })
    }
  },
})
