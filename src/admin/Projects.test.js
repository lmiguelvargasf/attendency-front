import React from 'react'
import renderer from 'react-test-renderer'
import Projects from './Projects'

it('renders Projects component properly', () => {
  const component = renderer.create(<Projects />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
