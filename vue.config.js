process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  chainWebpack: config => {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  },
  devServer: {
    proxy: process.env.VUE_APP_API
    // proxy: process.env.VUE_APP_SERVICE_API
  }
}
