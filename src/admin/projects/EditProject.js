import React from 'react'
import { Form, Input, Button, DatePicker, message } from 'antd'
import { useHistory, useLocation } from 'react-router-dom'
import useAxios from 'axios-hooks'
import moment from 'moment'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 }
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 }
}

const EditProject = ({ updateProjects }) => {
  const history = useHistory()
  const location = useLocation()
  const projectFromTable = location.state.project
  const project = {
    ...projectFromTable,
    startDate: moment(projectFromTable.startDate, 'YYYY-MM-DD')
  }
  const [, updateProject] = useAxios(
    {
      url: `${process.env.REACT_APP_API_URL}/projects/${project.key}/`,
      method: 'put'
    },
    { manual: true }
  )

  const onFinish = async values => {
    values.startDate = values.startDate.toDate().toISOString().slice(0, 10)
    let updatedProject
    try {
      const { data } = await updateProject({ data: values })
      updatedProject = data
    } catch (error) {
      message.error('There was an error, please try again.')
      console.log(error)
      return
    }
    updateProjects(updatedProject, location.state.index)
    message.success({ content: `${project.title} project was updated sucessfully`, duration: 3 })
    history.push('/admin/projects')
  }
  const onFinishFailed = errorInfo => {
    console.log(errorInfo)
  }

  return (
    <>
      <h2>Edit Project</h2>
      <Form
        data-testid='create-project-form'
        {...layout}
        name='project'
        initialValues={project}
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
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default EditProject
