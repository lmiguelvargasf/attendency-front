import React from 'react'
import renderer from 'react-test-renderer'
import Members from '../Members'

it('renders Members component properly', () => {
  const component = renderer.create(<Members />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
