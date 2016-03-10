// Calage tests d’intégration
// ==========================

// Désactiver les imports Stylus de Webpack, qui ne marcheront pas dans Mocha/Node.
const noop = () => null
require.extensions['.styl'] = noop

// Éviter React-Transform-HMR(E) lors des tests (ne sert à rien et peut même poser
// souci sur la résolution de modules).
process.env.NODE_ENV = 'test'
