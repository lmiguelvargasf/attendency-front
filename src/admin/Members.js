import React from 'react'
import { Table, Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

const Members = () => {
  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: fullName => <a>{fullName}</a>
    },
    {
      title: 'Preferred Name',
      dataIndex: 'preferredName',
      key: 'fullName'
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

  const data = [
    {
      key: '1',
      fullName: 'Martina W. Guzman',
      preferredName: 'Winona',
      email: 'martina.winona@gmail.com'
    },
    {
      key: '2',
      fullName: 'Isaac Newton',
      preferredName: 'Isaac',
      email: 'isaac.newton@gmail.com'
    },
    {
      key: '3',
      fullName: 'Nikola Tesla',
      preferredName: 'Nikola',
      email: 'nikola.tesla@gmail.com'
    }
  ]

  return (
    <Table columns={columns} dataSource={data} pagination={false} />
  )
}

export default Members
