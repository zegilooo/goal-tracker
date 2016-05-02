import { expect } from 'chai'

import { logIn, logOut } from '../../src/action-creators'
import reducer from '../../src/reducers/current-user'

describe('Current User reducer', () => {
  it('should return its initial state', () => {
    expect(reducer(undefined, {})).to.equal(null)
  })

  it('should handle login', () => {
    const [email, password] = ['john@example.com', 'no fate']
    expect(reducer(undefined, logIn(email, password))).to.deep.equal({ email })
  })

  it('should handle logout', () => {
    expect(reducer({ email: 'john@example.com' }, logOut())).to.equal(null)
  })
})
