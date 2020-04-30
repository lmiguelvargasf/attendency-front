import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render, cleanup } from '@testing-library/react'
import MembersTable from '../../members/MembersTable'

describe('MembersTable component', () => {
  afterEach(cleanup)

  it('matches snapshot no members', () => {
    const { asFragment } = render(
      <Router><MembersTable members={[]} removeMember={() => {}} /></Router>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot one project', () => {
    const BASE_API_URL = process.env.REACT_APP_API_URL
    const member = {
      key: 1,
      url: `${BASE_API_URL}/members/1`,
      firstName: 'Isaac',
      lastName: 'Newton',
      email: 'isaac.newton@gmail.com'
    }
    const { asFragment } = render(
      <Router><MembersTable members={[member]} removeMember={() => {}} /></Router>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
