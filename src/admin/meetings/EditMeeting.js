import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Form, TimePicker, Button, DatePicker, Input, message } from 'antd'
import useAxios from 'axios-hooks'
import moment from 'moment'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 }
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 }
}

const EditMeeting = ({ updateMeetings }) => {
  const history = useHistory()
  const location = useLocation()
  const meetingFromTable = location.state.meeting
  const projectTitle = meetingFromTable.projectTitle
  const currentDate = moment(meetingFromTable.date, 'YYYY-MM-DD')
  const currentTime = moment(meetingFromTable.time, 'HH:mm')
  const meeting = { project: projectTitle, date: currentDate, time: currentTime }
  const [, updateMeeting] = useAxios(
    {
      url: `${process.env.REACT_APP_API_URL}/meetings/${meetingFromTable.key}/`,
      method: 'put'
    },
    { manual: true }
  )

  const onFinish = async values => {
    const date = values.date.format('YYYY-MM-DD')
    const time = values.time.format('HH:mm')
    const dateTime = moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm')
    const meeting = {
      project: meetingFromTable.project,
      dateTime: dateTime.toISOString()
    }
    let updatedMeeting
    try {
      const { data } = await updateMeeting({ data: meeting })
      updatedMeeting = data
    } catch (error) {
      message.error('There was an error, please try again.')
      console.log(error)
      return
    }

    updateMeetings(
      {
        key: updatedMeeting.key,
        url: updatedMeeting.url,
        projectTitle: projectTitle,
        project: meetingFromTable.project,
        date,
        time
      },
      location.state.index
    )
    message.success({ content: `Meeting for project ${projectTitle} was updated sucessfully`, duration: 3 })
    history.push('/admin/meetings')
  }

  const onFinishFailed = errorInfo => {
    console.log(errorInfo)
  }

  return (
    <>
      <h2>Edit Meeting</h2>
      <Form
        data-testid='create-meeting-form'
        {...layout}
        name='meeting'
        initialValues={meeting}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label='Project'
          name='project'
        >
          <Input disabled />
        </Form.Item>

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
          <Button type='primary' htmlType='submit' data-testid='create-project-button'>
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default EditMeeting
