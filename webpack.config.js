var getConfig = require('hjs-webpack')

module.exports = getConfig({
  in: 'src/index.js',
  out: 'public',
  clearBeforeBuild: '!(favicon.ico)',
  https: process.argv.indexOf('--https') !== -1
})
