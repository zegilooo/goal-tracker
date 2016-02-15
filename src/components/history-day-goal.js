import React, { PropTypes } from 'react'

import { ListItem } from 'material-ui/List'

import Gauge from './gauge'
import { GoalPropType } from '../prop-types'

const HistoryDayGoal = ({ goal: { name, units }, stats: [progress, target] }) => {
  const details = (
    <div>
      <Gauge value={progress} max={target}/>
      {progress} {units} sur {target}
    </div>
  )

  return (
    <ListItem
      primaryText={name}
      secondaryText={details}
      secondaryTextLines={2}
      disabled
    />
  )
}

HistoryDayGoal.propTypes = {
  goal: GoalPropType.isRequired,
  stats: PropTypes.arrayOf(PropTypes.number)
}

export default HistoryDayGoal
