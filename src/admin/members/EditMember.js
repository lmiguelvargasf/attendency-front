import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import useAxios from 'axios-hooks'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 }
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 }
}

const EditMember = ({ updateMembers }) => {
  const history = useHistory()
  const location = useLocation()
  const memberFromTable = location.state.meeting
  const [, updateMember] = useAxios(
    {
      url: `${process.env.REACT_APP_API_URL}/meetings/${memberFromTable.key}/`,
      method: 'put'
    },
    { manual: true }
  )
  const onFinish = async values => {
    let member
    try {
      const { data } = await updateMember({ data: member })
      member = data
    } catch (error) {
      message.error('There was an error, please try again.')
      console.log(error)
      return
    }
    updateMembers(member)
    message.success({ content: `${member.firstName} ${member.lastName} was updated sucessfully`, duration: 3 })
    history.push('/admin/members')
  }

  const inputs = [
    { label: 'First Name', name: 'firstName', rules: [{ required: true, message: "Please input member's first name!" }] },
    { label: 'Middle Name', name: 'middleName' },
    { label: 'Last Name', name: 'lastName', rules: [{ required: true, message: "Please input member's last name!" }] },
    { label: 'Preferred Name', name: 'preferredName' },
    { label: 'Email', name: 'email', rules: [{ type: 'email', message: 'Invalid email!' }, { required: true, message: "Please input member's email!" }] }
  ]

  const onFinishFailed = errorInfo => {
    console.log(errorInfo)
  }

  return (
    <>
      <h2>Edit Member</h2>
      <Form
        data-testid='create-member-form'
        {...layout}
        name='member'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <>
          {inputs.map((input, index) => (
            <Form.Item key={index} {...input}>
              <Input />
            </Form.Item>
          ))}
        </>
        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit' data-testid='create-project-button'>
            Create
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default EditMember
