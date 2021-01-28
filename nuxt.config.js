export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - for all personalities',
    title: '9takes',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Community for questions and answers exploring 9 takes (enneagram) on any topic. Celebrate our differences and similarities in our personalities...'
      },
      { 'http-equiv': 'content-language', content: 'en' },
      { property: 'og:url', content: 'https://9takes.com' },
      {
        property: 'og:description',
        content:
          'Community for questions and answers exploring 9 takes (enneagram) on any topic. Celebrate our differences and similarities in our personalities...'
      },
      { property: 'og:title', content: '9takes' },
      {
        name: 'twitter:description',
        content:
          'Community for questions and answers exploring 9 takes (enneagram) on any topic. Celebrate our differences and similarities in our personalities...'
      },
      {
        name: 'twitter:title',
        content: '9takes | Home for personality Q&A'
      },
      {
        name: 'keywords',
        content:
          'enneagram, personality, personality network, enneagram questions, enneagram answers, personality explanation, Q&A, ask a question, type 1, type 2, type 3, type 4, type 5, type 6, type 7, type 8, type 9'
      }
    ],

    link: [
      {
        rel: 'shortcut icon',
        href: '/cotton-candy.ico',
        author: 'https://www.flaticon.com/authors/freepik'
      },
      {
        rel: 'icon',
        type: 'svg',
        href: '/cotton-candy.svg',
        author: 'https://www.flaticon.com/authors/freepik'
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/cotton-candy.svg',
        author: 'https://www.flaticon.com/authors/freepik'
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/main.scss', '~/assets/googleFonts.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/socket.io.js', mode: 'client' },
    { src: '~/plugins/Vuelidate', mode: 'client' },
    { src: '~/plugins/axiosIntercept', mode: 'client' },
    { src: '~/plugins/axios.ts', mode: 'client' },
    { src: '~/plugins/gtag.js', mode: 'client' }
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
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', '@nuxtjs/auth', '@nuxtjs/toast'],

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
        'https://www.9takes.com',
        'https://www.9takes.com/',
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

  pwa: {
    manifest: {
      name: '9takes',
      short_name: '9takes',
      lang: 'en',
      theme_color: '#8fceee',
      useWebmanifestExtension: true
    },
    meta: {
      /* meta options */
      favicon: '/cotton-candy.ico',
      description: 'Community for questions and answers based on personality'
    },
    icon: {
      source: '/iconz.png',
      fileName: 'iconz.png'
    }
  },

  // render: {

  //   csp: {
  //     // reportOnly: true,
  //     hashAlgorithm: 'sha256',
  //     policies: {
  //       'default-src': ["'self'"],
  //       'img-src': ['https:', '*.google-analytics.com'],
  //       'worker-src': ["'self'"],
  //       'style-src': ["'self'", "'unsafe-inline'", '*.materialdesignicons.min.css', '*.googleapis.com'],
  //       'script-src': [
  //         "'self'",
  //         "'unsafe-inline'",
  //         '*.google-analytics.com',
  //         'https://cdnjs.deepai.org/deepai.min.js',
  //         '*socket.io'
  //       ],
  //       'connect-src': ['*.google-analytics.com', 'https://cdnjs.deepai.org/deepai.min.js'],
  //       'form-action': ["'self'"],
  //       'frame-ancestors': ["'none'"],
  //       'object-src': ["'none'"]
  //     }
  //   }
  // },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    // analyze: true,
    loaders: {
      cssModules: {
        modules: {
          localIdentName: '[hash:base64:4]'
        }
      }
    }
  },
  // target: 'static', // 'universal',
  env: {
    BE_URL: process.env.BE_URL || 'http://localhost:3001/',
    GOOGLE: process.env.GOOGLE,
    DEEPAI: process.env.DEEPAI
  }
}
