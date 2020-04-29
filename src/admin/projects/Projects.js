import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import useAxios from 'axios-hooks'
import ProjectsTable from './ProjectsTable'
import CreateProject from './CreateProject'
import EditProject from './EditProject'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [{ data, loading, error }] = useAxios(
    `${process.env.REACT_APP_API_URL}/projects`
  )

  useEffect(() => { setProjects(data) }, [data])

  const removeProject = (projectToDelete) => {
    setProjects(() => projects.filter(project => project.key !== projectToDelete.key))
  }
  const addProject = (project) => {
    setProjects(projects => [project, ...projects])
  }
  const updateProjects = (updatedProject, index) => {
    projects[index] = updatedProject
    setProjects(projects)
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
