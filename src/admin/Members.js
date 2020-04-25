import React, { useEffect, useState } from 'react'
import useAxios from 'axios-hooks'
import { Table, Space, Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import RemoveObjectButton from './RemoveObjectButton'

const Members = () => {
  const [members, setMembers] = useState([])
  const [{ data, loading, error }] = useAxios(
    `${process.env.REACT_APP_API_URL}/members/`
  )

  useEffect(() => {
    setMembers(data)
  }, [data])

  useEffect(() => { }, [members])

  const updateMembers = (memberToDelete) => {
    setMembers(() => members.filter(member => member.key !== memberToDelete.key))
  }

  if (loading) return <p data-testid='loading'>Loading...</p>
  if (error) return <p data-testid='error'>Error!</p>

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
          <RemoveObjectButton object={record} removeObject={updateMembers} />
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

export default Members
