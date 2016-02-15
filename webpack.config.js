var getConfig = require('hjs-webpack')
var OfflinePlugin = require('offline-plugin')

var config = getConfig({
  in: 'src/index.js',
  out: 'public',
  clearBeforeBuild: '!(favicon.ico)',
  https: process.argv.indexOf('--https') !== -1
})

config.plugins.push(new OfflinePlugin())

module.exports = config
