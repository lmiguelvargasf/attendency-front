import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, DatePicker, message } from 'antd'
import useAxios from 'axios-hooks'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 }
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 }
}

const CreateProject = ({ addProject }) => {
  const history = useHistory()
  const [, createProject] = useAxios(
    {
      url: `${process.env.REACT_APP_API_URL}/projects/`,
      method: 'post'
    },
    { manual: true }
  )

  const onFinish = async values => {
    values.startDate = values.startDate.toDate().toISOString().slice(0, 10)
    let project
    try {
      const { data } = await createProject({ data: values })
      project = data
    } catch (error) {
      message.error('There was an error, please try again.')
      console.log(error)
      return
    }
    addProject(project)
    message.success({ content: `${project.title} project was created sucessfully`, duration: 3 })
    history.push('/admin/projects')
  }

  const onFinishFailed = errorInfo => {}

  return (
    <>
      <h2>Create Project</h2>
      <Form
        data-testid='create-project-form'
        {...layout}
        name='project'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label='Title'
          name='title'
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input data-testid='project-title-input' />
        </Form.Item>

        <Form.Item
          label='Start date'
          name='startDate'
          rules={[{ required: true, message: 'Please input the start date!' }]}
        >
          <DatePicker data-testid='project-date-picker' />
        </Form.Item>
        <Form.Item
          label='Description'
          name='description'
        >
          <Input.TextArea rows={4} data-testid='project-description' />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit' data-testid='create-project-button'>
            Create
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default CreateProject
