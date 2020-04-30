const memberReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD':
      return action.members
    case 'REMOVE':
      return state.filter(member => member.key !== action.member.key)
    case 'ADD':
      return [action.member, ...state]
    case 'UPDATE':
      state[action.index] = action.member
      return state
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export default memberReducer
