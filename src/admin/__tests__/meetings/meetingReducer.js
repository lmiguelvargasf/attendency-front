import meetingReducer from '../../meetings/meetingReducer'

const meetings = [{ key: 1, date: '2020-04-20' }, { key: 2, date: '2020-04-30' }]

describe('meetingReducer', () => {
  let newState

  beforeEach(() => {
    newState = meetingReducer([], { type: 'LOAD', meetings })
  })

  it('loads meetings', () => {
    expect(newState).toBe(meetings)
  })

  it('removes meeting', () => {
    const meeting = { key: 1, date: '2020-04-20' }
    newState = meetingReducer(newState, { type: 'REMOVE', meeting })

    expect(newState).toHaveLength(1)
    expect(newState).not.toContain(meeting)
  })

  it('adds new meeting', () => {
    const meeting = { key: 3, date: '2021-08-14' }
    newState = meetingReducer(newState, { type: 'ADD', meeting })

    expect(newState).toHaveLength(3)
    expect(newState).toContain(meeting)
  })

  it('updates meeting', () => {
    const meeting = { key: 1, date: '2020-09-23' }
    newState = meetingReducer(newState, { type: 'UPDATE', index: 0, meeting })

    expect(newState).toHaveLength(2)
    expect(newState).toContain(meeting)
    expect(newState[0].date).toEqual('2020-09-23')
  })

  it('raises exception', () => {
    expect(() => {
      newState = meetingReducer(newState, { type: 'UNKNOWN' })
    }).toThrow(Error)
  })
})
