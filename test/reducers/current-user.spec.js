// Utilisateur courant (spec reducer)
// ==================================

import { expect } from 'chai'

import { logIn, logOut } from '../../src/action-creators'
import reducer from '../../src/reducers/current-user'

// Le *reducer* est censé…
describe('Current User reducer', () => {
  // …fournir son état par défaut
  // ----------------------------
  it('should return its initial state', () => {
    // On teste toujours que l’état par défaut est bien fourni.  Le plus simple consiste
    // à envoyer un état `undefined` et une action vide, et à vérifier le résultat (ici,
    // `null`).
    expect(reducer(undefined, {})).to.equal(null)
  })

  // …gérer la connexion
  // -------------------
  it('should handle login', () => {
    // Toujours pareil :
    //
    // 1) On définit les constituants de l'action
    const [email, password] = ['john@example.com', 'no fate']
    // 2) On appelle le *reducer* avec un état préalable approprié (ici, `undefined`
    // ira très bien) et l'action **créée par le creator** (ce qui fait une sorte de
    // test combiné du *action creator*).  Et on vérifie le segment d'état obtenu
    // en retour.
    expect(reducer(undefined, logIn(email, password))).to.deep.equal({ email })
  })

  // …gérer la déconnexion
  // ---------------------
  it('should handle logout', () => {
    // On prend un état opposé (connecté) et on vérifit le résultat, donc `null`.
    expect(reducer({ email: 'john@example.com' }, logOut())).to.equal(null)
  })

  // Remarquez qu'on pourrait aussi, par acquis de conscience, tester que pour toute
  // action non gérée, l'état est préservé.  À vous de jouer?
})
