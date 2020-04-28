import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import useAxios from 'axios-hooks'
import MembersTable from './MembersTable'
import CreateMember from './CreateMember'
import EditMeeting from './EditMember'

const Members = () => {
  const [members, setMembers] = useState([])
  const [{ data, loading, error }] = useAxios(
    `${process.env.REACT_APP_API_URL}/members/`
  )

  useEffect(() => { setMembers(data) }, [data])

  const removeMember = (memberToDelete) => {
    setMembers(() => members.filter(member => member.key !== memberToDelete.key))
  }
  const addMember = (member) => {
    setMembers(members => [member, ...members])
  }
  const updateMembers = (updatedMember, index) => {
    members[index] = updatedMember
    setMembers(members)
  }

  if (loading) return <p data-testid='loading'>Loading...</p>
  if (error) return <p data-testid='error'>Error!</p>

  return (
    <Switch>
      <Route path='/admin/members/create' render={props => <CreateMember {...props} addMember={addMember} />} />
      <Route path='/admin/members/:key/edit' render={props => <EditMeeting {...props} updateMembers={updateMembers} />} />
      <Route path='/admin/members' render={props => <MembersTable {...props} members={members} removeMember={removeMember} />} />
    </Switch>
  )
}

export default Members
