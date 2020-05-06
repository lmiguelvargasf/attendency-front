import React from 'react'
import { Form, Input, Button, DatePicker } from 'antd'
import PropTypes from 'prop-types'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 }
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 }
}

const ProjectForm = ({ project, onFinish, onFinishFailed }) => {
  return (
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
        <Button type='primary' htmlType='submit' data-testid='create-save-button'>
          {project ? 'Save' : 'Create'}
        </Button>
      </Form.Item>
    </Form>
  )
}

ProjectForm.propTypes = {
  project: PropTypes.object,
  onFinish: PropTypes.func,
  onFinishFailed: PropTypes.func
}

export default ProjectForm
