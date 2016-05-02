// Goal settings management

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

// Using the app everyday

export const CLEAR_HISTORY = 'HISTORY_CLEAR'
export const LOGIN = 'AUTH_LOGIN'
export const LOGOUT = 'AUTH_LOGOUT'
export const PROGRESS = 'PROGRESS'

export function clearHistory () {
  return { type: CLEAR_HISTORY }
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
