import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Space, Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
import RemoveObjectButton from '../RemoveObjectButton'

const MeetingsTable = ({ meetings, removeMeeting }) => {
  const columns = [
    {
      title: 'Project',
      dataIndex: 'project',
      key: 'project'
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
          <Link to={{ pathname: `/admin/meetings/${record.key}/edit`, state: { meeting: record } }}>
            <FontAwesomeIcon icon={faEdit} />
          </Link>
          <RemoveObjectButton object={record} removeObject={removeMeeting} />
        </Space>
      )
    }
  ]

  return (
    <Space direction='vertical' size='middle' style={{ width: '100%' }}>
      <Link to='/admin/meetings/create'>
        <Button type='primary'>
          <Space>
            <FontAwesomeIcon icon={faPlus} />
            <span>New meeting</span>
          </Space>
        </Button>
      </Link>
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
