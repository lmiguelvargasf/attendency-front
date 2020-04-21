import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
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
      useAxios.mockReturnValue([{
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
      useAxios.mockReturnValue([{
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
    let members

    beforeEach(() => {
      members = JSON.parse(JSON.stringify(fakeData))
      useAxios.mockReturnValue([{
        data: members,
        loading: false,
        error: null
      }])
    })

    it('matches snapshop when displaying table', () => {
      const { asFragment } = render(<Members />)
      expect(asFragment()).toMatchSnapshot()
    })

    it('renders members table', async () => {
      const { getByTestId, queryByTestId } = render(<Members />)
      expect(getByTestId(TABLE_TEST_ID)).not.toBeNull()
      expect(queryByTestId('loading')).toBeNull()
      expect(queryByTestId('error')).toBeNull()
    })

    it('removes member in table when clicking on X', async () => {
      const member = members[0]
      const executeMock = jest.fn()
      useAxios.mockImplementation((...args) => {
        switch (args.length) {
          case 1:
            return [{
              data: members,
              loading: false,
              error: null
            }]
          case 2:
            return [{}, executeMock]
          default: break
        }
      })
      const { getByTestId, findByTestId } = render(<Members />)
      expect(getByTestId(TABLE_TEST_ID)).toHaveTextContent(member.email)
      fireEvent.click(getByTestId(member.url))
      const table = await findByTestId(TABLE_TEST_ID)
      expect(table).not.toHaveTextContent(member.email)
    })
  })
})
