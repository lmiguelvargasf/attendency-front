import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render, cleanup } from '@testing-library/react'
import CreateProject from '../CreateProject'

describe('CreateProject component', () => {
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
  afterEach(cleanup)
  it('matches snapshot', () => {
    const { asFragment } = render(<Router><CreateProject /></Router>)
    expect(asFragment()).toMatchSnapshot()
  })
})
