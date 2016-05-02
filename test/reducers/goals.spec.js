import { expect } from 'chai'

import { addGoal, removeGoal, updateGoal } from '../../src/action-creators'
import reducer from '../../src/reducers/goals'

describe('Goals reducer', () => {
  it('should return its initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal([])
  })

  it('should handle goal addition', () => {
    const [name, target, units] = ['Test reducers', 42, 'tests']
    const goals = reducer(undefined, addGoal(name, target, units))

    // Is it in?
    expect(goals).to.have.length(1)
    // Does it have the proper structure?
    expect(goals[0]).to.have.property('name', name)
    expect(goals[0]).to.have.property('target', target)
    expect(goals[0]).to.have.property('units', units)
    expect(goals[0]).to.have.property('id').which.is.a('number')

    // Does further addition maintain existing items?
    const nextGoals = reducer(goals, addGoal(name, target, units))

    expect(nextGoals).to.have.length(2)
    expect(nextGoals[0]).to.deep.equal(goals[0])

    // Does it guarantee unique IDs?
    expect(nextGoals[1]).to.have.property('id').which.is.a('number')
    expect(nextGoals[1].id).not.to.equal(goals[0].id)
  })

  it('should handle goal removal', () => {
    const initialState = [
      { id: 0, name: 'Test reducer 1', target: 10, units: 'tests' },
      { id: 1, name: 'Test reducer 2', target: 5, units: 'tests' },
      { id: 2, name: 'Test reducer 3', target: 15, units: 'tests' }
    ]

    const expectedState = [...initialState]
    expectedState.splice(1, 1)

    // Does removing a contained entry work?
    expect(reducer(initialState, removeGoal(1))).to.deep.equal(expectedState)

    // Does removing a missing entry maintain the list?
    expect(reducer(initialState, removeGoal(42))).to.deep.equal(initialState)
  })

  it('should handle goal update (when in goals)', () => {
    const initialState = [
      { id: 0, name: 'Test reducer 1', target: 10, units: 'tests' },
      { id: 1, name: 'Test reducer 2', target: 5, units: 'tests' }
    ]

    const [id, name, target, units] = [1, 'Test reducer 3', 15, 'checks']
    const expectedState = [...initialState]
    expectedState.splice(1, 1, { id, name, target, units })

    expect(reducer(initialState, updateGoal(id, name, target, units)))
      .to.deep.equal(expectedState)
  })

  it('should handle goal update (when not in goals)', () => {
    const initialState = [
      { id: 0, name: 'Test reducer 1', target: 10, units: 'tests' },
      { id: 1, name: 'Test reducer 2', target: 5, units: 'tests' }
    ]

    const [id, name, target, units] = [42, 'Test reducer 3', 15, 'checks']
    const expectedState = [...initialState, { id, name, target, units }]

    expect(reducer(initialState, updateGoal(id, name, target, units)))
      .to.deep.equal(expectedState)
  })
})
