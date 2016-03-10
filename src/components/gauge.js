// Jauge
// =====

// Réutilisé absolument partout dans l’application…  Un parfait
// exemple de composant réutilisable, du coup !

// On prend soin de n’importer que les quelques couleurs qui nous intéressent (le module
// en contient des centaines) pour favoriser le *tree shaking* en mode production.
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

// Comme toujours, on définit les propriétés attendues/autorisées pour validation.
Gauge.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number
}

// C’est ici qu’on calcule la couleur de la jauge d’après le rapport entre son
// propre taux d’achèvement et le moment de la journée.
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
