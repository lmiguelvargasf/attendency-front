import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import useAxios from 'axios-hooks'
import MeetingsTable from './MeetingsTable'

const Meetings = () => {
  const [meetings, setMeetings] = useState([])
  const [{ data, loading, error }] = useAxios(
    `${process.env.REACT_APP_API_URL}/meetings/`
  )

  useEffect(() => {
    setMeetings(data)
  }, [data])

  useEffect(() => { }, [meetings])

  const removeMeeting = (meetingToDelete) => {
    setMeetings(() => meetings.filter(meeting => meeting.key !== meetingToDelete.key))
  }

  if (loading) return <p data-testid='loading'>Loading...</p>
  if (error) return <p data-testid='error'>Error!</p>

  return (
    <Switch>
      {/* <Route path='/admin/meetings/create' render={props => <CreateMember {...props} addMember={addMember} />} /> */}
      <Route path='/admin/meetings' render={props => <MeetingsTable {...props} meetings={meetings} removeMeeting={removeMeeting} />} />
    </Switch>
  )
}

export default Meetings
