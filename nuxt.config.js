import { head } from './config'

export default {
  store: false,
  head,
  css: [
    '~assets/styles/app.scss'
  ],
  styleResources: {
    scss: [
      'assets/styles/global/vars.scss',
      'assets/styles/global/mixins.scss'
    ]
  },
  plugins: [
    {
      src: '~plugins/utils.js',
      ssr: false
    },
    {
      src: '~plugins/vBodyScrollLock.js',
      ssr: false
    },
    {
      src: '~plugins/vueMultiselect',
      ssr: false
    }
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
  ],
  modules: [
  ],
  build: {
    extend (config) {
      // SVG Loader
      config.module.rules
        .filter(r => r.test.toString().includes('svg'))
        .forEach((r) => {
          r.test = /\.(png|jpe?g|gif)$/
        })
      config.module.rules.push({
        test: /\.svg$/,
        loader: 'vue-svg-loader'
      })
    }
  }
}
