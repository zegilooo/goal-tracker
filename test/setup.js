// Disable Webpack's Stylus imports (they won't work in Node)
const noop = () => null
require.extensions['.styl'] = noop

// Avoid React-Transform-HMR(E) when testing (useless + problematic)
process.env.NODE_ENV = 'test'
