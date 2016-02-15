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
  constructor () {
    super()
    this.state = { goal: {}, dialog: null }
  }

  @autobind
  addOrUpdateGoal ({ id, name, target, units }) {
    const { addGoal, updateGoal } = this.props
    if (id !== undefined) {
      updateGoal(id, name, target, units)
    } else {
      addGoal(name, target, units)
    }
    this.closeDialogs()
  }

  @autobind
  closeDialogs () {
    this.setState({ goal: {}, dialog: null })
  }

  componentWillReceiveProps ({ currentUser }) {
    if (currentUser == null) {
      history.push('/')
    }
  }

  @autobind
  deleteSelectedGoal () {
    this.props.removeGoal(this.state.goal.id)
    this.closeDialogs()
  }

  @autobind
  openGoalAdder () {
    this.setState({ goal: {}, dialog: 'add-or-update' })
  }

  openGoalDeleter (goal) {
    this.setState({ goal, dialog: 'delete' })
  }

  openGoalEditor (goal) {
    this.setState({ goal, dialog: 'add-or-update' })
  }

  render () {
    const { currentUser, goals, logOut } = this.props
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
              <List>
                <ListItem
                  primaryText='Vous êtes connecté-e en tant que'
                  secondaryText={(currentUser || {}).email}
                  rightIconButton={logoutButton}
                />
              </List>
              <Divider />
              <List>
                <Subheader>Mes objectifs</Subheader>
                {goals.map((goal) =>
                  <GoalSetting key={goal.id} goal={goal}
                    onDeleteClick={() => this.openGoalDeleter(goal)}
                    onEditClick={() => this.openGoalEditor(goal)}
                  />
                )}
                {goals.length === 0 &&
                  <ListItem secondaryText='Aucun objectif pour le moment' />
                }
              </List>
            </CardText>
            <CardActions>
              <RaisedButton label='Ajouter un objectif' primary
                icon={<ContentAdd />} onClick={this.openGoalAdder}
              />
            </CardActions>
          </Card>
          <AddSettingDialog
            goal={this.state.goal}
            open={this.state.dialog === 'add-or-update'}
            onCancel={this.closeDialogs}
            onAdd={this.addOrUpdateGoal}
          />
          <DeleteSettingDialog
            goal={this.state.goal}
            open={this.state.dialog === 'delete'}
            onCancel={this.closeDialogs}
            onDelete={this.deleteSelectedGoal}
          />
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
