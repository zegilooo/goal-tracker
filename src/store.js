import { applyMiddleware, createStore, compose } from 'redux'
import moment from 'moment'
import { persistentStore } from 'redux-pouchdb'
import PouchDB from 'pouchdb'
import thunkMiddleware from 'redux-thunk'

import goalTrackerReducer from './reducers'

const db = new PouchDB('goal-tracker')

const DEFAULT_STATE = {
  currentUser: {
    loginState: 'success',
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

const enhancer = compose(
  persistentStore(db),
  applyMiddleware(thunkMiddleware),
  typeof window !== 'undefined' && window.devToolsExtension
    ? window.devToolsExtension()
    : (x) => x
)

const store = createStore(goalTrackerReducer, DEFAULT_STATE, enhancer)

export const loggedIn = () => store.getState().currentUser.loginState === 'success'
export default store
