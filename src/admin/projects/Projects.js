import React, { useEffect, useState } from 'react'
import useAxios from 'axios-hooks'
import ProjectsTable from './ProjectsTable'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [{ data, loading, error }] = useAxios(
    `${process.env.REACT_APP_API_URL}/projects`
  )

  useEffect(() => {
    setProjects(data)
  }, [data])

  useEffect(() => { }, [projects])

  const updateProjects = (projectToDelete) => {
    setProjects(() => projects.filter(project => project.key !== projectToDelete.key))
  }

  if (loading) return <p data-testid='loading'>Loading...</p>
  if (error) return <p data-testid='error'>Error!</p>

  return (
    <ProjectsTable projects={projects} removeProject={updateProjects} />
  )
}

export default Projects
