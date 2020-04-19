import React from 'react'
import useAxios from 'axios-hooks'
import { Table, Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCalendar, faUserPlus } from '@fortawesome/free-solid-svg-icons'

const Projects = () => {
  const [{ data: projects, loading, error }] = useAxios(
    `${process.env.REACT_APP_API_URL}/projects/`
  )

  if (loading) return <p data-testid='loading'>Loading...</p>
  if (error) return <p data-testid='error'>Error!</p>

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: title => <a>{title}</a>
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: description => `${description.substring(0, 50)}...`
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

  return (
    <Table
      data-testid='project-table-id'
      columns={columns}
      dataSource={projects}
      pagination={false}
    />
  )
}

export default Projects
