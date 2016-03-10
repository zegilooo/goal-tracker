// État central Redux
// ==================

// L’état consolidé de l’application est géré par [Redux](http://redux.js.org/).
// La [seule manière de le faire évoluer](http://redux.js.org/docs/basics/DataFlow.html)
// est d’appeler sa méthode `dispatch(…)` en lui transmettant un
// [descripteur d’action](http://redux.js.org/docs/basics/Actions.html)
// (normalement fourni par une des fonctions de `action-creators.js`).
//
// L’état en question est *immutable* : il n’est jamais modifié en place,
// mais génère à chaque fois une nouvelle version de lui-même, si besoin.
//
// Le descriptif de ces évolutions est fourni par les
// [*reducers*](http://redux.js.org/docs/basics/Reducers.html),
// qui sont combinés pour fournir un *reducer* unique, utilisé à la création du
// *store* Redux.

import { createStore, compose } from 'redux'
import moment from 'moment'
import { persistentStore } from 'redux-pouchdb'
import PouchDB from 'pouchdb'

// Le *reducer* principal, qui pilote toutes les évolutions de l’état.
import goalTrackerReducer from './reducers'

// On persiste l’état côté client (dans le navigateur) grâce à
// [PouchDB](http://pouchdb.com/).
// Celui-ci tentera une persistence dans
// [IndexedDB](https://developer.mozilla.org/fr/docs/IndexedDB),
// ou à défaut [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage).
// La synchro entre la couche de persistence et le *store* Redux est
// [automatique](https://github.com/vicentedealencar/redux-pouchdb)
// une fois les connexions appropriées mises en place.  En configurant la base
// PouchDB pour se répliquer avec un serveur (PouchDB ou CouchDB) distant, on
// aurait même une synchro automatique avec le côté serveur.
const db = new PouchDB('goal-tracker')

// État par défaut, utile pour notre développement mais qui serait sûrement
// beaucoup plus réduit en production.
const DEFAULT_STATE = {
  currentUser: {
    email: 'christophe@delicious-insights.com'
  },
  goals: [
    { id: 0, name: 'Apprendre React', target: 5, units: 'aspects' },
    { id: 1, name: 'Apprendre Redux', target: 2, units: 'vidéos' },
    { id: 2, name: 'Apprendre Webpack', target: 3, units: 'pages de doc' }
  ],
  today: moment().format('YYYY-MM-DD'),
  todaysProgress: { 0: 1, 1: 1, 2: 1 },
  history: [
    {
      date: moment().subtract(1, 'day').format('YYYY-MM-DD'),
      progresses: {
        0: [2, 5],
        1: [1, 2]
      }
    },
    {
      date: moment().subtract(2, 'days').format('YYYY-MM-DD'),
      progresses: {
        0: [4, 5],
        1: [1, 2],
        2: [2, 3]
      }
    },
    {
      date: moment().subtract(3, 'days').format('YYYY-MM-DD'),
      progresses: {
        0: [3, 5],
        1: [2, 2],
        2: [1, 3]
      }
    }
  ]
}

// Pile de *middlewares* (traitements intermédiaires) à associer
// au *store*.  On y trouve ici la persistance dans PouchDB mais
// aussi la connexion aux
// [Redux Dev Tools](https://github.com/zalmoxisus/redux-devtools-extension),
// s’ils sont installés dans le navigateur.
const enhancer = compose(
  persistentStore(db),
  typeof window !== 'undefined' && window.devToolsExtension
    ? window.devToolsExtension()
    : (x) => x
)

// Création à proprement parler du *store*, en fournissant son
// *reducer* (au minimum), un état par défaut et la pile de *middlewares*
// à y injecter.
const store = createStore(goalTrackerReducer, DEFAULT_STATE, enhancer)

// Petite fonction utilitaire indiquant si un utilisateur connecté est
// présent dans l’état applicatif ou non.  Utilisé notamment pour la
// contrainte d’authentification de certaines routes et pour le choix dans
// `HomeScreen` entre écran de connexion et écran principal.
export const loggedIn = () => !!store.getState().currentUser

// Le *store* est l’export par défaut.
export default store
