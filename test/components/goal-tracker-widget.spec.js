import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ContentAdd from 'material-ui/svg-icons/content/add'

import Gauge from '../../src/components/gauge'
import GoalTrackerWidget from '../../src/components/goal-tracker-widget'

chai.use(chaiEnzyme())

describe('<GoalTrackerWidget />', () => {
  describe('when not completed', () => {
    it('should render appropriately')

    it('should trigger its onProgress on click')
  })

  describe('when completed (or exceeeded)', () => {
    it('should render appropriately')
  })

  // Votre code de test en fonctions fléchées de rappel sur ces `it`…
})
