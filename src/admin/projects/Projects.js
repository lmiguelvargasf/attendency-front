import React, { useEffect, useReducer } from 'react'
import { Route, Switch } from 'react-router-dom'
import useAxios from 'axios-hooks'
import ProjectsTable from './ProjectsTable'
import CreateProject from './CreateProject'
import EditProject from './EditProject'

const projectReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_PROJECTS':
      return action.projects
    case 'REMOVE_PROJECT':
      return state.filter(project => project.key !== action.project.key)
    case 'ADD_PROJECT':
      return [action.project, ...state]
    case 'UPDATE_PROJECT':
      state[action.index] = action.project
      return state
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const Projects = () => {
  const [projects, dispatch] = useReducer(projectReducer, [])
  const [{ data, loading, error }] = useAxios(
    `${process.env.REACT_APP_API_URL}/projects`
  )

  useEffect(() => {
    dispatch({ type: 'LOAD_PROJECTS', projects: data })
  }, [data])

  const removeProject = (project) => {
    dispatch({ type: 'REMOVE_PROJECT', project })
  }
  const addProject = (project) => {
    dispatch({ type: 'ADD_PROJECT', project })
  }
  const updateProjects = (project, index) => {
    dispatch({ type: 'UPDATE_PROJECT', project, index })
  }

  if (loading) return <p data-testid='loading'>Loading...</p>
  if (error) return <p data-testid='error'>Error!</p>

  return (
    <Switch>
      <Route path='/admin/projects/create' render={props => <CreateProject {...props} addProject={addProject} />} />
      <Route path='/admin/projects/:key/edit' render={props => <EditProject {...props} updateProjects={updateProjects} />} />
      <Route path='/admin/projects' render={props => <ProjectsTable {...props} projects={projects} removeProject={removeProject} />} />
    </Switch>
  )
}

export default Projects
