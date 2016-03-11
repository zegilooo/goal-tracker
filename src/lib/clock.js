import moment from 'moment'

import clockIcon from '../icons/clock-reset.png'
import { closeDay } from '../action-creators'
import { getCompletionRatio, getDayCounts } from '../lib/helpers'
import lateIcon from '../icons/reminder-late.png'
import okayishIcon from '../icons/reminder-okayish.png'
import superLateIcon from '../icons/reminder-super-late.png'
import store from '../store'

let clock = null
let permissionGranted = false
const reminder = setInterval(checkReminder, 1000)

checkForPermissions()
checkForTodaysFirstUse()

if (module.hot) {
  module.hot.accept()
  module.hot.dispose(() => {
    clearInterval(clock)
    clearInterval(reminder)
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

const REMINDER_TIMES = process.env.NODE_ENV === 'production'
  ? [12, 18, 21, 23].map((hour) => [hour, 0, 0])
  : [moment().add(5, 'seconds').format('HH:mm:ss').split(':').map(Number)]

function checkReminder () {
  if (!permissionGranted) {
    return
  }

  const now = new Date()
  if (REMINDER_TIMES.some(([hour, min, sec]) => hour === now.getHours() && min === now.getMinutes() && sec === now.getSeconds())) {
    notifyReminder()
  }
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

function notifyReminder () {
  const state = store.getState()
  const [totalProgress, totalTarget] = getDayCounts(state.todaysProgress, state.goals)
  const ratio = getCompletionRatio(totalProgress, totalTarget)

  let [title, icon] = []
  if (ratio < 0.5) {
    [title, icon] = ['Tu es super à la bourre !', superLateIcon]
  } else if (ratio < 0.75) {
    [title, icon] = ['Tu es à la bourre…', lateIcon]
  } else if (ratio < 0.9) {
    [title, icon] = ['Tu es un peu à la bourre…', okayishIcon]
  }
  if (title != null) {
    notify({
      title,
      text: `Il te reste ${totalTarget - totalProgress} tâches (sur ${totalTarget}) à accomplir aujourd’hui.`,
      icon,
      secondsVisible: 8
    })
  }
}
