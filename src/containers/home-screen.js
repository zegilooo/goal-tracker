import { connect } from 'react-redux'
import React, { Component } from 'react'

import { loggedIn } from '../store'
import LoginScreen from './login-screen'
import TrackerScreen from './tracker-screen'

export class HomeScreen extends Component {
  render () {
    return loggedIn() ? <TrackerScreen /> : <LoginScreen />
  }
}

const mapStateToProps = ({ currentUser }) => ({ currentUser })

export default connect(mapStateToProps)(HomeScreen)
