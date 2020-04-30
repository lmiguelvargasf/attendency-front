import React, { useEffect, useReducer } from 'react'
import { Route, Switch } from 'react-router-dom'
import useAxios from 'axios-hooks'
import MembersTable from './MembersTable'
import CreateMember from './CreateMember'
import EditMeeting from './EditMember'
import memberReducer from './memberReducer'

const Members = () => {
  const [members, dispatch] = useReducer(memberReducer, [])
  const [{ data, loading, error }] = useAxios(`${process.env.REACT_APP_API_URL}/members/`)
  useEffect(() => { dispatch({ type: 'LOAD', members: data }) }, [data])

  if (loading) return <p data-testid='loading'>Loading...</p>
  if (error) return <p data-testid='error'>Error!</p>

  return (
    <Switch>
      <Route
        path='/admin/members/create'
        render={props => <CreateMember {...props} addMember={member => dispatch({ type: 'ADD', member })} />}
      />
      <Route
        path='/admin/members/:key/edit'
        render={props => <EditMeeting {...props} updateMembers={(member, index) => dispatch({ type: 'UPDATE', member, index })} />}
      />
      <Route
        path='/admin/members'
        render={props => <MembersTable {...props} members={members} removeMember={member => dispatch({ type: 'REMOVE', member })} />}
      />
    </Switch>
  )
}

export default Members
