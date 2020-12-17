import io from 'socket.io-client'
import Vue from 'vue'
import VueSocketIOExt from 'vue-socket.io-extended'

export default ({ store }) => {
  Vue.use(VueSocketIOExt, io('http://localhost:3001'), {
    store
  })
}
