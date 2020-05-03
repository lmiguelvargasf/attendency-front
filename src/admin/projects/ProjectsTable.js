import React, { useReducer } from 'react'
import { Link } from 'react-router-dom'
import { Table, Space, Button, message } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCalendar, faUserPlus, faUserMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import RemoveObjectButton from '../RemoveObjectButton'
import AddMemberModal from './AddMemberModal'
import addMemberReducer from './addMemberReducer'
import RemoveMemberModal from './RemoveMemberModal'
import removeMemberReducer from './removeMemberReducer'

import styles from '../Admin.module.sass'

const ProjectsTable = ({ projects, removeProject, updateProjects }) => {
  const [addMemberState, dispatchAdd] = useReducer(addMemberReducer, {
    visible: false,
    confirmLoading: false,
    nonMembers: [],
    projectKey: null,
    selectedProjectIndex: null,
    memberToAdd: null
  })
  const [removeMemberState, dispatchRemove] = useReducer(removeMemberReducer, {
    visible: false,
    confirmLoading: false,
    members: [],
    projectKey: null,
    selectedProjectIndex: null,
    memberToRemove: null
  })

  const showAddMemberModal = async (project, index) => {
    dispatchAdd({ type: 'OPEN_MODAL', selectedProjectIndex: index, projectKey: project.key })
    let response
    try {
      response = await axios.get(`${process.env.REACT_APP_API_URL}/projects/${project.key}/non-members/`)
    } catch (error) {
      console.log(error)
    }
    dispatchAdd({ type: 'SET_NON_MEMBERS', nonMembers: response.data })
  }
  const showRemoveMemberModal = async (project, index) => {
    dispatchRemove({ type: 'OPEN_MODAL', selectedProjectIndex: index, projectKey: project.key })
    let response
    try {
      response = await axios.get(`${process.env.REACT_APP_API_URL}/projects/${project.key}/members/`)
    } catch (error) {
      console.log(error)
    }
    dispatchRemove({ type: 'SET_MEMBERS', members: response.data })
  }
  const handleAddMemberOk = async () => {
    if (addMemberState.nonMembers.length === 0) {
      dispatchAdd({ type: 'CLOSE_MODAL' })
      return
    }

    if (!addMemberState.memberToAdd) {
      message.error('Please select a member to add!')
      return
    }
    dispatchAdd({ type: 'LOADING' })
    let response
    try {
      response = await axios.post(
        `${process.env.REACT_APP_API_URL}/projects/${addMemberState.projectKey}/add-member/`,
        { key: addMemberState.memberToAdd }
      )
    } catch (error) {
      message.error('There was an error, please try again.')
      console.log(error)
    }
    updateProjects(response.data, addMemberState.selectedProjectIndex)
    dispatchAdd({ type: 'CLOSE_MODAL' })
    message.success('Member was added successfully!')
  }

  const handleRemoveMemberOk = async () => {
    if (removeMemberState.members.length === 0) {
      dispatchRemove({ type: 'CLOSE_MODAL' })
      return
    }

    if (!removeMemberState.memberToRemove) {
      message.error('Please select a member to remove!')
      return
    }
    dispatchRemove({ type: 'LOADING' })
    let response
    try {
      response = await axios.post(
        `${process.env.REACT_APP_API_URL}/projects/${removeMemberState.projectKey}/remove-member/`,
        { key: removeMemberState.memberToRemove }
      )
    } catch (error) {
      message.error('There was an error, please try again.')
      console.log(error)
    }
    updateProjects(response.data, removeMemberState.selectedProjectIndex)
    dispatchRemove({ type: 'CLOSE_MODAL' })
    message.success('Member was removed successfully!')
  }

  const handleAddMemberCancel = () => {
    dispatchAdd({ type: 'CLOSE_MODAL' })
  }
  const handleRemoveMemberCancel = () => {
    dispatchRemove({ type: 'CLOSE_MODAL' })
  }
  const handleOnChangeAdd = value => {
    dispatchAdd({ type: 'SET_MEMBER_TO_ADD', memberToAdd: value })
  }

  const handleOnChangeRemove = value => {
    dispatchRemove({ type: 'SET_MEMBER_TO_REMOVE', memberToRemove: value })
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
          <button type='button' className={styles.linkButton} onClick={() => showAddMemberModal(record, index)}>
            <FontAwesomeIcon icon={faUserPlus} style={{ color: '#9664c8' }} />
          </button>
          <button type='button' className={styles.linkButton} onClick={() => showRemoveMemberModal(record, index)}>
            <FontAwesomeIcon icon={faUserMinus} style={{ color: '#f0c230' }} />
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
      <AddMemberModal state={addMemberState} handleOk={handleAddMemberOk} handleCancel={handleAddMemberCancel} handleOnChange={handleOnChangeAdd} />
      <RemoveMemberModal state={removeMemberState} handleOk={handleRemoveMemberOk} handleCancel={handleRemoveMemberCancel} handleOnChange={handleOnChangeRemove} />
    </>
  )
}

export default ProjectsTable
