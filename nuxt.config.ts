// const apiBaseUrl = 'http://localhost:3000';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  // devServer: {
  //   host: '0.0.0.0', // 或者使用你電腦的IP地址
  //   port: 3000,
  // },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMPUpdate'],
      },
    ],
    '@nuxt/icon',
    '@element-plus/nuxt',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
  ],
  icon: {
    componentName: 'NuxtIcon',
    // serverBundle: {
    //   collections: ['material-symbols', 'simple-icons', 'mdi', 'line-md'],
    // },
    provider: 'iconify',
    serverBundle: false,
  },
  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected_wowchiou-nuxt-movies',
      fallbackLocale: 'en',
    },
    strategy: 'prefix_and_default',
    locales: [
      {
        code: 'zh-TW',
        name: '繁體中文',
        file: 'zh-TW.json',
      },
      {
        code: 'zh-CN',
        name: '简体中文',
        file: 'zh-CN.json',
      },
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
      },
      {
        code: 'ja',
        name: '日本語',
        file: 'ja.json',
      },
      {
        code: 'de-DE',
        name: 'Deutsch',
        file: 'de-DE.json',
      },
      {
        code: 'es-ES',
        name: 'Español',
        file: 'es-ES.json',
      },
      {
        code: 'it',
        name: 'Italiano',
        file: 'it.json',
      },
      {
        code: 'fr-FR',
        name: 'Français',
        file: 'fr-FR.json',
      },
    ],
    // lazy: true,
    langDir: 'locales',
    defaultLocale: 'zh-TW',
  },
  image: {
    domains: [
      'http://localhost:3000',
      'wowchiou-nuxt-movies.netlify.app',
      'image.tmdb.org',
    ],
  },
  tailwindcss: {
    cssPath: ['~/assets/style/tailwind.css', { injectPosition: 'first' }],
    configPath: 'tailwind.config',
  },
  nitro: {
    routeRules: {
      '/ipx/tmdb/**': {
        proxy: 'https://image.tmdb.org/t/p/original/**',
        headers: {
          // 設置緩存為一個月
          'Cache-Control': 'public, max-age=2592000, immutable',
        },
      },
      '/ipx/yt/**': {
        proxy: 'https://img.youtube.com/**',
        headers: {
          // 設置緩存為一個月
          'Cache-Control': 'public, max-age=2592000, immutable',
        },
      },
    },
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
    // pageTransition: { name: 'test', mode: 'out-in' },
    // layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  // 配置環境變數
  runtimeConfig: {
    // 可在客戶端和服務端訪問
    tmdbBaseUrl: '',
    tmdbApiKey: '',
    tmdbApiToken: '',
    // 只能在客户端访问
    public: {
      env: '',
    },
  },
  imports: {
    dirs: ['stores', 'utils', 'service', 'constants'],
  },
  $production: {
    routeRules: {
      '/api/**': { isr: false },
      '/**': { isr: true },
    },
  },
  $development: {
    routeRules: {
      '/**': { isr: false }, // 禁用 ISR，開發時即時渲染
    },
  },
  // 配置全局样式
  // css: ['~/assets/style/main.scss'],
  // vite.config 配置寫在這邊
  // vite: {
  //   css: {
  //     preprocessorOptions: {
  //       scss: {
  //         additionalData: '@use "@/assets/style/_var.scss" as *;',
  //       },
  //     },
  //   },
  // },
  // 啟用vue的實驗性功能
  // vue: {
  //   defineModel: true,
  //   propsDestructure: true,
  // },
});
