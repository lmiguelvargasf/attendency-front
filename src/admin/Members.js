import React from 'react'
import useAxios from 'axios-hooks'
import { Table, Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

const Members = () => {
  const [{ data, loading, error }] = useAxios(
    `${process.env.REACT_APP_API_URL}/members/`
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

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
        </Space>
      )
    }
  ]

  return (
    <Table columns={columns} dataSource={data} pagination={false} />
  )
}

export default Members
