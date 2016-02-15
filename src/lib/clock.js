import moment from 'moment'

import { closeDay } from '../action-creators'
import store from '../store'

let clock = null

checkForTodaysFirstUse()

if (module.hot) {
  module.hot.accept()
  module.hot.dispose(() => {
    clearInterval(clock)
  })
}

const HISTORY_TRIGGER_TIME = process.env.NODE_ENV === 'production'
  ? '00:00:00'
  : moment().add(10, 'seconds').format('HH:mm:ss')

const [HISTORY_HOURS, HISTORY_MINUTES, HISTORY_SECONDS] = HISTORY_TRIGGER_TIME.split(':').map(Number)

function checkClock () {
  const now = new Date()

  if (now.getHours() !== HISTORY_HOURS || now.getMinutes() !== HISTORY_MINUTES || now.getSeconds() !== HISTORY_SECONDS) {
    return
  }

  store.dispatch(closeDay())
}

function checkForTodaysFirstUse () {
  const storesLastDay = store.getState().today
  if (storesLastDay && moment(storesLastDay).isBefore(moment(), 'day')) {
    store.dispatch(closeDay())
  }

  clock = setInterval(checkClock, 1000)
}
