export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  /**
   * Environment variable
   */
  env: {
    API_URL: 'http://localhost:8888',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'svnlike, a beautiful web client for svn' || process.env.npm_package_name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || 'svnlike' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/app.less'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/heyui', '@/plugins/route', '@/plugins/axios', '@/plugins/common'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
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

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // extractCSS: true,
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
    // babel: {
    //  plugins: [
    //    [
    //      'import',
    //      {
    //        libraryName: 'ant-design-vue',
    //        libraryDirectory: 'es',
    //        style: true, // `style: true` 会加载 less 文件
    //      },
    //    ],
    //    [
    //      'component',
    //      {
    //        libraryName: 'element-ui',
    //        styleLibraryName: 'theme-chalk',
    //      },
    //    ],
    //  ],
    // },
  },

  // loading
  loading: false,
}
