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

  describe('project is passed', () => {
    let component
    beforeEach(() => {
      const project = {
        title: 'This is a title',
        startData: moment('2020-04-28', 'YYYY-MM-DD'),
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      }
      component = (
        <ProjectForm project={project} onFinish={jest.fn()} onFinishFailed={jest.fn()} />
      )
    })
    it('matches snapshot', () => {
      const { asFragment } = render(component)
      expect(asFragment()).toMatchSnapshot()
    })

    it('displays button saying Save', () => {
      const { getByTestId } = render(component)
      expect(getByTestId('create-save-button')).toHaveTextContent(/^Save$/)
    })
  })

  describe('project is not passed', () => {
    let component

    beforeEach(() => {
      component = (
        <ProjectForm onFinish={jest.fn()} onFinishFailed={jest.fn()} />
      )
    })

    it('matches snapshot', () => {
      const { asFragment } = render(component)
      expect(asFragment()).toMatchSnapshot()
    })

    it('displays button saying Create', () => {
      const { getByTestId } = render(component)
      expect(getByTestId('create-save-button')).toHaveTextContent(/^Create$/)
    })
  })
})
