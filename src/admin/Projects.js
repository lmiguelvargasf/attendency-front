import React, { useEffect, useState } from 'react'
import useAxios from 'axios-hooks'
import { Table, Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCalendar, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import RemoveObjectButton from './RemoveObjectButton'

export const Projects = () => {
  const PROJECTS_BASE_URL = `${process.env.REACT_APP_API_URL}/projects`
  const [projects, setProjects] = useState([])
  const [{ data, loading, error }] = useAxios(PROJECTS_BASE_URL)

  useEffect(() => {
    setProjects(data)
  }, [data])

  useEffect(() => {}, [projects])

  const updateProjects = (projectToDelete) => {
    setProjects(() => projects.filter(project => project.key !== projectToDelete.key))
  }

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
      render: (text, record, index) => (
        <Space size='middle'>
          <FontAwesomeIcon icon={faEdit} />
          <FontAwesomeIcon icon={faCalendar} />
          <FontAwesomeIcon icon={faUserPlus} />
          <RemoveObjectButton
            url={`${PROJECTS_BASE_URL}/${record.key}`}
            object={record}
            updateObjects={updateProjects}
          />
        </Space>
      )
    }
  ]

  return (
    <Table
      data-testid='project-table'
      columns={columns}
      dataSource={projects}
      pagination={false}
    />
  )
}
