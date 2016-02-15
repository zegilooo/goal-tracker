import { PropTypes } from 'react'

export const GoalPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  target: PropTypes.number.isRequired,
  units: PropTypes.string.isRequired
})
