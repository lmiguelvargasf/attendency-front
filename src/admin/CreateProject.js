import React from 'react'
import { Form, Input, Button, DatePicker } from 'antd'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 }
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 }
}

const CreateProject = () => {
  const onFinish = values => {
    console.log('Success:', values)
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <h2>Create Project</h2>
      <Form
        {...layout}
        name='basic'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label='Title'
          name='title'
          rules={[{ required: true, message: "Please input your project's title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Start date'
          name='startDate'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label='Description'
          name='description'
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit'>
            Create
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default CreateProject
