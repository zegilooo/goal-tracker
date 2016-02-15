import React, { Component } from 'react'

import LoginScreen from './login-screen'
import TrackerScreen from './tracker-screen'

import store, { loggedIn } from '../store'

export class HomeScreen extends Component {
  render () {
    const { goals, todaysProgress } = store
    return loggedIn() ? <TrackerScreen goals={goals} todaysProgress={todaysProgress} /> : <LoginScreen />
  }
}

export default HomeScreen
