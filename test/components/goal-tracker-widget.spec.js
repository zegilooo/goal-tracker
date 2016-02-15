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
    it('should render appropriately', () => {
      const goal = { id: 0, name: 'My goal', target: 42, units: 'wombats' }
      const progresses = [0, 1, 21]
      progresses.forEach((progress) => {
        const wrapper = shallow(<GoalTrackerWidget goal={goal} progress={progress} />)

        expect(wrapper.find('h2')).to.have.text(goal.name)
        expect(wrapper).to.contain(<Gauge value={progress} max={goal.target} />)
        expect(wrapper).to.contain.text(`${progress} ${goal.units} sur ${goal.target}`)
        expect(wrapper).to.contain(<ContentAdd />)
      })
    })

    it('should trigger its onProgress on click', () => {
      const goal = { id: 0, name: 'My goal', target: 42, units: 'wombats' }
      const progress = 21
      const onProgress = sinon.spy()
      const wrapper = shallow(<GoalTrackerWidget goal={goal} progress={progress} onProgress={onProgress} />)

      wrapper.find('FloatingActionButton').simulate('click')
      expect(onProgress.calledOnce).to.equal(true, 'onProgress was not called')
    })
  })

  describe('when completed (or exceeded)', () => {
    it('should render appropriately', () => {
      const goal = { id: 0, name: 'My goal', target: 42, units: 'wombats' }
      const extras = [0, 10]
      extras.forEach((extra) => {
        const wrapper = shallow(<GoalTrackerWidget goal={goal} progress={goal.target + extra} />)

        expect(wrapper).not.to.contain(<ContentAdd />)
        expect(wrapper).to.contain(<ActionThumbUp />)
      })
    })
  })
})
