import React from 'react'
import { render, cleanup } from '@testing-library/react'
import MemberForm from '../../members/MemberForm'

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

describe('MemberForm component', () => {
  afterEach(cleanup)

  describe('member is passed', () => {
    let component
    beforeEach(() => {
      const member = {
        firstName: 'John',
        middleName: 'Patrick',
        lastName: 'Smith',
        preferredName: 'JP',
        email: 'john.smith@example.com'
      }
      component = (
        <MemberForm member={member} onFinish={jest.fn()} onFinishFailed={jest.fn()} />
      )
    })
    it('matches snapshot', () => {
      const { asFragment } = render(component)
      expect(asFragment()).toMatchSnapshot()
    })

    it('displays button saying Save', () => {
      const { getByTestId } = render(component)
      expect(getByTestId('create-save-button')).toHaveTextContent(/^Save$/)
    })
  })

  describe('member is not passed', () => {
    let component

    beforeEach(() => {
      component = (
        <MemberForm onFinish={jest.fn()} onFinishFailed={jest.fn()} />
      )
    })

    it('matches snapshot', () => {
      const { asFragment } = render(component)
      expect(asFragment()).toMatchSnapshot()
    })

    it('displays button saying Create', () => {
      const { getByTestId } = render(component)
      expect(getByTestId('create-save-button')).toHaveTextContent(/^Create$/)
    })
  })
})
