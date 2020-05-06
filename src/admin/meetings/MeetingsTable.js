import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Space, Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus, faClipboardCheck } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import RemoveObjectButton from '../RemoveObjectButton'

const MeetingsTable = ({ meetings, removeMeeting }) => {
  const columns = [
    {
      title: 'Project',
      dataIndex: 'projectTitle',
      key: 'projectTitle'
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
      // eslint-disable-next-line react/display-name
      render: (text, record, index) => (
        <Space size='middle'>
          <Link to={{ pathname: `/admin/meetings/${record.key}/edit`, state: { meeting: record, index } }}>
            <FontAwesomeIcon icon={faEdit} />
          </Link>
          <Link to={{ pathname: `/admin/meetings/${record.key}/participation`, state: { meeting: record } }}>
            <FontAwesomeIcon icon={faClipboardCheck} style={{ color: '#53A653' }} />
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

MeetingsTable.propTypes = {
  meetings: PropTypes.object,
  removeMeeting: PropTypes.func
}

export default MeetingsTable
