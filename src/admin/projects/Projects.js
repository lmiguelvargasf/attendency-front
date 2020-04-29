import React, { useEffect, useReducer } from 'react'
import { Route, Switch } from 'react-router-dom'
import useAxios from 'axios-hooks'
import ProjectsTable from './ProjectsTable'
import CreateProject from './CreateProject'
import EditProject from './EditProject'
import projectReducer from './projectReducer'

const Projects = () => {
  const [projects, dispatch] = useReducer(projectReducer, [])
  const [{ data, loading, error }] = useAxios(
    `${process.env.REACT_APP_API_URL}/projects`
  )

  useEffect(() => {
    dispatch({ type: 'LOAD_PROJECTS', projects: data })
  }, [data])

  if (loading) return <p data-testid='loading'>Loading...</p>
  if (error) return <p data-testid='error'>Error!</p>

  return (
    <Switch>
      <Route
        path='/admin/projects/create'
        render={props => <CreateProject {...props} addProject={project => dispatch({ type: 'ADD_PROJECT', project })} />}
      />
      <Route
        path='/admin/projects/:key/edit'
        render={props => <EditProject {...props} updateProjects={(project, index) => dispatch({ type: 'UPDATE_PROJECT', project, index })} />}
      />
      <Route
        path='/admin/projects'
        render={props => <ProjectsTable {...props} projects={projects} removeProject={project => dispatch({ type: 'REMOVE_PROJECT', project })} />}
      />
    </Switch>
  )
}

export default Projects
