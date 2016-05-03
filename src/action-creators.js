import fetch from 'isomorphic-fetch'

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

export const CLOSE_DAY = 'CLOSE_DAY'
export const CLEAR_HISTORY = 'HISTORY_CLEAR'
export const LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE'
export const LOGIN_START = 'AUTH_LOGIN_START'
export const LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'
export const LOGOUT = 'AUTH_LOGOUT'
export const PROGRESS = 'PROGRESS'

export function clearHistory () {
  return { type: CLEAR_HISTORY }
}

export function closeDay () {
  return { type: CLOSE_DAY }
}

export function logIn (email, password) {
  return (dispatch) => {
    dispatch(logInStart())

    return fetch('http://localhost:3001/sessions', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then((res) => res.json())
    .then(({ status }) => {
      if (status === 'authenticated') {
        dispatch(logInSuccess(email))
      } else {
        dispatch(logInFailure())
      }
    })
    .catch((err) => {
      dispatch(logInFailure())
      console.error(err)
    })
  }
}

function logInFailure () {
  return { type: LOGIN_FAILURE }
}

function logInStart () {
  return { type: LOGIN_START }
}

function logInSuccess (email) {
  return { type: LOGIN_SUCCESS, email }
}

export function logOut () {
  return { type: LOGOUT }
}

export function progressOnGoal (goalId, increment = 1) {
  return { type: PROGRESS, goalId, increment }
}
