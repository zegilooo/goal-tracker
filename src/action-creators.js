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

export const LOGIN = 'AUTH_LOGIN'
export const LOGOUT = 'AUTH_LOGOUT'

export function logIn (email, password) {
  return { type: LOGIN, email, password }
}

export function logOut () {
  return { type: LOGOUT }
}
