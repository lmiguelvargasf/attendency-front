import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Space, Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCalendar, faUserPlus, faPlus } from '@fortawesome/free-solid-svg-icons'
import RemoveObjectButton from '../RemoveObjectButton'

const ProjectsTable = ({ projects, removeProject }) => {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
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
          <Link to={{ pathname: `/admin/projects/${record.key}/edit`, state: { project: record, index } }}>
            <FontAwesomeIcon icon={faEdit} />
          </Link>
          <FontAwesomeIcon icon={faCalendar} />
          <FontAwesomeIcon icon={faUserPlus} />
          <RemoveObjectButton object={record} removeObject={removeProject} />
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

export default ProjectsTable
