import React from 'react'
import { useHistory } from 'react-router-dom'
import { message } from 'antd'
import useAxios from 'axios-hooks'
import PropTypes from 'prop-types'
import ProjectForm from './ProjectForm'

const CreateProject = ({ addProject }) => {
  const history = useHistory()
  const [, createProject] = useAxios(
    {
      url: `${process.env.REACT_APP_API_URL}/projects/`,
      method: 'post',
      headers: {
        Authorization: `JWT ${window.localStorage.getItem('token')}`
      }
    },
    { manual: true }
  )

  const onFinish = async values => {
    values.startDate = values.startDate.toDate().toISOString().slice(0, 10)
    let project
    try {
      const { data } = await createProject({ data: values })
      project = data
    } catch (error) {
      message.error('There was an error, please try again.')
      console.log(error)
      return
    }
    addProject(project)
    message.success({ content: `${project.title} project was created sucessfully`, duration: 3 })
    history.push('/admin/projects')
  }

  const onFinishFailed = errorInfo => {}

  return (
    <>
      <h2>Create Project</h2>
      <ProjectForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
    </>
  )
}

CreateProject.propTypes = {
  addProject: PropTypes.func
}

export default CreateProject
