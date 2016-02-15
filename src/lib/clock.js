import moment from 'moment'

import clockIcon from '../icons/clock-reset.png'
import { closeDay } from '../action-creators'
import store from '../store'

let clock = null
let permissionGranted = false

checkForPermissions()
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

  closePreviousDay()
}

function checkForPermissions () {
  if (typeof window === 'undefined' || !window.Notification) {
    return
  }

  permissionGranted = window.Notification.permission === 'granted'
  if (!permissionGranted) {
    window.Notification.requestPermission((status) => {
      permissionGranted = status === 'granted'
    })
  }
}

function checkForTodaysFirstUse () {
  const storesLastDay = store.getState().today
  if (storesLastDay && moment(storesLastDay).isBefore(moment(), 'day')) {
    closePreviousDay()
  }

  clock = setInterval(checkClock, 1000)
}

function closePreviousDay () {
  store.dispatch(closeDay())

  if (permissionGranted) {
    notify({
      title: 'Fin de journée !',
      text: 'Vos objectifs ont été historisés et repartent à zéro.',
      icon: clockIcon,
      secondsVisible: 4
    })
  }
}

function notify ({ title, text, icon, secondsVisible = 0 }) {
  const notif = new window.Notification(title, { body: text, tag: 'goal-tracker', icon })
  if (secondsVisible > 0) {
    notif.addEventListener('show', () => {
      setTimeout(() => notif.close(), secondsVisible * 1000)
    })
  }
}
