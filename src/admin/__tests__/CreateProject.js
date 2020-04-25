import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render, cleanup } from '@testing-library/react'
import CreateProject from '../projects/CreateProject'
import useAxios from 'axios-hooks'
jest.mock('axios-hooks')

const BASE_API_URL = process.env.REACT_APP_API_URL

describe('CreateProject component', () => {
  const addProjectMock = jest.fn()
  const createProjectMock = jest.fn().mockReturnValue({
    data: {
      key: 1,
      url: `${BASE_API_URL}/projects/10`,
      title: 'Testing Project Alpha',
      startDate: '2020-04-18',
      description: 'This is just for testing',
      team: 'A, B, C'
    }
  })
  let component

  beforeAll(() => {
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
  })

  beforeEach(() => {
    useAxios.mockReturnValue([{}, createProjectMock])
    component = <Router><CreateProject /></Router>
  })

  afterEach(cleanup)

  it('matches snapshot', () => {
    const { asFragment } = render(component)
    expect(asFragment()).toMatchSnapshot()
  })
})
