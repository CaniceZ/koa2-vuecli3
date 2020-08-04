process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  chainWebpack: config => {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  },
  devServer: {
    // proxy: process.env.VUE_APP_API //普通http请求头
    proxy: process.env.VUE_APP_REQ_DOMAIN //protobuf请求头
  }
}
