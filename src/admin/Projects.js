import React, { useEffect, useState } from 'react'
import useAxios from 'axios-hooks'
import { Table, Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCalendar, faUserPlus, faTimes } from '@fortawesome/free-solid-svg-icons'

const RemoveProjectButton = ({ project, updateProjects }) => {
  const [, execute] = useAxios(
    {
      url: `${process.env.REACT_APP_API_URL}/projects/${project.key}/`,
      method: 'delete'
    },
    {
      manual: true
    }
  )
  const removeProject = async (project) => {
    await execute()
    updateProjects(project)
  }

  return <a onClick={() => { removeProject(project) }}><FontAwesomeIcon icon={faTimes} /></a>
}

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [{ data, loading, error }] = useAxios(
    `${process.env.REACT_APP_API_URL}/projects/`
  )

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
          <RemoveProjectButton project={record} updateProjects={updateProjects} />
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

export default Projects
