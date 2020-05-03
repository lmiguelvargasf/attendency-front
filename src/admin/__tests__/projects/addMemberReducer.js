import addMemberReducer from '../../projects/addMemberReducer'

describe('addMemberReducer', () => {
  it('open modal', () => {
    const newState = addMemberReducer({}, {
      type: 'OPEN_MODAL',
      projectKey: 1,
      selectedProjectIndex: 0
    })
    expect(newState.visible).toBe(true)
    expect(newState.projectKey).toBe(1)
    expect(newState.selectedProjectIndex).toBe(0)
  })

  it('loading', () => {
    const newState = addMemberReducer({}, { type: 'LOADING' })
    expect(newState.confirmLoading).toBe(true)
  })

  it('set non-members', () => {
    const nonMembers = [{ key: 1 }, { key: 2 }]
    const newState = addMemberReducer({}, {
      type: 'SET_NON_MEMBERS',
      nonMembers
    })
    expect(newState.nonMembers).toEqual(nonMembers)
  })

  it('set member to add', () => {
    const memberToAdd = 1
    const newState = addMemberReducer({}, {
      type: 'SET_MEMBER_TO_ADD',
      memberToAdd
    })
    expect(newState.memberToAdd).toEqual(memberToAdd)
  })

  it('close modal', () => {
    const newState = addMemberReducer({}, {
      type: 'CLOSE_MODAL'
    })
    expect(newState.visible).toBe(false)
    expect(newState.confirmLoading).toBe(false)
    expect(newState.memberToAdd).toBeNull()
  })

  it('raises exception', () => {
    expect(() => {
      addMemberReducer({}, { type: 'UNKNOWN' })
    }).toThrow(Error)
  })
})
