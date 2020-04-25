import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import useAxios from 'axios-hooks'
import MeetingsTable from './MeetingsTable'
import CreateMeeting from './CreateMeeting'

const Meetings = () => {
  const [meetings, setMeetings] = useState([])
  const [{ data, loading, error }] = useAxios(
    `${process.env.REACT_APP_API_URL}/meeting-table/`
  )

  useEffect(() => {
    setMeetings(data)
  }, [data])

  const removeMeeting = (meetingToDelete) => {
    setMeetings(() => meetings.filter(meeting => meeting.key !== meetingToDelete.key))
  }
  const addMeeting = (meeting) => {
    setMeetings(meetings => [meeting, ...meetings])
  }

  if (loading) return <p data-testid='loading'>Loading...</p>
  if (error) return <p data-testid='error'>Error!</p>

  return (
    <Switch>
      <Route path='/admin/meetings/create' render={props => <CreateMeeting {...props} addMeeting={addMeeting} />} />
      <Route path='/admin/meetings' render={props => <MeetingsTable {...props} meetings={meetings} removeMeeting={removeMeeting} />} />
    </Switch>
  )
}

export default Meetings
