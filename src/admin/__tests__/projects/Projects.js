import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Projects from '../../projects/Projects'
import useAxios from 'axios-hooks'
jest.mock('axios-hooks')

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

const TABLE_TEST_ID = 'project-table'
const fakeData = [
  {
    key: 1,
    url: '/projects/1',
    title: 'Testing Project Alpha',
    startDate: '2020-04-18',
    description: 'This is just for testing',
    team: 'A, B, C'
  },
  {
    key: 2,
    url: '/projects/2',
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
      expect(queryByTestId('create-project-form')).toBeNull()
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
      expect(queryByTestId('create-project-form')).toBeNull()
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
        expect(queryByTestId('create-project-form')).toBeNull()
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

      it('renders create project form', () => {
        const { getByTestId, queryByTestId } = render(component)
        expect(queryByTestId(TABLE_TEST_ID)).toBeNull()
        expect(queryByTestId('loading')).toBeNull()
        expect(queryByTestId('error')).toBeNull()
        expect(getByTestId('create-project-form')).not.toBeNull()
      })
    })
  })
})
