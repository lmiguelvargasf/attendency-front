import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Members from '../members/Members'
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
      expect(queryByTestId('create-member-form')).toBeNull()
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
      expect(queryByTestId('create-member-form')).toBeNull()
      expect(getByTestId('error')).not.toBeNull()
    })
  })

  describe('members data is retrieved sucessfully', () => {
    let members
    let component
    let history

    describe('members table', () => {
      beforeEach(() => {
        members = JSON.parse(JSON.stringify(fakeData))
        useAxios.mockReturnValue([{
          data: members,
          loading: false,
          error: null
        }])
        history = createMemoryHistory()
        history.push('/admin/members')
        component = <Router history={history}><Members /></Router>
      })

      it('matches snapshop', () => {
        const { asFragment } = render(component)
        expect(asFragment()).toMatchSnapshot()
      })

      it('renders members table', async () => {
        const { getByTestId, queryByTestId } = render(component)
        expect(getByTestId(TABLE_TEST_ID)).not.toBeNull()
        expect(queryByTestId('loading')).toBeNull()
        expect(queryByTestId('error')).toBeNull()
        expect(queryByTestId('create-member-form')).toBeNull()
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
        const { getByTestId, findByTestId } = render(component)
        expect(getByTestId(TABLE_TEST_ID)).toHaveTextContent(member.email)
        fireEvent.click(getByTestId(member.url))
        const table = await findByTestId(TABLE_TEST_ID)
        expect(table).not.toHaveTextContent(member.email)
      })
    })

    describe('renders create member form', () => {
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
        members = JSON.parse(JSON.stringify(fakeData))
        useAxios.mockReturnValue([{
          data: members,
          loading: false,
          error: null
        }])
        history = createMemoryHistory()
        history.push('/admin/members/create')
        component = <Router history={history}><Members /></Router>
      })

      it('matches snapshop', () => {
        const { asFragment } = render(component)
        expect(asFragment()).toMatchSnapshot()
      })

      it('renders create member form', () => {
        const { getByTestId, queryByTestId } = render(component)
        expect(queryByTestId(TABLE_TEST_ID)).toBeNull()
        expect(queryByTestId('loading')).toBeNull()
        expect(queryByTestId('error')).toBeNull()
        expect(getByTestId('create-member-form')).not.toBeNull()
      })
    })
  })
})
