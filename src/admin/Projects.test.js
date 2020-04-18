import React from 'react'
import renderer from 'react-test-renderer'
import Projects from './Projects'

it(' renders Projects component properly', () => {
  const tree = renderer.create(<Projects />)
  expect(tree).toMatchSnapshot()
})
