// Objectifs (spec reducer)
// ========================

import { expect } from 'chai'

import { addGoal, removeGoal, updateGoal } from '../../src/action-creators'
import reducer from '../../src/reducers/goals'

// Le *reducer* est censé…
describe('Goals reducer', () => {
  // …fournir son état par défaut
  // ----------------------------
  it('should return its initial state', () => {
    // On teste toujours que l’état par défaut est bien fourni.  Le plus simple consiste
    // à envoyer un état `undefined` et une action vide, et à vérifier le résultat (ici
    // un tableau vide, donc `[]`).
    expect(reducer(undefined, {})).to.deep.equal([])
  })

  // …gérer l’ajout d’objectif
  // -------------------------
  it('should handle goal addition', () => {
    // Primo, vérifier l'ajout initial (premier élément)
    const [name, target, units] = ['Test reducers', 42, 'tests']
    const goals = reducer(undefined, addGoal(name, target, units))

    // Est-il bien là ?
    expect(goals).to.have.length(1)
    // A-t-il une bonne tête ?
    expect(goals[0]).to.have.property('name', name)
    expect(goals[0]).to.have.property('target', target)
    expect(goals[0]).to.have.property('units', units)
    expect(goals[0]).to.have.property('id').which.is.a('number')

    // Un ajout supplémentaire préserve-t-il les objectifs existants ?
    const nextGoals = reducer(goals, addGoal(name, target, units))

    expect(nextGoals).to.have.length(2)
    expect(nextGoals[0]).to.deep.equal(goals[0])

    // Les IDs produits sont-ils alors bien uniques ?
    expect(nextGoals[1]).to.have.property('id').which.is.a('number')
    expect(nextGoals[1].id).not.to.equal(goals[0].id)
  })

  // …gérer le retrait d’objectif
  // ----------------------------
  it('should handle goal removal', () => {
    // On part d’un état initial d’au moins 3, pour bien vérifier le
    // comportement de retrait.
    const initialState = [
      { id: 0, name: 'Test reducer 1', target: 10, units: 'tests' },
      { id: 1, name: 'Test reducer 2', target: 5, units: 'tests' },
      { id: 2, name: 'Test reducer 3', target: 15, units: 'tests' }
    ]

    // L’état attendu est cloné d'abord, puis on retire l'élément central.
    const expectedState = [...initialState]
    expectedState.splice(1, 1)

    // Le retrait d’un objectif présent marche-t-il bien ?
    expect(reducer(initialState, removeGoal(1))).to.deep.equal(expectedState)

    // Le retrait d’un objectif manquant préserve-t-il bien l'état ?
    expect(reducer(initialState, removeGoal(42))).to.deep.equal(initialState)
  })

  // …gérer la mise à jour d’un objectif présent
  // -------------------------------------------
  it('should handle goal update (when in goals)', () => {
    // On part d’un état initial d’au moins 2, pour bien vérifier qu’on ne
    // touche pas au reste.
    const initialState = [
      { id: 0, name: 'Test reducer 1', target: 10, units: 'tests' },
      { id: 1, name: 'Test reducer 2', target: 5, units: 'tests' }
    ]

    // État attendu distinct de l'original, évidemment.
    const [id, name, target, units] = [1, 'Test reducer 3', 15, 'checks']
    const expectedState = [...initialState]
    expectedState.splice(1, 1, { id, name, target, units })

    // Simple comparaison de tableaux.
    expect(reducer(initialState, updateGoal(id, name, target, units)))
      .to.deep.equal(expectedState)
  })

  // …gérer la mise à jour d’un objectif manquant
  // --------------------------------------------
  it('should handle goal update (when not in goals)', () => {
    const initialState = [
      { id: 0, name: 'Test reducer 1', target: 10, units: 'tests' },
      { id: 1, name: 'Test reducer 2', target: 5, units: 'tests' }
    ]

    const [id, name, target, units] = [42, 'Test reducer 3', 15, 'checks']
    // La mise à jour d'un élément manquant est à traiter comme un ajout en fin de
    // liste, par souci de robustesse.
    const expectedState = [...initialState, { id, name, target, units }]

    expect(reducer(initialState, updateGoal(id, name, target, units)))
      .to.deep.equal(expectedState)
  })
})
