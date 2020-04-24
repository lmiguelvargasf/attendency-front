import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import useAxios from 'axios-hooks'
import ProjectsTable from './ProjectsTable'
import CreateProject from './CreateProject'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [{ data, loading, error }] = useAxios(
    `${process.env.REACT_APP_API_URL}/projects`
  )

  useEffect(() => {
    setProjects(data)
  }, [data])

  useEffect(() => { }, [projects])

  const removeProject = (projectToDelete) => {
    setProjects(() => projects.filter(project => project.key !== projectToDelete.key))
  }

  if (loading) return <p data-testid='loading'>Loading...</p>
  if (error) return <p data-testid='error'>Error!</p>

  return (
    <Switch>
      <Route path='/admin/projects/create' component={CreateProject} />
      <Route path='/admin/projects' render={props => <ProjectsTable {...props} projects={projects} removeProject={removeProject}/>} />
    </Switch>
  )
}

export default Projects
