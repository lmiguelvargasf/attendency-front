import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Projects from '../Projects'

describe('Projects component', () => {

  afterEach(cleanup)

  it('matches snapshot', () => {
    const { asFragment } = render(<Projects />)
    expect(asFragment()).toMatchSnapshot()
  })
})
