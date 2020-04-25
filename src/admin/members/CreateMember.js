import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import useAxios from 'axios-hooks'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 }
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 }
}

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

  const inputs = [
    { label: 'First Name', name: 'firstName', rules: [{ required: true, message: "Please input member's first name!" }] },
    { label: 'Middle Name', name: 'middleName' },
    { label: 'Last Name', name: 'lastName', rules: [{ required: true, message: "Please input member's last name!" }] },
    { label: 'Preferred Name', name: 'preferredName' },
    { label: 'Email', name: 'email', rules: [{ type: 'email', message: 'Invalid email!' }, { required: true, message: "Please input member's email!" }] }
  ]

  return (
    <>
      <h2>Create Member</h2>
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

export default CreateMember
