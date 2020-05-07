import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render, cleanup } from '@testing-library/react'
import ProjectsTable from '../../projects/ProjectsTable'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})

describe('ProjectsTable component', () => {
  afterEach(cleanup)

  it('matches snapshot no projects', () => {
    const { asFragment } = render(
      <Router><ProjectsTable projects={[]} removeProject={() => {}} /></Router>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot one project', () => {
    const BASE_API_URL = process.env.REACT_APP_API_URL
    const project = {
      key: 1,
      url: `${BASE_API_URL}/projects/1`,
      title: 'Testing Project Alpha',
      startDate: '2020-04-18',
      description: 'This is just for testing',
      team: 'A, B, C'
    }
    const { asFragment } = render(
      <Router><ProjectsTable projects={[project]} removeProject={() => {}} /></Router>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
