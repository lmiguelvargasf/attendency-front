import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { message } from 'antd'
import useAxios from 'axios-hooks'
import PropTypes from 'prop-types'
import MemberForm from './MemberForm'

const EditMember = ({ updateMembers }) => {
  const history = useHistory()
  const location = useLocation()
  const memberFromTable = location.state.meeting
  const memberUrl = memberFromTable.url
  const [{ data, loading, error }] = useAxios(
    {
      url: memberUrl,
      headers: {
        Authorization: `JWT ${window.localStorage.getItem('token')}`
      }
    },
    { useCache: false })
  const [, updateMember] = useAxios(
    {
      url: memberUrl,
      method: 'put',
      headers: {
        Authorization: `JWT ${window.localStorage.getItem('token')}`
      }
    },
    { manual: true }
  )
  const onFinish = async values => {
    let member = values
    member.url = data.url
    try {
      const { data } = await updateMember({ data: member })
      member = data
    } catch (error) {
      message.error('There was an error, please try again.')
      console.log(error)
      return
    }
    updateMembers(member, location.state.index)
    message.success({ content: `${member.firstName} ${member.lastName} was updated sucessfully`, duration: 3 })
    history.push('/admin/members')
  }
  const onFinishFailed = errorInfo => {
    console.log(errorInfo)
  }

  if (loading) return <p data-testid='loading'>Loading...</p>
  if (error) return <p data-testid='error'>Error!</p>

  return (
    <>
      <h2>Edit Member</h2>
      <MemberForm member={data} onFinish={onFinish} onFinishFailed={onFinishFailed} />
    </>
  )
}

EditMember.propTypes = {
  updateMembers: PropTypes.func
}

export default EditMember
