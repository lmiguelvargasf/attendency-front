import React, { useEffect, useReducer } from 'react'
import { Route, Switch } from 'react-router-dom'
import useAxios from 'axios-hooks'
import MeetingsTable from './MeetingsTable'
import CreateMeeting from './CreateMeeting'
import EditMeeting from './EditMeeting'
import Participation from './Participation'

const meetingReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD':
      return action.meetings
    case 'REMOVE':
      return state.filter(meeting => meeting.key !== action.meeting.key)
    case 'ADD':
      return [action.meeting, ...state]
    case 'UPDATE':
      state[action.index] = action.meeting
      return state
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const Meetings = () => {
  const [meetings, dispatch] = useReducer(meetingReducer, [])
  const [{ data, loading, error }] = useAxios(
    `${process.env.REACT_APP_API_URL}/meeting-table/`
  )

  useEffect(() => { dispatch({ type: 'LOAD', meetings: data }) }, [data])

  const removeMeeting = meeting => {
    dispatch({ type: 'REMOVE', meeting })
  }
  const addMeeting = meeting => {
    dispatch({ type: 'ADD', meeting })
  }
  const updateMeetings = (meeting, index) => {
    dispatch({ type: 'UPDATE', meeting, index })
  }

  if (loading) return <p data-testid='loading'>Loading...</p>
  if (error) return <p data-testid='error'>Error!</p>

  return (
    <Switch>
      <Route path='/admin/meetings/:key/participation' render={props => <Participation {...props} />} />
      <Route path='/admin/meetings/:key/edit' render={props => <EditMeeting {...props} updateMeetings={updateMeetings} />} />
      <Route path='/admin/meetings/create' render={props => <CreateMeeting {...props} addMeeting={addMeeting} />} />
      <Route path='/admin/meetings' render={props => <MeetingsTable {...props} meetings={meetings} removeMeeting={removeMeeting} />} />
    </Switch>
  )
}

export default Meetings
