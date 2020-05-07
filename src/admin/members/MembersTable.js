import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Space, Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import RemoveObjectButton from '../RemoveObjectButton'

const MembersTable = ({ members, removeMember }) => {
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName'
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Action',
      key: 'action',
      // eslint-disable-next-line react/display-name
      render: (text, record, index) => (
        <Space size='middle'>
          <Link to={{ pathname: `/admin/members/${record.key}/edit`, state: { meeting: record, index } }}>
            <FontAwesomeIcon icon={faEdit} />
          </Link>
          <RemoveObjectButton object={record} removeObject={removeMember} />
        </Space>
      )
    }
  ]

  return (
    <Space direction='vertical' size='middle' style={{ width: '100%' }}>
      <Link to='/admin/members/create'>
        <Button type='primary'>
          <Space>
            <FontAwesomeIcon icon={faPlus} />
            <span>New member</span>
          </Space>
        </Button>
      </Link>
      <Table
        data-testid='member-table'
        columns={columns}
        dataSource={members}
        pagination={{ defaultCurrent: 1, defaultPageSize: 7, hideOnSinglePage: true }}
      />
    </Space>
  )
}

MembersTable.propTypes = {
  members: PropTypes.array,
  removeMember: PropTypes.func
}

export default MembersTable
