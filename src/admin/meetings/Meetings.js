import React, { useEffect, useReducer } from 'react'
import { Route, Switch } from 'react-router-dom'
import useAxios from 'axios-hooks'
import MeetingsTable from './MeetingsTable'
import CreateMeeting from './CreateMeeting'
import EditMeeting from './EditMeeting'
import Participation from './Participation'
import meetingReducer from './meetingReducer'

const Meetings = () => {
  const [meetings, dispatch] = useReducer(meetingReducer, [])
  const [{ data, loading, error }] = useAxios({
    url: '/meeting-table/'
  })

  useEffect(() => { dispatch({ type: 'LOAD', meetings: data }) }, [data])

  if (loading) return <p data-testid='loading'>Loading...</p>
  if (error) return <p data-testid='error'>Error!</p>

  return (
    <Switch>
      <Route path='/admin/meetings/:key/participation' render={props => <Participation {...props} />} />
      <Route
        path='/admin/meetings/:key/edit'
        render={props => <EditMeeting {...props} updateMeetings={(meeting, index) => dispatch({ type: 'UPDATE', meeting, index })} />}
      />
      <Route
        path='/admin/meetings/create'
        render={props => <CreateMeeting {...props} addMeeting={meeting => dispatch({ type: 'ADD', meeting })} />}
      />
      <Route
        path='/admin/meetings'
        render={props => <MeetingsTable {...props} meetings={meetings} removeMeeting={meeting => dispatch({ type: 'REMOVE', meeting })} />}
      />
    </Switch>
  )
}

export default Meetings
