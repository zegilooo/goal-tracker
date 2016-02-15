import autobind from 'autobind-decorator'
import { bindActionCreators } from 'redux'
import { browserHistory as history, Link } from 'react-router'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import React, { Component } from 'react'

import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import { List, ListItem } from 'material-ui/List'
import Logout from 'material-ui/svg-icons/action/exit-to-app'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'

import * as actionCreators from '../action-creators'
import AddSettingDialog from '../components/add-setting-dialog'
import DeleteSettingDialog from '../components/delete-setting-dialog'
import GoalSetting from '../components/goal-setting'

class SettingsScreen extends Component {
  render () {
    const { goals, logOut } = this.props
    const logoutButton = (
      <IconButton onClick={logOut}>
        <Logout />
      </IconButton>
    )

    return (
      <DocumentTitle title='Mes paramètres'>
        <div>
          <FlatButton label='Retour' linkButton
            icon={<ArrowBack />} containerElement={<Link to='/' />}
          />
          <Card className='settings'>
            <CardTitle title='Paramètres' />
            <CardText>
              <p>Coming soon: current user</p>
              <Divider />
              <List>
                <Subheader>Mes objectifs</Subheader>
                {goals.map((goal) =>
                  <GoalSetting key={goal.id} goal={goal}
                  />
                )}
                {goals.length === 0 &&
                  <ListItem secondaryText='Aucun objectif pour le moment' />
                }
              </List>
            </CardText>
            <CardActions>
              <RaisedButton label='Ajouter un objectif' primary
                icon={<ContentAdd />}
              />
            </CardActions>
          </Card>
        </div>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = ({ goals, currentUser }) => ({ goals, currentUser })
const mapDispatchToProps = (dispatch) => {
  const { addGoal, removeGoal, updateGoal, logOut } = actionCreators
  return bindActionCreators({ addGoal, removeGoal, updateGoal, logOut }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
