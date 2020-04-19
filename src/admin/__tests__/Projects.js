import React from 'react'
import renderer from 'react-test-renderer'
import Projects from '../Projects'

describe('Projects component', () => {
  it('matches snapshot', () => {
    const component = renderer.create(<Projects />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
