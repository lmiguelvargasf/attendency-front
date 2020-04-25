import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, TimePicker, Button, DatePicker, Select, message } from 'antd'
import useAxios from 'axios-hooks'
import moment from 'moment'

const { Option } = Select

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 }
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 }
}

const CreateMeeting = ({ addMeeting }) => {
  const history = useHistory()
  const [projects, setProjects] = useState([])
  const [{ data, loading, error }] = useAxios(
    `${process.env.REACT_APP_API_URL}/simple-projects`
  )
  const [, createMeeting] = useAxios(
    {
      url: `${process.env.REACT_APP_API_URL}/meetings/`,
      method: 'post'
    },
    { manual: true }
  )

  useEffect(() => {
    if (data) setProjects(data)
  }, [data])

  if (loading) return <p data-testid='loading'>Loading...</p>
  if (error) return <p data-testid='error'>Error!</p>

  const onFinish = async values => {
    const project = projects.find(x => x.key === values.project)
    const date = values.date.format('YYYY-MM-DD')
    const time = values.time.format('HH:mm:ss')
    const dateTime = moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm:ss')
    const meeting = {
      project: project.url,
      dateTime: dateTime.toISOString()
    }
    let createdMeeting
    try {
      const { data } = await createMeeting({ data: meeting })
      createdMeeting = data
    } catch (error) {
      message.error('There was an error, please try again.')
      console.log(error)
      return
    }

    addMeeting({
      key: createdMeeting.key,
      url: createdMeeting.url,
      project: project.title,
      date,
      time: values.time.format('HH:mm')
    })
    message.success({ content: `Meeting for project ${project.title} was created sucessfully`, duration: 3 })
    history.push('/admin/meetings')
  }

  const onFinishFailed = errorInfo => {}

  if (loading) return <p data-testid='loading'>Loading...</p>
  if (error) return <p data-testid='error'>Error!</p>

  return (
    <>
      <h2>Create Project</h2>
      <Form
        data-testid='create-meeting-form'
        {...layout}
        name='meeting'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label='Project'
          name='project'
          rules={[{ required: true, message: 'Please select project!' }]}
        >
          <Select allowClear>
            {projects.map(project => <Option key={project.key} value={project.key}>{project.title}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          label='Date'
          name='date'
          rules={[{ required: true, message: "Please input meeting's date!" }]}
        >
          <DatePicker style={{ width: '130px' }} />
        </Form.Item>
        <Form.Item
          label='Time'
          name='time'
          rules={[{ required: true, message: "Please input meeting's time!" }]}
        >
          <TimePicker format='h:mm A' style={{ width: '130px' }} />
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

export default CreateMeeting
