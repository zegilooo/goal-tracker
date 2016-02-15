import React, { Component } from 'react'

import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward'
import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import '../styles/login-screen.styl'

export class LoginScreen extends Component {
  render () {
    return (
      <form>
        <Card className='loginScreen'>
          <CardTitle title='Goal Tracker' subtitle='Connexion' />
          <CardText>
            <TextField
              type='email'
              hintText='mon@email.tld'
              floatingLabelText='E-mail'
              autoFocus
              required
            /><br />
            <TextField
              type='password'
              hintText='super mot de passe'
              floatingLabelText='Mot de passe'
              required
            />
          </CardText>
          <CardActions style={{ textAlign: 'center' }}>
            <RaisedButton label='Connecte-toi' labelPosition='before' primary
              icon={<ArrowForward />} type='submit'
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

export default LoginScreen
