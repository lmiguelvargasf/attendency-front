import React from 'react'
import { Table, Space, Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import RemoveObjectButton from '../RemoveObjectButton'

const MeetingsTable = ({ meetings, removeMeeting }) => {
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
          <RemoveObjectButton object={record} removeObject={removeMeeting} />
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

export default MeetingsTable
