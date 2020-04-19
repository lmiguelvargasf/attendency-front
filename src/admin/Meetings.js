import React from 'react'
import useAxios from 'axios-hooks'
import { Table, Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons'

const Meetings = () => {
  const [{ data: meetings, loading, error }] = useAxios(
    `${process.env.REACT_APP_API_URL}/meetings/`
  )

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
          <FontAwesomeIcon icon={faTimes} />
        </Space>
      )
    }
  ]

  return (
    <Table
      data-testid='meeting-table'
      columns={columns}
      dataSource={meetings}
      pagination={false}
    />
  )
}

export default Meetings
