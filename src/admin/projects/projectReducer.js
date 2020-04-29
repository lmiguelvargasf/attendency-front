const projectReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_PROJECTS':
      return action.projects
    case 'REMOVE_PROJECT':
      return state.filter(project => project.key !== action.project.key)
    case 'ADD_PROJECT':
      return [action.project, ...state]
    case 'UPDATE_PROJECT':
      state[action.index] = action.project
      return state
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export default projectReducer
