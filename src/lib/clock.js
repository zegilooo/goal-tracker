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

function checkClock () {
  const now = new Date()
  console.log('checking', now)

  // Votre code ici
}

function checkForTodaysFirstUse () {
  // Votre code ici, puis :

  clock = setInterval(checkClock, 1000)
}
