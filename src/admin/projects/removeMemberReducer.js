const removeMemberReducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, visible: true, projectKey: action.projectKey, selectedProjectIndex: action.selectedProjectIndex }
    case 'LOADING':
      return { ...state, confirmLoading: true }
    case 'SET_MEMBERS':
      return { ...state, members: action.members }
    case 'SET_MEMBER_TO_REMOVE':
      return { ...state, memberToRemove: action.memberToRemove }
    case 'CLOSE_MODAL':
      return { ...state, memberToRemove: null, confirmLoading: false, visible: false }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export default removeMemberReducer
