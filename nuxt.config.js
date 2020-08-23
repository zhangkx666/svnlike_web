export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'spa', // spa
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',

  /**
   * Environment variable
   */
  env: {
    API_URL: 'http://localhost:8888',
  },
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'svnlike, a beautiful web client for svn' || process.env.npm_package_name,
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || 'svnlike',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/main.less'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ['@/plugins/flash', '@/plugins/antd-ui', '@/plugins/element-ui', '@/plugins/route', '@/plugins/axios'],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
    prefix: '/api/v1',
    credentials: true,
  },
  proxy: {
    '/api/v1': {
      target: 'http://localhost:8090',
      changeOrigin: true,
      pathRewrite: { '^/api/v1': '' },
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
    babel: {
      plugins: [
        [
          'import',
          {
            libraryName: 'ant-design-vue',
            libraryDirectory: 'es',
            style: true, // `style: true` 会加载 less 文件
          },
        ],
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk',
          },
        ],
      ],
    },
  },
  /**
   * loading
   */
  loading: false,
}
