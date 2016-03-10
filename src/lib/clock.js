// Réinitialisation quotidienne
// ============================

// Les progrès du jour sont réinitialisés tous les soirs à minuit,
// après avoir été ajoutés à l’historique.  Par ailleurs, lorsque
// l’application se  lance, si la journée “en cours” dans l’état
// global est désormais passée, une historisation est immédiatement
// déclenchée.
//
// C’est en fait le *reducer* consolidé qui fait tout le boulot
// côté données : ce module est surtout charger de déclencher
// (`store.dispatch(…)`) la bonne action (`CLOSE_DAY`) au bon
// moment, et de notifier l’utilisateur.

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
// Activation du vérificateur de rappels à des moments précis de la journée
const reminder = setInterval(checkReminder, 1000)

// 1. On vérifie si on a la permission d’afficher des notifications
//    système (et sinon, on la (re)demande).
checkForPermissions()
// 2. On vérifie si on n’a pas déjà les progrès d’une journée désormais
//    passée dans l’état global, auquel cas il faut commencer par
//    l’historiser.
checkForTodaysFirstUse()

if (module.hot) {
  module.hot.accept()
  // Le HMR sur ce module doit prendre soin d’annuler l’intervalle de
  // vérification en vigueur, puisque l’initialisation de la nouvelle
  // version du module va en ré-inscrire un tout de suite.
  module.hot.dispose(() => {
    clearInterval(clock)
    clearInterval(reminder)
  })
}

// En production, on réinitialise à minuit.
// En développement, 10 secondes après le chargement, c’est plus
// pratique pour les tests interactifs…
const HISTORY_TRIGGER_TIME = process.env.NODE_ENV === 'production'
  ? '00:00:00'
  : moment().add(10, 'seconds').format('HH:mm:ss')

const [HISTORY_HOURS, HISTORY_MINUTES, HISTORY_SECONDS] = HISTORY_TRIGGER_TIME.split(':').map(Number)

// Vérification de l’échéance
// --------------------------

// Quand la webapp est ouverte, on vérifie chaque seconde si on a atteint
// l’échéance de réinitialisation.  Si tel est le cas, on cloture.
function checkClock () {
  const now = new Date()

  if (now.getHours() !== HISTORY_HOURS || now.getMinutes() !== HISTORY_MINUTES || now.getSeconds() !== HISTORY_SECONDS) {
    return
  }

  closePreviousDay()
}

// Permission de notifier
// ----------------------

// Le recours aux [notifications](https://developer.mozilla.org/fr/docs/Web/API/notification/Using_Web_Notifications)
// “système” n’est pas automatiquement
// possible : l’utilisateur doit nous l’avoir accordé.  Au démarrage
// de la webapp, quand ce module est initialisé, on vérifie si on
// la permission, et si tel n’est pas le cas, on la redemande. Le
// résultat est stocké comme booléen dans `permissionGranted`.
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

// Historisation au démarrage
// --------------------------

// Au démarrage de la webapp, quand ce module est initialisé, on
// vérifie si la journée “en cours” de l’état central n’est pas
// passée, ce qui veut dire que la webapp n’était pas ouverte à
// minuit cette journée-là, et que l’historisation reste à faire;
// On la déclenche donc.
function checkForTodaysFirstUse () {
  const storesLastDay = store.getState().today
  if (storesLastDay && moment(storesLastDay).isBefore(moment(), 'day')) {
    closePreviousDay()
  }

  clock = setInterval(checkClock, 1000)
}

// Rappels à des moments précis
// ----------------------------
//
// À des heures précises (12h, 18h, 21h, 23h) l’appli fait le point sur
// la progression générale et, le cas échéant, affichera un rappel si on
// est plus ou moins à la bourre.
//
// En développement, on fait ça 5 secondes après le chargement.
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

// Fonctions utilitaires
// ---------------------

// Déclenchement de l’historisation auprès du *store* central,
// et notification si on en a le droit.
function closePreviousDay () {
  store.dispatch(closeDay())

  if (permissionGranted) {
    notify({
      title: 'Fin de journée !',
      text: 'Vos objectifs ont été historisés et repartent à zéro.',
      // Remarquez qu’ici `clockIcon` est en fait une URL, obtenue
      // via l’`import` grâce aux
      // [`url-loader`](https://github.com/webpack/url-loader) et
      // [`file-loader`](https://github.com/webpack/file-loader) de
      // Webpack.  Si le PNG correspondant faisait moins de 10Ko,
      // il aurait même était injecté sous forme base64 plutôt que
      // comme un fichier distinct, économisant une requête HTTP.
      icon: clockIcon,
      secondsVisible: 4
    })
  }
}

// Notification générique avec fermeture automatique.
function notify ({ title, text, icon, secondsVisible = 0 }) {
  const notif = new window.Notification(title, { body: text, tag: 'goal-tracker', icon })
  if (secondsVisible > 0) {
    notif.addEventListener('show', () => {
      setTimeout(() => notif.close(), secondsVisible * 1000)
    })
  }
}

// Notification de retard à contenu variable.
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
