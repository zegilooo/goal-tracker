import findIndex from 'lodash.findindex'
import reject from 'lodash.reject'

import { ADD_GOAL, REMOVE_GOAL, UPDATE_GOAL } from '../action-creators'

export default function goals (state = [], action) {
  switch (action.type) {
    case ADD_GOAL: {
      const { name, target, units } = action
      const id = Math.max(...state.map((goal) => goal.id), -1) + 1
      return [...state, { id, name, target, units }]
    }

    case REMOVE_GOAL:
      return reject(state, { id: action.id })

    case UPDATE_GOAL: {
      const { type, ...newGoal } = action
      const index = findIndex(state, { id: newGoal.id })
      if (index !== -1) {
        return state.map((goal) => goal.id === newGoal.id ? newGoal : goal)
      }

      return [...state, newGoal]
    }

    default:
      return state
  }
}
