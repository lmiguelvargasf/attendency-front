import removeMemberReducer from '../../projects/removeMemberReducer'

describe('removeMemberReducer', () => {
  it('open modal', () => {
    const newState = removeMemberReducer({}, {
      type: 'OPEN_MODAL',
      projectKey: 1,
      selectedProjectIndex: 0
    })
    expect(newState.visible).toBe(true)
    expect(newState.projectKey).toBe(1)
    expect(newState.selectedProjectIndex).toBe(0)
  })

  it('loading', () => {
    const newState = removeMemberReducer({}, { type: 'LOADING' })
    expect(newState.confirmLoading).toBe(true)
  })

  it('set members', () => {
    const members = [{ key: 1 }, { key: 2 }]
    const newState = removeMemberReducer({}, {
      type: 'SET_MEMBERS',
      members
    })
    expect(newState.members).toEqual(members)
  })

  it('set member to add', () => {
    const memberToRemove = 1
    const newState = removeMemberReducer({}, {
      type: 'SET_MEMBER_TO_REMOVE',
      memberToRemove
    })
    expect(newState.memberToRemove).toEqual(memberToRemove)
  })

  it('close modal', () => {
    const newState = removeMemberReducer({}, {
      type: 'CLOSE_MODAL'
    })
    expect(newState.visible).toBe(false)
    expect(newState.confirmLoading).toBe(false)
    expect(newState.memberToRemove).toBeNull()
  })

  it('raises exception', () => {
    expect(() => {
      removeMemberReducer({}, { type: 'UNKNOWN' })
    }).toThrow(Error)
  })
})
