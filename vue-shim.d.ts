import Vue, { Component } from 'vue'
// import VueRouter from 'vue-router'

// declare module 'vue/types/vue' { Store }
// }

import { Store } from 'vuex'

import { AppState } from './store/index'

declare module '*.vue' {
const component: Component
  export default component
}

declare module 'vue/types/vue' {
  interface Vue {
    sockets: any;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    sockets?: any;
  }
}

declare module 'vuelidate' {
  // we need to augment the actual Vue types
  // import vue from 'vue'

  // must bolt on the validations property to the input of ComponentOptions
  // and also onto the "output" of @Component in the form of VueClass<Vue>
  // declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
      validations?: { [x: string]: any }
    }
    interface VueClass<V extends Vue> {
      validations?: { [x: string]: any }
    }
  // }
}

declare module '@vue/runtime-core' {

  interface ComponentCustomProperties {
    $store: Store<AppState>
  }
}
// Vuex@4.0.0-beta.1 is missing the typing for `useStore`. See https://github.com/vuejs/vuex/issues/1736
declare module 'vuex' {
  export function useStore(key?: string): Store<AppState>
}
