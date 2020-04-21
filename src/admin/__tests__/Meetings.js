import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Meetings from '../Meetings'
import useAxios from 'axios-hooks'
jest.mock('axios-hooks')

const BASE_API_URL = process.env.REACT_APP_API_URL
const TABLE_TEST_ID = 'meeting-table'
const fakeData = [
  {
    key: 1,
    url: `${BASE_API_URL}/meetings/1`,
    project: 'Testing Project',
    date: '2020-04-18',
    time: '18:00'
  },
  {
    key: 2,
    url: `${BASE_API_URL}/meetings/2`,
    project: 'Another Testing Project',
    date: '2020-04-18',
    time: '18:00'
  }
]

describe('Meetings component', () => {
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
      const { asFragment } = render(<Meetings />)
      expect(asFragment()).toMatchSnapshot()
    })

    it('renders loading', () => {
      const { getByTestId, queryByTestId } = render(<Meetings />)
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
      const { asFragment } = render(<Meetings />)
      expect(asFragment()).toMatchSnapshot()
    })

    it('renders error', () => {
      const { getByTestId, queryByTestId } = render(<Meetings />)
      expect(queryByTestId(TABLE_TEST_ID)).toBeNull()
      expect(queryByTestId('loading')).toBeNull()
      expect(getByTestId('error')).not.toBeNull()
    })
  })

  describe('meetings table', () => {
    beforeAll(() => {
      useAxios.mockReturnValue([{
        data: fakeData,
        loading: false,
        error: null
      }])
    })

    it('matches snapshop when displaying table', () => {
      const { asFragment } = render(<Meetings />)
      expect(asFragment()).toMatchSnapshot()
    })

    it('renders meetings table', async () => {
      useAxios.mockImplementation(url => [{
        data: fakeData,
        loading: false,
        error: null
      }])
      const { getByTestId, queryByTestId } = render(<Meetings />)
      expect(getByTestId(TABLE_TEST_ID)).not.toBeNull()
      expect(queryByTestId('loading')).toBeNull()
      expect(queryByTestId('error')).toBeNull()
    })
  })
})
