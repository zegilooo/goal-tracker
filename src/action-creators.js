// Actions Creators pour Redux
// ===========================

// Avec Redux, on [recommande de centraliser](http://redux.js.org/docs/recipes/ReducingBoilerplate.html)
// le code qui crée des objets représentant les actions
// vers le *store* central.  Pour rappel, une action
// est une demande de modification de l’état central.
// Ce sont par défaut des objets JS basiques, avec
// au moins une propriété `type`, qui vaut généralement
// une `String` unique (aussi complexe soit-elle).
//
// En centralisant leur création, **on garantit que d’un
// endroit de l'appli à un autre, on ne créera pas des
// objets hétérogènes pour une même action**.

// Réglages d’objectifs
// --------------------

// On prend soin d’exporter les constantes de type aussi,
// afin notamment que le code des *reducers* puisse les
// utiliser et **garantir la concordance** avec les champs
// `type` dans les objets actions.
export const ADD_GOAL = 'GOALS_ADD'
export const REMOVE_GOAL = 'GOALS_DEL'
export const UPDATE_GOAL = 'GOALS_UPDATE'

export function addGoal (name, target, units) {
  return { type: ADD_GOAL, name, target, units }
}

export function removeGoal (id) {
  return { type: REMOVE_GOAL, id }
}

export function updateGoal (id, name, target, units) {
  return { type: UPDATE_GOAL, id, name, target, units }
}

// Utilisation quotidienne
// -----------------------

export const CLEAR_HISTORY = 'HISTORY_CLEAR'
export const CLOSE_DAY = 'CLOSE_DAY'
export const LOGIN = 'AUTH_LOGIN'
export const LOGOUT = 'AUTH_LOGOUT'
export const PROGRESS = 'PROGRESS'

export function clearHistory () {
  return { type: CLEAR_HISTORY }
}

export function closeDay () {
  return { type: CLOSE_DAY }
}

export function logIn (email, password) {
  return { type: LOGIN, email, password }
}

export function logOut () {
  return { type: LOGOUT }
}

export function progressOnGoal (goalId, increment = 1) {
  return { type: PROGRESS, goalId, increment }
}
