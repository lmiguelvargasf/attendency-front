import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Members from '../Members'
import useAxios from 'axios-hooks'
jest.mock('axios-hooks')

const BASE_API_URL = process.env.REACT_APP_API_URL
const TABLE_TEST_ID = 'member-table'
const fakeData = [
  {
    key: 1,
    url: `${BASE_API_URL}/members/1`,
    firstName: 'Isaac',
    lastName: 'Newton',
    email: 'isaac.newton@gmail.com'
  },
  {
    key: 2,
    url: `${BASE_API_URL}/members/2`,
    firstName: 'Nikola',
    lastName: 'Tesla',
    email: 'nikola.tesla@gmail.com'
  }
]

describe('Members component', () => {
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
      const { asFragment } = render(<Members />)
      expect(asFragment()).toMatchSnapshot()
    })

    it('renders loading', () => {
      const { getByTestId, queryByTestId } = render(<Members />)
      expect(queryByTestId(TABLE_TEST_ID)).toBeNull()
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
      const { asFragment } = render(<Members />)
      expect(asFragment()).toMatchSnapshot()
    })

    it('renders error', () => {
      const { getByTestId, queryByTestId } = render(<Members />)
      expect(queryByTestId(TABLE_TEST_ID)).toBeNull()
      expect(queryByTestId('loading')).toBeNull()
      expect(getByTestId('error')).not.toBeNull()
    })
  })

  describe('members table', () => {
    beforeAll(() => {
      useAxios.mockImplementation(url => [{
        data: fakeData,
        loading: false,
        error: null
      }])
    })

    it('matches snapshop when displaying table', () => {
      const { asFragment } = render(<Members />)
      expect(asFragment()).toMatchSnapshot()
    })

    it('renders members table', async () => {
      useAxios.mockImplementation(url => [{
        data: fakeData,
        loading: false,
        error: null
      }])
      const { getByTestId, queryByTestId } = render(<Members />)
      expect(getByTestId(TABLE_TEST_ID)).not.toBeNull()
      expect(queryByTestId('loading')).toBeNull()
      expect(queryByTestId('error')).toBeNull()
    })
  })
})
