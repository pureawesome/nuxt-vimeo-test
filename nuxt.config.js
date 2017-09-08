const axios = require('axios')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'awfranks-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  // loading: { color: '#3B8070' },
  loading: false,
  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  css: ['~/assets/global.css'],
  generate: {
    routes: function () {
      return axios.get('http://localhost:3000/yola.json')
        .then((res) => {
          return res.data.data.map((video) => {
            return '/videos/' + video.uri
          })
        })
    }
  }
}
