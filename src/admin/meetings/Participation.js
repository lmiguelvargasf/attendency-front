import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import useAxios from 'axios-hooks'
import { Row, Col, Table, Checkbox, Button, Input, Space, message } from 'antd'

const { TextArea } = Input

const Participation = () => {
  const history = useHistory()
  const location = useLocation()
  const meeting = location.state.meeting
  const [observations, setObservations] = useState('')
  const [{ data, loading, error }] = useAxios({
    url: `${process.env.REACT_APP_API_URL}/meetings/${meeting.key}/participation`,
    headers: {
      Authorization: `JWT ${window.localStorage.getItem('token')}`
    }
  })
  const [participations, setParticipations] = useState([])
  useEffect(() => {
    if (data) {
      setParticipations(data.participations)
      setObservations(data.observations)
    }
  }, [data])
  const [, trackParticipation] = useAxios(
    {
      url: `${process.env.REACT_APP_API_URL}/meetings/${meeting.key}/track-participation/`,
      method: 'post',
      headers: {
        Authorization: `JWT ${window.localStorage.getItem('token')}`
      }
    },
    { manual: true }
  )

  const tootleAttendance = (event, participation, index) => {
    event.preventDefault()
    participation.attended = !participation.attended
    setParticipations((data) => {
      const newData = [...data]
      newData[index] = participation
      return newData
    })
  }

  const columns = [
    {
      title: 'Member',
      dataIndex: 'memberName',
      key: 'memberName'
    },
    {
      title: 'Attended',
      dataIndex: 'attended',
      key: 'attended',
      // eslint-disable-next-line react/display-name
      render: (text, record, index) => (
        <Checkbox checked={record.attended} onClick={(event) => { tootleAttendance(event, record, index) }} />
      )
    }
  ]

  const updateParticipation = async () => {
    try {
      await trackParticipation({ data: { participations, observations } })
    } catch (error) {
      message.error('There was an error, please try again.')
      console.log(error)
      return
    }
    data.observations = observations
    message.success({ content: `Participation for ${meeting.projectTitle}'s meeting was saved sucessfully`, duration: 3 })
    history.push('/admin/meetings')
  }

  if (loading) return <p data-testid='loading'>Loading...</p>
  if (error) return <p data-testid='error'>Error!</p>

  return (
    <>
      <h2>Participation</h2>
      <h3>Meeting</h3>
      <Row>
        <Col span={12}>
          <strong>Title:</strong> <span>{meeting.projectTitle}</span>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <strong>Date:</strong> <span>{meeting.date}</span>
        </Col>
        <Col span={4}>
          <strong>Time:</strong> <span>{meeting.time}</span>
        </Col>
      </Row>
      <Row style={{ marginTop: '1rem', marginBottom: '2rem' }} gutter={20}>
        <Col span={12}>
          <Table
            data-testid='participation-table'
            scroll={{ y: 350 }}
            columns={columns}
            dataSource={participations}
            pagination={false}
          />
        </Col>
        <Col span={12}>
          <Space direction='vertical' style={{ width: '100%' }}>
            <strong>Observations:</strong>
            <TextArea rows={participations.length > 7 ? 14 : 2 + 2 * participations.length} value={observations} onChange={(e) => { setObservations(e.target.value) }} />
            <Button type='primary' onClick={() => { updateParticipation() }}>Save</Button>
          </Space>
        </Col>
      </Row>
    </>
  )
}

export default Participation
