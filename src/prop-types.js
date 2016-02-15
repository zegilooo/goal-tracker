import { PropTypes } from 'react'

export const GoalPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  target: PropTypes.number.isRequired,
  units: PropTypes.string.isRequired
})

export const HistoryDayStatsPropType = PropTypes.shape({
  date: PropTypes.string.isRequired,
  progresses: PropTypes.objectOf(PropTypes.arrayOf(
    PropTypes.number
  )).isRequired
})
