const projectReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD':
      return action.projects
    case 'REMOVE':
      return state.filter(project => project.key !== action.project.key)
    case 'ADD':
      return [action.project, ...state]
    case 'UPDATE': {
      const newState = [...state]
      newState[action.index] = action.project
      return newState
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export default projectReducer
