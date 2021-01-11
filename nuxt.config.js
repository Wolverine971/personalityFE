export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - for personality ya know',
    title: '9takes',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],

    link: [
      { rel: 'icon', type: 'svg', href: '/cotton-candy.svg', author: 'https://www.flaticon.com/authors/freepik' },
      { rel: 'icon', type: 'image/x-icon', href: '/cotton-candy.svg', author: 'https://www.flaticon.com/authors/freepik' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ],
    script: [
      { src: 'https://cdnjs.deepai.org/deepai.min.js' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/main.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/socket.io.js', mode: 'client' },
    { src: '~/plugins/Vuelidate', mode: 'client' },
    { src: '~/plugins/axiosIntercept', mode: 'client' },
    { src: '~/plugins/axios.ts', mode: 'client' }
  ],

  server: {
    // port: 3000, // default: 3000
    host: '0.0.0.0' // default: localhost
  },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api',
    '@nuxtjs/vuetify'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    '@nuxtjs/toast'
  ],

  auth: {
    redirect: {
      login: '/auth',
      logout: '/auth',
      callback: '/auth',
      home: '/auth'
    },
    localStorage: false,
    strategies: {
      local: {
        token: {
          property: 'refreshToken',
          maxAge: 1800,
          type: false
        },
        user: {
          property: 'user',
          autoFetch: false
        },
        endpoints: {
          login: { url: '/api/user/login', method: 'post' },
          user: false,
          logout: { url: '/api/auth/logout', method: 'post' }
        },
        globalToken: true,
        tokenType: ''
        // autoLogout: false
      }
    }
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.BE_URL || 'http://localhost:3001/', // `${process.env.BASE_URL}:3001/`,
    headers: {
      'Access-Control-Allow-Origin': [
        process.env.ORIGIN,
        'http://localhost:3000/',
        'http://localhost:3000',
        'https://9takes.com',
        'https://9takes.com/',
        'http://9takes.com',
        'http://9takes.com/',
        'https://9takes.com:3001',
        'https://9takes.com:3001/',
        'http://9takes.com:3001',
        'http://9takes.com:3001/'
      ]
    },
    withCredentials: true
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    optionsPath: './vuetify.options.js'
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },
  target: 'static', // 'universal',
  env: {
    BE_URL: process.env.BE_URL || 'http://localhost:3001/'
  }
}
