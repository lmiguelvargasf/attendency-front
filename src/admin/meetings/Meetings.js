import React, { useEffect, useState } from 'react'
import useAxios from 'axios-hooks'
import { Table, Space, Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import RemoveObjectButton from '../RemoveObjectButton'

const Meetings = () => {
  const [meetings, setMeetings] = useState([])
  const [{ data, loading, error }] = useAxios(
    `${process.env.REACT_APP_API_URL}/meetings/`
  )

  useEffect(() => {
    setMeetings(data)
  }, [data])

  useEffect(() => { }, [meetings])

  const updateMeetings = (meetingToDelete) => {
    setMeetings(() => meetings.filter(meeting => meeting.key !== meetingToDelete.key))
  }

  if (loading) return <p data-testid='loading'>Loading...</p>
  if (error) return <p data-testid='error'>Error!</p>

  const columns = [
    {
      title: 'Project',
      dataIndex: 'project',
      key: 'project',
      render: project => <a>{project}</a>
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size='middle'>
          <FontAwesomeIcon icon={faEdit} />
          <FontAwesomeIcon icon={faTrash} />
          <RemoveObjectButton object={record} removeObject={updateMeetings} />
        </Space>
      )
    }
  ]

  return (
    <Space direction='vertical' size='middle' style={{ width: '100%' }}>
      <Button type='primary'>
        <Space>
          <FontAwesomeIcon icon={faPlus} />
          <span>New meeting</span>
        </Space>
      </Button>
      <Table
        data-testid='meeting-table'
        columns={columns}
        dataSource={meetings}
        pagination={false}
      />
    </Space>
  )
}

export default Meetings
