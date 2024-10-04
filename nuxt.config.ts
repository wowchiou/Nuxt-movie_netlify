// const apiBaseUrl = 'http://localhost:3000';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // 自动引入 `defineStore()`
          'defineStore',
          'acceptHMPUpdate',
        ],
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
  },
  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      fallbackLocale: 'en',
    },
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
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
        code: 'ja',
        name: '日本語',
        file: 'ja.json',
      },
      {
        code: 'zh-CN',
        name: '简体中文',
        file: 'zh-CN.json',
      },
      {
        code: 'pt-PT',
        name: 'Português',
        file: 'pt-PT.json',
      },
      {
        code: 'pt-BR',
        name: 'Português do Brasil',
        file: 'pt-BR.json',
      },
      {
        code: 'ru-RU',
        name: 'Русский',
        file: 'ru-RU.json',
      },
      {
        code: 'fr-FR',
        name: 'Français',
        file: 'fr-FR.json',
      },
      {
        code: 'uk-UA',
        name: 'Українська',
        file: 'uk-UA.json',
      },
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',
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
      '/ipx/tmdb/**': { proxy: 'https://image.tmdb.org/t/p/original/**' },
      '/ipx/yt/**': { proxy: 'https://img.youtube.com/**' },
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
  // 配置完全类型化的环境覆盖
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
