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
  const memberUrl = memberFromTable.url
  const [{ data, loading, error }] = useAxios(memberUrl, { useCache: false })
  const [, updateMember] = useAxios(
    {
      url: memberUrl,
      method: 'put'
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

  if (loading) return <p data-testid='loading'>Loading...</p>
  if (error) return <p data-testid='error'>Error!</p>

  return (
    <>
      <h2>Edit Member</h2>
      <Form
        data-testid='create-member-form'
        {...layout}
        name='member'
        initialValues={{ ...data }}
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
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default EditMember
