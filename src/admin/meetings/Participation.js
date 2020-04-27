import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Row, Col, Table, Checkbox, Button, Input, Space, message } from 'antd'

const { TextArea } = Input

const Participation = () => {
  const history = useHistory()
  const location = useLocation()
  const meeting = location.state.meeting
  const [observations, setObservations] = useState('Elimination')
  const [data, setData] = useState([
    {
      member: 'Miguel',
      attended: false
    },
    {
      member: 'Sika',
      attended: true
    },
    {
      member: 'Jan',
      attended: true
    },
    {
      member: 'Sandri',
      attended: true
    },
    {
      member: 'Chris',
      attended: true
    },
    {
      member: 'Vale',
      attended: true
    }
  ])
  const tootleAttendance = (event, participation, index) => {
    event.preventDefault()
    participation.attended = !participation.attended
    setData((data) => {
      const newData = [...data]
      newData[index] = participation
      return newData
    })
  }

  const columns = [
    {
      title: 'Member',
      dataIndex: 'member',
      key: 'member'
    },
    {
      title: 'Attended',
      dataIndex: 'attended',
      key: 'attended',
      render: (text, record, index) => (
        <Checkbox checked={record.attended} onClick={(event) => { tootleAttendance(event, record, index) }} />
      )
    }
  ]

  const updateParticipation = () => {
    history.push('/admin/meetings')
  }

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
            dataSource={data}
            pagination={false}
          />
        </Col>
        <Col span={12}>
          <Space direction='vertical' style={{ width: '100%' }}>
            <strong>Observations:</strong>
            <TextArea rows={data.length > 7 ? 14 : 2 + 2 * data.length} value={observations} onChange={(e) => { setObservations(e.target.value) }} />
            <Button type='primary' onClick={() => { updateParticipation() }}>Save</Button>
          </Space>
        </Col>
      </Row>
    </>
  )
}

export default Participation
