import { combineReducers } from 'redux'
import { persistentReducer } from 'redux-pouchdb'

import { CLOSE_DAY } from '../action-creators'
import closeDay from './close-day'
import currentUser from './current-user'
import goals from './goals'
import history from './history'
import today from './today'
import todaysProgress from './todays-progress'

const coreReducer = combineReducers({
  currentUser, goals, history, today, todaysProgress
})

function goalTrackerReducer (state = coreReducer(undefined, {}), action) {
  switch (action.type) {
    case CLOSE_DAY:
      return closeDay(state, action)
    default:
      return coreReducer(state, action)
  }
}

export default persistentReducer(goalTrackerReducer)
