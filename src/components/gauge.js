import { amber500, green500, orange500, red500 } from 'material-ui/styles/colors'
import React, { PropTypes } from 'react'

import LinearProgress from 'material-ui/LinearProgress'

import { getCompletionRatio } from '../lib/helpers'

const Gauge = ({ value, max = 100 }) => (
  <LinearProgress
    mode='determinate'
    value={value}
    max={max}
    style={{ height: 8 }}
    color={gaugeColor(value, max)}
  />
)
Gauge.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number
}

function gaugeColor (current, target) {
  const ratio = getCompletionRatio(current, target)

  if (ratio < 0.5) {
    return red500
  }
  if (ratio < 0.75) {
    return orange500
  }
  return ratio < 0.9 ? amber500 : green500
}

export default Gauge
