import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Projects from '../Projects'
import useAxios from 'axios-hooks'
jest.mock('axios-hooks')

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
      useAxios.mockImplementation(url => [{
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
      expect(queryByTestId('project-table')).toBeNull()
      expect(getByTestId('loading')).not.toBeNull()
      expect(queryByTestId('error')).toBeNull()
    })
  })

  describe('error', () => {
    beforeAll(() => {
      useAxios.mockImplementation(url => [{
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
      expect(queryByTestId('project-table')).toBeNull()
      expect(queryByTestId('loading')).toBeNull()
      expect(getByTestId('error')).not.toBeNull()
    })
  })

  describe('projects table', () => {
    beforeAll(() => {
      useAxios.mockImplementation(url => [{
        data: fakeData,
        loading: false,
        error: null
      }])
    })

    it('matches snapshop when displaying table', () => {
      const { asFragment } = render(<Projects />)
      expect(asFragment()).toMatchSnapshot()
    })

    it('renders projects table', async () => {
      useAxios.mockImplementation(url => [{
        data: fakeData,
        loading: false,
        error: null
      }])
      const { getByTestId, queryByTestId } = render(<Projects />)
      expect(getByTestId('project-table')).not.toBeNull()
      expect(queryByTestId('loading')).toBeNull()
      expect(queryByTestId('error')).toBeNull()
    })
  })
})
