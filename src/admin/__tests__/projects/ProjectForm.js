import React from 'react'
import { render, cleanup } from '@testing-library/react'
import ProjectForm from '../../projects/ProjectForm'
import moment from 'moment'

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

describe('ProjectForm component', () => {
  afterEach(cleanup)

  it('matches snapshot when project is passed', () => {
    const project = {
      title: 'This is a title',
      startData: moment('2020-04-28', 'YYYY-MM-DD'),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    }
    const component = (
      <ProjectForm project={project} onFinish={jest.fn()} onFinishFailed={jest.fn()} />
    )
    const { asFragment } = render(component)
    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot when project is not passed', () => {
    const component = (
      <ProjectForm onFinish={jest.fn()} onFinishFailed={jest.fn()} />
    )
    const { asFragment } = render(component)
    expect(asFragment()).toMatchSnapshot()
  })
})
