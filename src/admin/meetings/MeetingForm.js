import React from 'react'
import { Form, TimePicker, Button, DatePicker, Input, Select } from 'antd'

const { Option } = Select

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 }
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 }
}

const MeetingForm = ({ meeting, onFinish, onFinishFailed, projects }) => {
  return (
    <Form
      data-testid='create-meeting-form'
      {...layout}
      name='meeting'
      initialValues={meeting}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {meeting ? (
        <Form.Item
          label='Project'
          name='project'
          data-testid='disabled-input'
        >
          <Input disabled />
        </Form.Item>
      ) : (
        <Form.Item
          label='Project'
          name='project'
          rules={[{ required: true, message: 'Please select project!' }]}
          data-testid='select-project'
        >
          <Select allowClear>
            {projects.map(project => <Option key={project.key} value={project.key}>{project.title}</Option>)}
          </Select>
        </Form.Item>
      )}
      <Form.Item
        label='Date'
        name='date'
        rules={[{ required: true, message: "Please input meeting's date!" }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label='Time'
        name='time'
        rules={[{ required: true, message: "Please input meeting's time!" }]}
      >
        <TimePicker format='HH:mm' />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit' data-testid='create-save-button'>
          {meeting ? 'Save' : 'Create'}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default MeetingForm
