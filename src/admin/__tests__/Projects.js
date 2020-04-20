import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { Projects, RemoveProjectButton } from '../Projects'
import useAxios from 'axios-hooks'
jest.mock('axios-hooks')

const TABLE_TEST_ID = 'project-table'
const fakeData = [
  {
    key: 1,
    title: 'Testing Project Alpha',
    startDate: '2020-04-18',
    description: 'This is just for testing',
    team: 'A, B, C'
  },
  {
    key: 2,
    title: 'Testing Project Beta',
    startDate: '2020-04-19',
    description: 'This is just for testing too',
    team: 'X, Y, Z'
  }
]

describe('RemoveProjectButton component', () => {
  const executeMock = jest.fn()
  const updateProjectsMock = jest.fn()
  let project

  beforeEach(() => {
    project = fakeData[0]
    useAxios.mockReturnValue([{}, executeMock])
  })

  afterEach(cleanup)

  it('matches snapshot', () => {
    const { asFragment } = render(
      <RemoveProjectButton project={project} updateProjects={updateProjectsMock} />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('execute and updateProjects are called when clicking on component', async () => {
    const { getByTestId } = render(
      <RemoveProjectButton project={project} updateProjects={updateProjectsMock} />
    )
    await fireEvent.click(getByTestId('project-1'))
    expect(executeMock).toHaveBeenCalled()
    expect(updateProjectsMock).toHaveBeenCalledWith(project)
  })
})

describe('Projects component', () => {
  afterEach(cleanup)

  describe('loading data', () => {
    beforeAll(() => {
      useAxios.mockImplementation(url => [{
        data: null,
        loading: true,
        error: null
      }])
    })

    it('matches snapshot when loading data', () => {
      const { asFragment } = render(<Projects />)
      expect(asFragment()).toMatchSnapshot()
    })

    it('renders loading', () => {
      const { getByTestId, queryByTestId } = render(<Projects />)
      expect(queryByTestId(TABLE_TEST_ID)).toBeNull()
      expect(getByTestId('loading')).not.toBeNull()
      expect(queryByTestId('error')).toBeNull()
    })
  })

  describe('error', () => {
    beforeAll(() => {
      useAxios.mockImplementation(url => [{
        data: null,
        loading: false,
        error: 'Error'
      }])
    })

    it('matches snapshot when having error', () => {
      const { asFragment } = render(<Projects />)
      expect(asFragment()).toMatchSnapshot()
    })

    it('renders error', () => {
      const { getByTestId, queryByTestId } = render(<Projects />)
      expect(queryByTestId(TABLE_TEST_ID)).toBeNull()
      expect(queryByTestId('loading')).toBeNull()
      expect(getByTestId('error')).not.toBeNull()
    })
  })

  describe('projects table', () => {
    beforeAll(() => {
      useAxios.mockImplementation(url => [{
        data: fakeData,
        loading: false,
        error: null
      }])
    })

    it('matches snapshop when displaying table', () => {
      const { asFragment } = render(<Projects />)
      expect(asFragment()).toMatchSnapshot()
    })

    it('renders projects table', async () => {
      useAxios.mockImplementation(url => [{
        data: fakeData,
        loading: false,
        error: null
      }])
      const { getByTestId, queryByTestId } = render(<Projects />)
      expect(getByTestId(TABLE_TEST_ID)).not.toBeNull()
      expect(queryByTestId('loading')).toBeNull()
      expect(queryByTestId('error')).toBeNull()
    })
  })
})
