import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAxios from 'axios-hooks'
import { Table, Space, Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCalendar, faUserPlus, faPlus } from '@fortawesome/free-solid-svg-icons'
import RemoveObjectButton from '../RemoveObjectButton'

export const Projects = () => {
  const [projects, setProjects] = useState([])
  const [{ data, loading, error }] = useAxios(
    `${process.env.REACT_APP_API_URL}/projects`
  )

  useEffect(() => {
    setProjects(data)
  }, [data])

  useEffect(() => { }, [projects])

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
      render: description => {
        if (description) {
          return description.length < 50 ? description : `${description.substring(0, 50)}...`
        }
        return '-'
      }
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
          <RemoveObjectButton object={record} updateObjects={updateProjects} />
        </Space>
      )
    }
  ]

  return (
    <Space direction='vertical' size='middle' style={{ width: '100%' }}>
      <Link to='/admin/projects/create'>
        <Button type='primary'>
          <Space>
            <FontAwesomeIcon icon={faPlus} />
            <span>New project</span>
          </Space>
        </Button>
      </Link>
      <Table
        data-testid='project-table'
        columns={columns}
        dataSource={projects}
        pagination={false}
      />
    </Space>
  )
}
