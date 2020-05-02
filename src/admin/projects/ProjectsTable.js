import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Space, Button, Modal, Select, message } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCalendar, faUserPlus, faPlus } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import RemoveObjectButton from '../RemoveObjectButton'

import styles from '../Admin.module.sass'

const { Option } = Select

const ProjectsTable = ({ projects, removeProject, updateProjects }) => {
  const [visible, setVisible] = useState(false)
  const [memberToAdd, setMemberToAdd] = useState()
  const [nonMembers, setNonMembers] = useState([])
  const [project, setProject] = useState()
  const [indexSelected, setIndexSelected] = useState()
  const [confirmLoading, setConfirmLoading] = useState(false)

  const showModal = async (project, indexSelected) => {
    setIndexSelected(indexSelected)
    setProject(project)
    setVisible(true)
    let response
    try {
      response = await axios.get(`${process.env.REACT_APP_API_URL}/projects/${project.key}/non-members/`)
    } catch (error) {
      console.log(error)
    }
    setNonMembers(response.data)
  }
  const handleOk = async () => {
    if (!memberToAdd) {
      message.error('Please select a member to add!')
      return
    }
    setConfirmLoading(true)
    let response
    try {
      response = await axios.post(`${process.env.REACT_APP_API_URL}/projects/${project.key}/add-member/`, { key: memberToAdd })
    } catch (error) {
      message.error('There was an error, please try again.')
      console.log(error)
    }
    const updatedProject = response.data
    updateProjects(updatedProject, indexSelected)
    setVisible(false)
    setConfirmLoading(false)
    setMemberToAdd(null)
    setIndexSelected(null)
    message.success('Member was added successfully!')
  }

  const handleCancel = () => {
    setVisible(false)
    setMemberToAdd(null)
    setIndexSelected(null)
  }

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
          <button type='button' className={styles.linkButton} onClick={() => showModal(record, index)}>
            <FontAwesomeIcon icon={faUserPlus} style={{ color: '#9664c8' }} />
          </button>
          <RemoveObjectButton object={record} removeObject={removeProject} />
        </Space>
      )
    }
  ]

  return (
    <>
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
      <Modal
        title='Add Member'
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Space>
          <strong>Member:</strong>
          <Select style={{ width: 150 }} onChange={value => setMemberToAdd(value)} value={memberToAdd}>
            {nonMembers.map(nonMember => (
              <Option key={nonMember.key} value={nonMember.key}>
                {nonMember.preferredName ? nonMember.preferredName : `${nonMember.firstName} ${nonMember.lastName}`}
              </Option>
            ))}
          </Select>
        </Space>
      </Modal>
    </>
  )
}

export default ProjectsTable
