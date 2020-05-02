import React, { useReducer } from 'react'
import { Link } from 'react-router-dom'
import { Table, Space, Button, Select, message } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCalendar, faUserPlus, faPlus } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import RemoveObjectButton from '../RemoveObjectButton'
import AddMemberModal from './AddMemberModal'

import styles from '../Admin.module.sass'

const addMemberStateReducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, visible: true, projectKey: action.projectKey, selectedProjectIndex: action.selectedProjectIndex }
    case 'LOADING':
      return { ...state, confirmLoading: true }
    case 'SET_NON_MEMBERS':
      return { ...state, nonMembers: action.nonMembers }
    case 'SET_MEMBER_TO_ADD':
      return { ...state, memberToAdd: action.memberToAdd }
    case 'UNSET_MEMBER_TO_ADD':
      return { ...state, memberToAdd: null }
    case 'CLOSE_MODAL':
      return { ...state, memberToAdd: null, confirmLoading: false, visible: false }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const ProjectsTable = ({ projects, removeProject, updateProjects }) => {
  const [addMemberState, dispatch] = useReducer(addMemberStateReducer, {
    visible: false,
    confirmLoading: false,
    nonMembers: [],
    projectKey: null,
    selectedProjectIndex: null,
    memberToAdd: null
  })

  const showModal = async (project, index) => {
    dispatch({ type: 'OPEN_MODAL', selectedProjectIndex: index, projectKey: project.key })
    let response
    try {
      response = await axios.get(`${process.env.REACT_APP_API_URL}/projects/${project.key}/non-members/`)
    } catch (error) {
      console.log(error)
    }
    dispatch({ type: 'SET_NON_MEMBERS', nonMembers: response.data })
  }
  const handleOk = async () => {
    if (addMemberState.nonMembers.length === 0) {
      dispatch({ type: 'CLOSE_MODAL' })
      return
    }

    if (!addMemberState.memberToAdd) {
      message.error('Please select a member to add!')
      return
    }
    dispatch({ type: 'LOADING' })
    let response
    try {
      response = await axios.post(`${process.env.REACT_APP_API_URL}/projects/${addMemberState.projectKey}/add-member/`, { key: addMemberState.memberToAdd })
    } catch (error) {
      message.error('There was an error, please try again.')
      console.log(error)
    }
    const updatedProject = response.data
    updateProjects(updatedProject, addMemberState.selectedProjectIndex)
    dispatch({ type: 'CLOSE_MODAL' })
    message.success('Member was added successfully!')
  }

  const handleCancel = () => {
    dispatch({ type: 'CLOSE_MODAL' })
  }
  const handleOnChange = value => {
    dispatch({ type: 'SET_MEMBER_TO_ADD', memberToAdd: value })
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
      <AddMemberModal state={addMemberState} handleOk={handleOk} handleCancel={handleCancel} handleOnChange={handleOnChange} />
    </>
  )
}

export default ProjectsTable
