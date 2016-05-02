import { LOGIN, LOGOUT } from '../action-creators'

export default function currentUser (state = null, action) {
  switch (action.type) {
    case LOGIN:
      return { email: action.email }
    case LOGOUT:
      return null
    default:
      return state
  }
}
