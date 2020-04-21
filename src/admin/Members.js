import React, { useEffect, useState } from 'react'
import useAxios from 'axios-hooks'
import { Table, Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import RemoveObjectButton from './RemoveObjectButton'

const Members = () => {
  const [members, setMembers] = useState([])
  const [{ data, loading, error }] = useAxios(
    `${process.env.REACT_APP_API_URL}/members/`
  )

  useEffect(() => {
    setMembers(data)
  }, [data])

  useEffect(() => {}, [members])

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
          <RemoveObjectButton object={record} updateObjects={updateMembers} />
        </Space>
      )
    }
  ]

  return (
    <Table
      data-testid='member-table'
      columns={columns}
      dataSource={members}
      pagination={false}
    />
  )
}

export default Members
