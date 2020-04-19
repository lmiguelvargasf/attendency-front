import React from 'react'
import renderer from 'react-test-renderer'
import Meetings from '../Meetings'

it('renders Meetings component properly', () => {
  const component = renderer.create(<Meetings />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
