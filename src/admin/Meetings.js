import React from 'react'
import { Table, Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

const Meetings = () => {
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
      key: 'fullName'
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
        </Space>
      )
    }
  ]

  const data = [
    {
      key: '1',
      project: 'Mathsistor',
      date: '2018-07-14',
      time: '17H00'
    },
    {
      key: '2',
      project: 'Smart Dentistry',
      date: '2020-04-14',
      time: '09H30'
    },
    {
      key: '3',
      project: 'Cuenca Helps',
      date: '2020-04-16',
      time: '12H00'
    }
  ]

  return (
    <Table columns={columns} dataSource={data} pagination={false} />
  )
}

export default Meetings
