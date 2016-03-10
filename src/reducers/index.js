// Reducer combiné global
// ======================

// Selon la [meilleure pratique Redux](http://redux.js.org/docs/basics/Reducers.html#splitting-reducers),
// nous avons réalisé
// indépendamment les *reducers* des diverses parties de l’état.
// On va utiliser [`combineReducers`](http://redux.js.org/docs/api/combineReducers.html)
// pour les recombiner en un seul,
// qui délèguera automatiquement aux nôtres, champ par champ.
//
// Toutefois, une action (`CLOSE_DAY`) impacte plusieurs champs
// (en l’occurrence, `todaysProgress` et `history`), de sorte que
// nous allons la traiter dans le reducer consolidé.

import { combineReducers } from 'redux'
import { persistentReducer } from 'redux-pouchdb'

import { CLOSE_DAY } from '../action-creators'
import closeDay from './close-day'
import currentUser from './current-user'
import goals from './goals'
import history from './history'
import today from './today'
import todaysProgress from './todays-progress'

// On crée le reducer consolidé…
const coreReducer = combineReducers({
  // … basé sur nos reducers individuels pour chaque partie…
  currentUser, goals, history, today, todaysProgress
})

// Ensuite, on définit le reducer final exporté par ce module,
// qui sera donc celui exploité par le *store* Redux, afin de traiter
// les actions multi-champs.
//
// Si on n’a pas d’état transmis (cas à la première utilisation,
// notamment), on va déléguer aux reducers individuels la mise en
// place de leurs valeurs par défaut respectives.  Ainsi, pas de
// duplication de définition des valeurs par défaut.
function goalTrackerReducer (state, action) {
  if (state == null) {
    state = coreReducer(state, {})
  }

  switch (action.type) {
    case CLOSE_DAY:
      // Cloture de journée et historisation
      return closeDay(state, action)
    default:
      // Rappel : un *reducer* doit **toujours** renvoyer l’état
      // sans modification si l’action n’est pas applicable.
      return coreReducer(state, action)
  }
}

// Afin de finaliser la synchronisation entre le *store* Redux et
// PouchDB (voir `store.js`), on doit enrober les *reducers* dont le résultat
// doit être synchronisé par le `persistentReducer` exporté par `redux-pouchdb`.
// Comme ici l’ensemble des actions est pertinent, on n’enrobe qu’une fois,
// au niveau du *reducer* consolidé.
export default persistentReducer(goalTrackerReducer)
