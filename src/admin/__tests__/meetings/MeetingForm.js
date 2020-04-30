import React from 'react'
import { render, cleanup } from '@testing-library/react'
import MeetingForm from '../../meetings/MeetingForm'
import moment from 'moment'

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

describe('MeetingForm component', () => {
  afterEach(cleanup)

  describe('meeting is passed', () => {
    let component
    beforeEach(() => {
      const meeting = {
        project: 'My Project',
        date: moment('2020-04-30', 'YYYY-MM-DD'),
        time: moment('17:00', 'HH:mm')
      }
      component = (
        <MeetingForm meeting={meeting} onFinish={jest.fn()} onFinishFailed={jest.fn()} />
      )
    })
    it('matches snapshot', () => {
      const { asFragment } = render(component)
      expect(asFragment()).toMatchSnapshot()
    })

    it('displays button saying Save and disabled input and not select', () => {
      const { getByTestId, queryByTestId } = render(component)
      expect(getByTestId('create-save-button')).toHaveTextContent(/^Save$/)
      expect(getByTestId('disabled-input')).not.toBeNull()
      expect(queryByTestId('select-project')).toBeNull()
    })
  })

  describe('meeting is not passed', () => {
    let component

    beforeEach(() => {
      const projects = [
        { key: 1, title: 'Project 1' },
        { key: 2, title: 'Project 2' }
      ]
      component = (
        <MeetingForm onFinish={jest.fn()} onFinishFailed={jest.fn()} projects={projects} />
      )
    })

    it('matches snapshot', () => {
      const { asFragment } = render(component)
      expect(asFragment()).toMatchSnapshot()
    })

    it('displays button saying Create and select and not disabled input', () => {
      const { getByTestId, queryByTestId } = render(component)
      expect(getByTestId('create-save-button')).toHaveTextContent(/^Create$/)
      expect(getByTestId('select-project')).not.toBeNull()
      expect(queryByTestId('disabled-input')).toBeNull()
    })
  })
})
