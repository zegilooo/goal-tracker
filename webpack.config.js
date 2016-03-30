var getConfig = require('hjs-webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var OfflinePlugin = require('offline-plugin')

var config = getConfig({
  in: 'src/index.js',
  out: 'public',
  html: process.env.NODE_ENV !== 'production',
  clearBeforeBuild: '!(favicon.ico)',
  https: process.argv.indexOf('--https') !== -1
})

config.plugins.push(
  new CopyWebpackPlugin([{ from: 'static' }]),
  new OfflinePlugin()
)

module.exports = config
