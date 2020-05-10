import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { message } from 'antd'
import useAxios from 'axios-hooks'
import moment from 'moment'
import PropTypes from 'prop-types'
import MeetingForm from './MeetingForm'

const CreateMeeting = ({ addMeeting }) => {
  const history = useHistory()
  const [projects, setProjects] = useState([])
  const [{ data, loading, error }] = useAxios({
    url: `${process.env.REACT_APP_API_URL}/simple-projects`,
    headers: {
      Authorization: `JWT ${window.localStorage.getItem('token')}`
    }
  })
  const [, createMeeting] = useAxios(
    {
      url: `${process.env.REACT_APP_API_URL}/meetings/`,
      method: 'post',
      headers: {
        Authorization: `JWT ${window.localStorage.getItem('token')}`
      }
    },
    { manual: true }
  )

  useEffect(() => { if (data) setProjects(data) }, [data])

  if (loading) return <p data-testid='loading'>Loading...</p>
  if (error) return <p data-testid='error'>Error!</p>

  const onFinish = async values => {
    const project = projects.find(x => x.key === values.project)
    const date = values.date.format('YYYY-MM-DD')
    const time = values.time.format('HH:mm')
    const dateTime = moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm')
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
      project: project.url,
      projectTitle: project.title,
      date,
      time
    })
    message.success({ content: `Meeting for project ${project.title} was created sucessfully`, duration: 3 })
    history.push('/admin/meetings')
  }

  const onFinishFailed = errorInfo => {}

  if (loading) return <p data-testid='loading'>Loading...</p>
  if (error) return <p data-testid='error'>Error!</p>

  return (
    <>
      <h2>Create Meeting</h2>
      <MeetingForm onFinish={onFinish} onFinishFailed={onFinishFailed} projects={projects} />
    </>
  )
}

CreateMeeting.propTypes = {
  addMeeting: PropTypes.func
}

export default CreateMeeting
