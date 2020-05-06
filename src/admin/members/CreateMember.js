import React from 'react'
import { useHistory } from 'react-router-dom'
import { message } from 'antd'
import useAxios from 'axios-hooks'
import PropTypes from 'prop-types'
import MemberForm from './MemberForm'

const CreateMember = ({ addMember }) => {
  const history = useHistory()
  const [, createMember] = useAxios(
    {
      url: `${process.env.REACT_APP_API_URL}/members/`,
      method: 'post'
    },
    { manual: true }
  )

  const onFinish = async values => {
    let member
    try {
      const { data } = await createMember({ data: values })
      member = data
    } catch (error) {
      message.error('There was an error, please try again.')
      console.log(error)
      return
    }
    addMember(member)
    message.success({ content: `${member.firstName} ${member.lastName} was created sucessfully`, duration: 3 })
    history.push('/admin/members')
  }
  const onFinishFailed = errorInfo => {}

  return (
    <>
      <h2>Create Member</h2>
      <MemberForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
    </>
  )
}

CreateMember.propTypes = {
  addMember: PropTypes.func
}

export default CreateMember
