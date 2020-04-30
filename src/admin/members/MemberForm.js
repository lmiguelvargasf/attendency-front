import React from 'react'
import { Form, Input, Button } from 'antd'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 }
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 }
}

const MemberForm = ({ member, onFinish, onFinishFailed }) => {
  const inputs = [
    { label: 'First Name', name: 'firstName', rules: [{ required: true, message: "Please input member's first name!" }] },
    { label: 'Middle Name', name: 'middleName' },
    { label: 'Last Name', name: 'lastName', rules: [{ required: true, message: "Please input member's last name!" }] },
    { label: 'Preferred Name', name: 'preferredName' },
    { label: 'Email', name: 'email', rules: [{ type: 'email', message: 'Invalid email!' }, { required: true, message: "Please input member's email!" }] }
  ]

  return (
    <Form
      data-testid='create-member-form'
      {...layout}
      name='member'
      initialValues={member}
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
        <Button type='primary' htmlType='submit' data-testid='create-member-button'>
          {member ? 'Save' : 'Create'}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default MemberForm
