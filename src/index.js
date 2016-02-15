import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React from 'react'
import { render } from 'react-dom'

import HomeScreen from './containers/home-screen'

render(
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <HomeScreen />
  </MuiThemeProvider>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
