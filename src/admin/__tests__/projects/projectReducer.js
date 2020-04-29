import projectReducer from '../../projects/projectReducer'

const projects = [{ key: 1, title: 'Lorem' }, { key: 2, title: 'Ipsum' }]

describe('projectReducer', () => {
  let newState

  beforeEach(() => {
    newState = projectReducer([], { type: 'LOAD', projects })
  })

  it('loads projects', () => {
    expect(newState).toBe(projects)
  })

  it('removes project', () => {
    const project = { key: 1, title: 'Lorem' }
    newState = projectReducer(newState, { type: 'REMOVE', project })

    expect(newState).toHaveLength(1)
    expect(newState).not.toContain(project)
  })

  it('adds new project', () => {
    const project = { key: 3 }
    newState = projectReducer(newState, { type: 'ADD', project })

    expect(newState).toHaveLength(3)
    expect(newState).toContain(project)
  })

  it('updates project', () => {
    const project = { key: 1, title: 'Updated' }
    newState = projectReducer(newState, { type: 'UPDATE', index: 0, project })

    expect(newState).toHaveLength(2)
    expect(newState).toContain(project)
    expect(newState[0].title).toEqual('Updated')
  })

  it('raises exception', () => {
    expect(() => {
      newState = projectReducer(newState, { type: 'UNKNOWN' })
    }).toThrow(Error)
  })
})
