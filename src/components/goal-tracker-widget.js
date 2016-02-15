import React, { PropTypes } from 'react'

import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ContentAdd from 'material-ui/svg-icons/content/add'
import FloatingActionButton from 'material-ui/FloatingActionButton'

import Gauge from './gauge'
import { GoalPropType } from '../prop-types'

const GoalTrackerWidget = ({ goal: { name, units, target }, progress, onProgress }) => {
  const adderComponent = target > progress
    ? <FloatingActionButton mini secondary onClick={onProgress}><ContentAdd /></FloatingActionButton>
    : <FloatingActionButton mini disabled><ActionThumbUp /></FloatingActionButton>

  return (
    <tr>
      <td>
        <h2>{name}</h2>
        <Gauge value={progress} max={target} />
        <small>{progress} {units} sur {target}</small>
      </td>
      <td>{adderComponent}</td>
    </tr>
  )
}

GoalTrackerWidget.propTypes = {
  goal: GoalPropType.isRequired,
  progress: PropTypes.number.isRequired,
  onProgress: PropTypes.func
}

export default GoalTrackerWidget
