// Utilisateur courant (reducer)
// =============================

// On se préoccupe de 2 actions…
import { LOGIN, LOGOUT } from '../action-creators'

// Par défaut, `currentUser` est `null`
export default function currentUser (state = null, action) {
  switch (action.type) {
    // Connexion
    // ---------
    case LOGIN:
      // En cas de login, pas de vérification ici.  On se contente
      // de retirer à l’objet action ses champs `type` et `password`
      // pour produire un objet `user` à utiliser comme nouvelle
      // valeur de l’état (c’est-à-dire de `currentUser`).
      //
      // En temps normal, on aurait ici une connexion au serveur, type
      // Ajax ou JSON-P, en tous les cas [asynchrone](http://redux.js.org/docs/advanced/AsyncActions.html),
      // et l’action renverrait par exemple une promesse, que le *store*
      // Redux pourrait attendre au moyen d’un *middleware* type
      // [`redux-thunk`](https://github.com/gaearon/redux-thunk) ou
      // [`redux-promise`](https://github.com/acdlite/redux-promise).
      // On peut aussi préférer recourir à une solution de type
      // [`redux-actions`](https://github.com/acdlite/redux-actions).
      return { email: action.email }

    // Déconnexion
    // -----------
    case LOGOUT:
      // Déconnexion = retour à `null`
      return null

    default:
      // Rappel : un *reducer* doit **toujours** renvoyer l’état
      // sans modification si l’action n’est pas applicable.
      return state
  }
}
