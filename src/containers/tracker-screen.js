import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import { Link } from 'react-router'
import React, { Component } from 'react'

import '../styles/tracker-screen.styl'

import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card'
import HistoryIcon from 'material-ui/svg-icons/action/history'
import RaisedButton from 'material-ui/RaisedButton'
import SettingsIcon from 'material-ui/svg-icons/action/settings'

import { formatDate, getDayCounts } from '../lib/helpers'
import Gauge from '../components/gauge'
import GoalTrackerWidget from '../components/goal-tracker-widget'
import { progressOnGoal } from '../action-creators'

export class TrackerScreen extends Component {
  overallProgress () {
    const { todaysProgress, goals } = this.props
    const [totalProgress, totalTarget] = getDayCounts(todaysProgress, goals)

    return totalTarget === 0 ? 0 : Math.floor(totalProgress * 100 / totalTarget)
  }

  render () {
    const { goals, today, todaysProgress, dispatch } = this.props
    return (
      <DocumentTitle title='Mes objectifs du jour'>
        <Card className='goalTracker'>
          <CardTitle
            title={formatDate(today, 'LL')}
            subtitle={<Gauge value={this.overallProgress()} />}
          />
          <CardText>
            <table>
              <tbody>
                {
                  goals.map((goal) => {
                    const progress = todaysProgress[goal.id] || 0
                    return (
                      <GoalTrackerWidget
                        key={goal.id}
                        goal={goal}
                        progress={progress}
                        onProgress={() => dispatch(progressOnGoal(goal.id))}
                      />
                    )
                  })
                }
              </tbody>
            </table>
          </CardText>
          <CardActions>
            <RaisedButton label='Historique' secondary
              icon={<HistoryIcon />} linkButton containerElement={<Link to='/history' />}
            />
            <RaisedButton label='Paramètres'
              icon={<SettingsIcon />} linkButton containerElement={<Link to='/settings' />}
            />
          </CardActions>
        </Card>
      </DocumentTitle>
    )
  }
}

const mapStateToPops = ({ goals, today, todaysProgress }) => ({ goals, today, todaysProgress })

export default connect(mapStateToPops)(TrackerScreen)
