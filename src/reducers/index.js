import { combineReducers } from 'redux'

import currentUser from './current-user'
import goals from './goals'
import history from './history'
import todaysProgress from './todays-progress'

const goalTrackerReducer = combineReducers({
  currentUser, goals, history, todaysProgress
})

export default goalTrackerReducer
