import React from 'react'
import { Table, Tag } from 'antd'

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
        <span>
          <a style={{ marginRight: 16 }}>Invite {record.name}</a>
          <a>Delete</a>
        </span>
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
