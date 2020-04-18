import React from 'react'
import renderer from 'react-test-renderer'
import Meetings from './Meetings'

it('renders Meetings component properly', () => {
  const tree = renderer.create(<Meetings />)
  expect(tree).toMatchSnapshot()
})
