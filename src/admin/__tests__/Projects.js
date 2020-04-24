import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Projects from '../projects/Projects'
import useAxios from 'axios-hooks'
jest.mock('axios-hooks')

const BASE_API_URL = process.env.REACT_APP_API_URL
const TABLE_TEST_ID = 'project-table'
const fakeData = [
  {
    key: 1,
    url: `${BASE_API_URL}/projects/1`,
    title: 'Testing Project Alpha',
    startDate: '2020-04-18',
    description: 'This is just for testing',
    team: 'A, B, C'
  },
  {
    key: 2,
    url: `${BASE_API_URL}/projects/2`,
    title: 'Testing Project Beta',
    startDate: '2020-04-19',
    description: 'This is just for testing too',
    team: 'X, Y, Z'
  }
]

describe('Projects component', () => {
  afterEach(cleanup)

  describe('loading data', () => {
    beforeAll(() => {
      useAxios.mockReturnValue([{
        data: null,
        loading: true,
        error: null
      }])
    })

    it('matches snapshot when loading data', () => {
      const { asFragment } = render(<Projects />)
      expect(asFragment()).toMatchSnapshot()
    })

    it('renders loading', () => {
      const { getByTestId, queryByTestId } = render(<Projects />)
      expect(queryByTestId(TABLE_TEST_ID)).toBeNull()
      expect(getByTestId('loading')).not.toBeNull()
      expect(queryByTestId('error')).toBeNull()
    })
  })

  describe('error', () => {
    beforeAll(() => {
      useAxios.mockReturnValue([{
        data: null,
        loading: false,
        error: 'Error'
      }])
    })

    it('matches snapshot when having error', () => {
      const { asFragment } = render(<Projects />)
      expect(asFragment()).toMatchSnapshot()
    })

    it('renders error', () => {
      const { getByTestId, queryByTestId } = render(<Projects />)
      expect(queryByTestId(TABLE_TEST_ID)).toBeNull()
      expect(queryByTestId('loading')).toBeNull()
      expect(getByTestId('error')).not.toBeNull()
    })
  })

  describe('projects data is retrieved sucessfully', () => {
    let projects
    let component
    let history

    describe('table of projects', () => {
      beforeEach(() => {
        projects = JSON.parse(JSON.stringify(fakeData))
        useAxios.mockReturnValue([{
          data: projects,
          loading: false,
          error: null
        }])
        history = createMemoryHistory()
        history.push('/admin/projects')
        component = <Router history={history}><Projects /></Router>
      })

      it('matches snapshop', () => {
        const { asFragment } = render(component)
        expect(asFragment()).toMatchSnapshot()
      })

      it('renders projects table', async () => {
        const { getByTestId, queryByTestId } = render(component)
        expect(getByTestId(TABLE_TEST_ID)).not.toBeNull()
        expect(queryByTestId('loading')).toBeNull()
        expect(queryByTestId('error')).toBeNull()
      })

      it('removes project in table when clicking on X', async () => {
        const project = projects[0]
        const executeMock = jest.fn()
        useAxios.mockImplementation((...args) => {
          switch (args.length) {
            case 1:
              return [{
                data: projects,
                loading: false,
                error: null
              }]
            case 2:
              return [{}, executeMock]
            default: break
          }
        })
        const { getByTestId, findByTestId } = render(component)
        expect(getByTestId(TABLE_TEST_ID)).toHaveTextContent(project.title)
        fireEvent.click(getByTestId(project.url))
        const table = await findByTestId(TABLE_TEST_ID)
        expect(table).not.toHaveTextContent(project.title)
      })
    })

    describe('renders create project form', () => {
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
        projects = JSON.parse(JSON.stringify(fakeData))
        useAxios.mockReturnValue([{
          data: projects,
          loading: false,
          error: null
        }])
        history = createMemoryHistory()
        history.push('/admin/projects/create')
        component = <Router history={history}><Projects /></Router>
      })

      it('matches snapshop', () => {
        const { asFragment } = render(component)
        expect(asFragment()).toMatchSnapshot()
      })
    })
  })
})
