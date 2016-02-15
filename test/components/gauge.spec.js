import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import { shallow } from 'enzyme'

import Gauge from '../../src/components/gauge'

chai.use(chaiEnzyme())

describe('<Gauge />', () => {
  it('should render appropriately', () => {
    const wrapper = shallow(<Gauge value={50} />)

    expect(wrapper).to.have.prop('mode', 'determinate')
    expect(wrapper).to.have.prop('max', 100)
    expect(wrapper).to.have.prop('value', 50)
    expect(wrapper.prop('style')).to.deep.equal({ height: 8 })
  })

  it('should honor custom max', () => {
    const wrapper = shallow(<Gauge value={50} max={75} />)

    expect(wrapper).to.have.prop('max', 75)
  })
})
