const meetingReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD':
      return action.meetings
    case 'REMOVE':
      return state.filter(meeting => meeting.key !== action.meeting.key)
    case 'ADD':
      return [action.meeting, ...state]
    case 'UPDATE':
      state[action.index] = action.meeting
      return state
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export default meetingReducer
