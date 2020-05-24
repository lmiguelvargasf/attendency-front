import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { message } from 'antd'
import useAxios from 'axios-hooks'
import moment from 'moment'
import PropTypes from 'prop-types'
import MeetingForm from './MeetingForm'

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
      url: `/meetings/${meetingFromTable.key}/`,
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
      <MeetingForm meeting={meeting} onFinish={onFinish} onFinishFailed={onFinishFailed} />
    </>
  )
}

EditMeeting.propTypes = {
  updateMeetings: PropTypes.func
}

export default EditMeeting
