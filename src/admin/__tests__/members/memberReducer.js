import memberReducer from '../../members/memberReducer'

const members = [{ key: 1, firstName: 'John' }, { key: 2, firstName: 'Peter' }]

describe('memberReducer', () => {
  let newState

  beforeEach(() => {
    newState = memberReducer([], { type: 'LOAD', members: members })
  })

  it('loads members', () => {
    expect(newState).toBe(members)
  })

  it('removes member', () => {
    const member = { key: 1, firstName: 'John' }
    newState = memberReducer(newState, { type: 'REMOVE', member: member })

    expect(newState).toHaveLength(1)
    expect(newState).not.toContain(member)
  })

  it('adds new member', () => {
    const member = { key: 3, firstName: 'Keith' }
    newState = memberReducer(newState, { type: 'ADD', member })

    expect(newState).toHaveLength(3)
    expect(newState).toContain(member)
  })

  it('updates member', () => {
    const member = { key: 1, firstName: 'Leonard' }
    newState = memberReducer(newState, { type: 'UPDATE', index: 0, member })

    expect(newState).toHaveLength(2)
    expect(newState).toContain(member)
    expect(newState[0].firstName).toEqual('Leonard')
  })

  it('raises exception', () => {
    expect(() => {
      newState = memberReducer(newState, { type: 'UNKNOWN' })
    }).toThrow(Error)
  })
})
