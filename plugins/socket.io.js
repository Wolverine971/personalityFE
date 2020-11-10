import io from 'socket.io-client'
// https://www.npmjs.com/package/vue-socket.io-extended   !!!!!!!!!!!!!!!!!!

// import io from 'socket.io-client';
// import Vue from 'vue'; // eslint-disable-line
// Vue.prototype.$socket = io('http://localhost:9000/socket.io/');

// https://github.com/nuxt/nuxt.js/issues/1697

// https://www.npmjs.com/package/vue-socket.io-extended
// ~/plugins/socket.io.js
import Vue from 'vue'
import VueSocketIOExt from 'vue-socket.io-extended'

export default ({ store }) => {
  Vue.use(VueSocketIOExt, io('http://localhost:3001'), {
    store
  })
}
