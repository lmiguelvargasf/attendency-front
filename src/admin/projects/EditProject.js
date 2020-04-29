import React from 'react'
import { message } from 'antd'
import { useHistory, useLocation } from 'react-router-dom'
import useAxios from 'axios-hooks'
import moment from 'moment'
import ProjectForm from './ProjectForm'

const EditProject = ({ updateProjects }) => {
  const history = useHistory()
  const location = useLocation()
  const projectFromTable = location.state.project
  const project = {
    ...projectFromTable,
    startDate: moment(projectFromTable.startDate, 'YYYY-MM-DD')
  }
  const [, updateProject] = useAxios(
    {
      url: `${process.env.REACT_APP_API_URL}/projects/${project.key}/`,
      method: 'put'
    },
    { manual: true }
  )

  const onFinish = async values => {
    values.startDate = values.startDate.toDate().toISOString().slice(0, 10)
    let updatedProject
    try {
      const { data } = await updateProject({ data: values })
      updatedProject = data
    } catch (error) {
      message.error('There was an error, please try again.')
      console.log(error)
      return
    }
    updateProjects(updatedProject, location.state.index)
    message.success({ content: `${project.title} project was updated sucessfully`, duration: 3 })
    history.push('/admin/projects')
  }
  const onFinishFailed = errorInfo => {
    console.log(errorInfo)
  }

  return (
    <>
      <h2>Edit Project</h2>
      <ProjectForm project={project} onFinish={onFinish} onFinishFailed={onFinishFailed} />
    </>
  )
}

export default EditProject
