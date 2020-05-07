import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, cleanup, fireEvent, getByText } from '@testing-library/react'
import Meetings from '../../meetings/Meetings'
import useAxios from 'axios-hooks'
jest.mock('axios-hooks')

const BASE_API_URL = process.env.REACT_APP_API_URL
const TABLE_TEST_ID = 'meeting-table'
const fakeData = [
  {
    key: 1,
    url: `${BASE_API_URL}/meeting-table/1`,
    projectTitle: 'Testing Project XYZ',
    date: '2020-04-18',
    time: '18:00'
  },
  {
    key: 2,
    url: `${BASE_API_URL}/meeting-table/2`,
    projectTitle: 'Another Testing Project',
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
    let meetings

    beforeEach(() => {
      meetings = JSON.parse(JSON.stringify(fakeData))
      useAxios.mockReturnValue([{
        data: meetings,
        loading: false,
        error: null
      }])
    })

    describe('meetings data is retrieved successfully', () => {
      let meetings
      let component
      let history

      describe('meetings table', () => {
        beforeEach(() => {
          meetings = JSON.parse(JSON.stringify(fakeData))
          useAxios.mockReturnValue([{
            data: meetings,
            loading: false,
            error: null
          }])
          history = createMemoryHistory()
          history.push('/admin/meetings')
          component = <Router history={history}><Meetings /></Router>
        })

        it('matches snapshop', () => {
          const { asFragment } = render(component)
          expect(asFragment()).toMatchSnapshot()
        })

        it('renders meetings table', async () => {
          const { getByTestId, queryByTestId } = render(component)
          expect(getByTestId(TABLE_TEST_ID)).not.toBeNull()
          expect(queryByTestId('loading')).toBeNull()
          expect(queryByTestId('error')).toBeNull()
        })

        it('removes meeting in table when clicking on X', async () => {
          const meeting = meetings[0]
          const executeMock = jest.fn()
          useAxios.mockImplementation((...args) => {
            switch (args.length) {
              case 1:
                return [{
                  data: meetings,
                  loading: false,
                  error: null
                }]
              case 2:
                return [{}, executeMock]
              default: break
            }
          })
          const { getByTestId, findByTestId, getByText } = render(component)
          expect(getByTestId(TABLE_TEST_ID)).toHaveTextContent(meeting.projectTitle)
          fireEvent.click(getByTestId(meeting.url))
          fireEvent.click(getByText('OK'))
          const table = await findByTestId(TABLE_TEST_ID)
          expect(table).not.toHaveTextContent(meeting.projectTitle)
        })
      })
    })
  })
})
