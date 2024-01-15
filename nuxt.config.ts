// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        {
          "name": "viewport",
          "content": "width=device-width, initial-scale=1"
        },
        {
          "charset": "utf-8"
        }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/todo.png'
        }
      ]
    }
   },

  devtools: { enabled: true },

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@pinia/nuxt',
  ],

  runtimeConfig: {
    apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
    public: {
      baseURL: 'http://localhost:3000',
      apiBase: 'https://jsonplaceholder.typicode.com', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    }
  },

  imports: {
    dirs: [
      // Scan top-level modules
      'composables',
      // ... or scan modules nested one level deep with a specific name and file extension
      'composables/*/index.{ts,js,mjs,mts}',
      // ... or scan all modules within given directory
      'composables/**'
    ]
  },

  components: [
    {
      path: './components',
      extensions: ['.vue'],
      pathPrefix: false
    }
  ],
  
  pinia: {
    storesDirs: ['./stores/**'],
  },
  
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  }
})
