import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { Projects } from '../Projects'
import useAxios from 'axios-hooks'
jest.mock('axios-hooks')

const TABLE_TEST_ID = 'project-table'
const fakeData = [
  {
    key: 1,
    title: 'Testing Project Alpha',
    startDate: '2020-04-18',
    description: 'This is just for testing',
    team: 'A, B, C'
  },
  {
    key: 2,
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

  describe('projects table', () => {
    let projects

    beforeEach(() => {
      projects = JSON.parse(JSON.stringify(fakeData))
      useAxios.mockReturnValue([{
        data: projects,
        loading: false,
        error: null
      }])
    })

    it('matches snapshop when displaying table', () => {
      const { asFragment } = render(<Projects />)
      expect(asFragment()).toMatchSnapshot()
    })

    it('renders projects table', async () => {
      const { getByTestId, queryByTestId } = render(<Projects />)
      expect(getByTestId(TABLE_TEST_ID)).not.toBeNull()
      expect(queryByTestId('loading')).toBeNull()
      expect(queryByTestId('error')).toBeNull()
    })

    it('removes project in table when clicking on X', async () => {
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
      const { getByTestId, findByTestId } = render(<Projects />)
      expect(getByTestId('project-table')).toHaveTextContent('Testing Project Alpha')
      fireEvent.click(getByTestId('project-1'))
      const table = await findByTestId('project-table')
      expect(table).not.toHaveTextContent('Testing Project Alpha')
    })
  })
})
