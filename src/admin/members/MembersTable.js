import React from 'react'
import { Table, Space, Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import RemoveObjectButton from '../RemoveObjectButton'

const MembersTable = ({ members, removeMember }) => {
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      render: firstName => <a>{firstName}</a>
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
      render: (text, record) => (
        <Space size='middle'>
          <FontAwesomeIcon icon={faEdit} />
          <FontAwesomeIcon icon={faTrash} />
          <RemoveObjectButton object={record} removeObject={removeMember} />
        </Space>
      )
    }
  ]

  return (
    <Space direction='vertical' size='middle' style={{ width: '100%' }}>
      <Button type='primary'>
        <Space>
          <FontAwesomeIcon icon={faPlus} />
          <span>New member</span>
        </Space>
      </Button>
      <Table
        data-testid='member-table'
        columns={columns}
        dataSource={members}
        pagination={false}
      />
    </Space>
  )
}

export default MembersTable
