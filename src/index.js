import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory as history } from 'react-router'

import App from './components/app'
import HistoryScreen from './containers/history-screen'
import HomeScreen from './containers/home-screen'
import SettingsScreen from './containers/settings-screen'
import store, { loggedIn } from './store'

function requireAuth (nextState, replaceState) {
  if (!loggedIn()) {
    replaceState({}, '/')
  }
}

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <HomeScreen />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
