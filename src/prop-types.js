// Types complexes de propriétés React
// ===================================

// Les composants React peuvent déclarer
// [le type et la structure des propriétés](http://facebook.github.io/react/docs/reusable-components.html)
// qui leur sont passées,
// pour bénéficier d’une aide à la validation affichée
// généralement sous forme d’erreurs dans la console du
// navigateur.
//
// Outre les types prédéfinis, il est possible de déclarer
// des types complexes, avec des objets, des tableaux, etc.
// Lorsqu'ils sont répétés à travers le code, autant les
// centraliser, comme ici.

import { PropTypes } from 'react'

// Description d’un objectif, utilisé dans de nombreux composants.
export const GoalPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  target: PropTypes.number.isRequired,
  units: PropTypes.string.isRequired
})

// Description d’un jour de stats dans l’historique.
export const HistoryDayStatsPropType = PropTypes.shape({
  date: PropTypes.string.isRequired,
  progresses: PropTypes.objectOf(PropTypes.arrayOf(
    PropTypes.number
  )).isRequired
})
