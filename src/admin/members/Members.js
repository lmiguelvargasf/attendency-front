import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import useAxios from 'axios-hooks'
import MembersTable from './MembersTable'
import CreateMember from './CreateMember'

const Members = () => {
  const [members, setMembers] = useState([])
  const [{ data, loading, error }] = useAxios(
    `${process.env.REACT_APP_API_URL}/members/`
  )

  useEffect(() => {
    setMembers(data)
  }, [data])

  useEffect(() => { }, [members])

  const updateMembers = (memberToDelete) => {
    setMembers(() => members.filter(member => member.key !== memberToDelete.key))
  }

  if (loading) return <p data-testid='loading'>Loading...</p>
  if (error) return <p data-testid='error'>Error!</p>

  return (
    <Switch>
      <Route path='/admin/members/create' component={CreateMember} />
      <Route path='/admin/members' render={props => <MembersTable {...props} members={members} removeMember={updateMembers} />} />
    </Switch>
  )
}

export default Members
