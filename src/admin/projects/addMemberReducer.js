const addMemberReducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, visible: true, projectKey: action.projectKey, selectedProjectIndex: action.selectedProjectIndex }
    case 'LOADING':
      return { ...state, confirmLoading: true }
    case 'SET_NON_MEMBERS':
      return { ...state, nonMembers: action.nonMembers }
    case 'SET_MEMBER_TO_ADD':
      return { ...state, memberToAdd: action.memberToAdd }
    case 'CLOSE_MODAL':
      return { ...state, memberToAdd: null, confirmLoading: false, visible: false }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export default addMemberReducer
