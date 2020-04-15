import React from 'react'
import { Table, Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCalendar, faUserPlus } from '@fortawesome/free-solid-svg-icons'

const Projects = () => {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: text => <a>{text}</a>
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Team',
      dataIndex: 'team',
      key: 'team'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size='middle'>
          <FontAwesomeIcon icon={faEdit} />
          <FontAwesomeIcon icon={faCalendar} />
          <FontAwesomeIcon icon={faUserPlus} />
        </Space>
      )
    }
  ]

  const data = [
    {
      key: '1',
      title: 'ABC',
      startDate: '2019-04-02',
      description: 'New York No. 1 Lake Park',
      team: 'Anastasia, Byron, Charles'
    },
    {
      key: '2',
      title: 'MN',
      startDate: '2019-07-21',
      description: 'London No. 1 Lake Park',
      team: 'Merlin, Nicholas'
    },
    {
      key: '3',
      title: 'XYZ',
      startDate: '2020-11-15',
      description: 'Sidney No. 1 Lake Park',
      team: 'Xavier, Yasmine, Zachary'
    }
  ]

  return (
    <Table columns={columns} dataSource={data} />
  )
}

export default Projects
