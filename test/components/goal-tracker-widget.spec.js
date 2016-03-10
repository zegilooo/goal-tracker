// Suivi du jour pour un objectif (spec)
// =====================================

import chai, { expect } from 'chai'
// [Enzyme](http://airbnb.io/enzyme/) est la super techno d’Airbnb pour tester
// à toute bombe des composants React.  Elle dispose même d’un plugin Chai pour
// avoir des assertions plus "métier".
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
// Le mode “shallow” d’Enzyme est adapté à tout test qui ne nécessite pas le
// DOM réel mais peut se contenter du DOM virtuel, ce qui inclue même les simulations
// d’événement.
import { shallow } from 'enzyme'
import sinon from 'sinon'

import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ContentAdd from 'material-ui/svg-icons/content/add'

import Gauge from '../../src/components/gauge'
import GoalTrackerWidget from '../../src/components/goal-tracker-widget'

// Mise en place du plugin Chai d’Enzyme
chai.use(chaiEnzyme())

// Classiquement, quand on décrit un composant React, on utilise sa balise JSX
// comme sujet de la description.  Celui-ci est censé…
describe('<GoalTrackerWidget />', () => {
  describe('when not completed', () => {
    // …produire le balisage attendu pour un objectif non atteint
    // ----------------------------------------------------------
    it('should render appropriately', () => {
      const goal = { id: 0, name: 'My goal', target: 42, units: 'wombats' }
      // On va tester trois valeurs pour le taux de complétion: les “bornes” 0 et 1,
      // d’une part, et une valeur quelconque, ici le 21 en plein milieu, d’autre part.
      const progresses = [0, 1, 21]
      progresses.forEach((progress) => {
        // Enrobage de test
        const wrapper = shallow(<GoalTrackerWidget goal={goal} progress={progress} />)

        // Vérification du contenu, ici grâce aux assertions métier fournies par le plugin
        // Chai d’Enzyme (`.text(…)`, `.contain(…)`).
        expect(wrapper.find('h2')).to.have.text(goal.name)
        expect(wrapper).to.contain(<Gauge value={progress} max={goal.target} />)
        expect(wrapper).to.contain.text(`${progress} ${goal.units} sur ${goal.target}`)
        expect(wrapper).to.contain(<ContentAdd />)
      })
    })

    // …déclencher correctement son `onProgress` au clic
    // -------------------------------------------------
    it('should trigger its onProgress on click', () => {
      const goal = { id: 0, name: 'My goal', target: 42, units: 'wombats' }
      const progress = 21
      // Pour vérifier que le *callback* transmis est bien appelé, rien de tel qu’un
      // *spy* fourni par [SinonJS](http://sinonjs.org/).
      const onProgress = sinon.spy()
      const wrapper = shallow(<GoalTrackerWidget goal={goal} progress={progress} onProgress={onProgress} />)

      // On simule le clic.  Merci Enzyme!
      wrapper.find('FloatingActionButton').simulate('click')
      // Et on vérifie.  On évite les `…onProgress).to.be.calledOnce` et `…)to.be.true`,
      // dont les fautes de frappe en fin de chaîne seraient ignorées silencieusement par
      // Chai (ça donnerait juste un `undefined` qui n'évaluerait donc aucune assertion).
      expect(onProgress.calledOnce).to.equal(true, 'onProgress was not called')
    })
  })

  describe('when completed (or exceeded)', () => {
    // …produire le balisage attendu pour un objectif atteint (voire dépassé)
    // ----------------------------------------------------------------------
    it('should render appropriately', () => {
      const goal = { id: 0, name: 'My goal', target: 42, units: 'wombats' }
      // On va tester deux valeurs de dépassement de l’objectif: la borne zéro
      // (objectif atteint, pile-poil) et plus grand (objectif dépassé).
      const extras = [0, 10]
      extras.forEach((extra) => {
        const wrapper = shallow(<GoalTrackerWidget goal={goal} progress={goal.target + extra} />)

        // Si on a atteint ou dépassé l'objectif, on n'est pas censé avoir l’icône d'ajout
        // qui trahirait un bouton de progression, mais on est censé avoir l’icône de pouce
        // vers le haut, qui traduit l’objectif (au moins) atteint.
        expect(wrapper).not.to.contain(<ContentAdd />)
        expect(wrapper).to.contain(<ActionThumbUp />)
      })
    })
  })
})
