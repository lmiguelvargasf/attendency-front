import React, { useEffect, useReducer } from 'react'
import { Route, Switch } from 'react-router-dom'
import useAxios from 'axios-hooks'
import ProjectsTable from './ProjectsTable'
import CreateProject from './CreateProject'
import EditProject from './EditProject'
import projectReducer from './projectReducer'

const Projects = () => {
  const [projects, dispatch] = useReducer(projectReducer, [])
  const [{ data, loading, error }] = useAxios({
    url: '/projects/'
  })
  useEffect(() => { dispatch({ type: 'LOAD', projects: data }) }, [data])

  if (loading) return <p data-testid='loading'>Loading...</p>
  if (error) return <p data-testid='error'>Error!</p>

  return (
    <Switch>
      <Route
        path='/admin/projects/create'
        render={props => <CreateProject {...props} addProject={project => dispatch({ type: 'ADD', project })} />}
      />
      <Route
        path='/admin/projects/:key/edit'
        render={props => <EditProject {...props} updateProjects={(project, index) => dispatch({ type: 'UPDATE', project, index })} />}
      />
      <Route
        path='/admin/projects'
        render={props => (
          <ProjectsTable
            {...props}
            projects={projects}
            removeProject={project => dispatch({ type: 'REMOVE', project })}
            updateProjects={(project, index) => dispatch({ type: 'UPDATE', project, index })}
          />
        )}
      />
    </Switch>
  )
}

export default Projects
