import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render, cleanup } from '@testing-library/react'
import CreateProject from '../../projects/CreateProject'
import useAxios from 'axios-hooks'
jest.mock('axios-hooks')

const project = {
  key: 1,
  url: '/projects/10',
  title: 'Testing Project Alpha',
  startDate: '2020-04-18',
  description: 'This is just for testing',
  team: 'A, B, C'
}

describe('CreateProject component', () => {
  const addProjectMock = jest.fn()
  const createProjectMock = jest.fn().mockReturnValue({
    data: project
  })
  let component

  beforeEach(() => {
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

    useAxios.mockReturnValue([{}, createProjectMock])
    component = <Router><CreateProject addProject={addProjectMock} /></Router>
  })

  afterEach(cleanup)

  it('matches snapshot', () => {
    const { asFragment } = render(component)
    expect(asFragment()).toMatchSnapshot()
  })
})
