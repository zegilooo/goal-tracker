import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import React, { Component } from 'react'

import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward'
import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import TextField from 'material-ui/TextField'

import { logIn } from '../action-creators'

import '../styles/login-screen.styl'

export class LoginScreen extends Component {
  @autobind
  login (event) {
    event.preventDefault()
    this.props.dispatch(logIn(this.userEmail, this.password))
  }

  render () {
    const { loginState } = this.props
    const loggingIn = loginState === 'pending'
    const logInIcon = loggingIn ? <CircularProgress size={0.4} /> : <ArrowForward />
    const snackBar = loginState === 'failure'
      ? <Snackbar
        open
        message='Identifiant ou mot de passe invalide'
        autoHideDuration={2000}
        />
      : ''
    return (
      <DocumentTitle title='Identifiez-vous'>
        <form onSubmit={this.login}>
          <Card className='loginScreen'>
            <CardTitle title='Goal Tracker' subtitle='Connexion' />
            <CardText>
              <TextField
                type='email'
                onChange={(event) => { this.userEmail = event.target.value }}
                hintText='mon@email.tld'
                floatingLabelText='E-mail'
                autoFocus
                required
              /><br />
              <TextField
                type='password'
                onChange={(event) => { this.password = event.target.value }}
                hintText='super mot de passe'
                floatingLabelText='Mot de passe'
                required
              />
            </CardText>
            <CardActions style={{ textAlign: 'center' }}>
              <RaisedButton label='Connecte-toi' labelPosition='before' primary
                icon={logInIcon} type='submit' disabled={loggingIn}
              />
            </CardActions>
          </Card>
          {snackBar}
        </form>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = ({ currentUser: { loginState } }) => ({ loginState })

export default connect(mapStateToProps)(LoginScreen)
