import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, DatePicker } from 'antd'
import useAxios from 'axios-hooks'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 }
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 }
}

const CreateProject = () => {
  const history = useHistory()
  const [, executePost] = useAxios(
    {
      url: `${process.env.REACT_APP_API_URL}/projects/`,
      method: 'post'
    },
    { manual: true }
  )

  const onFinish = async values => {
    values.startDate = values.startDate.toDate().toISOString().slice(0, 10)
    await executePost({ data: values })
    history.push('/admin/projects')
    history.go()
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <h2>Create Project</h2>
      <Form
        data-testid='create-project-form'
        {...layout}
        name='basic'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label='Title'
          name='title'
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Start date'
          name='startDate'
          rules={[{ required: true, message: 'Please input the start date!' }]}
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
