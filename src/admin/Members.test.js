import React from 'react'
import renderer from 'react-test-renderer'
import Members from './Members'

it('renders Projects component properly', () => {
  const tree = renderer.create(<Members />)
  expect(tree).toMatchSnapshot()
})
