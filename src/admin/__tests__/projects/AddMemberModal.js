import React from 'react'
import { render, cleanup } from '@testing-library/react'
import AddMemberModal from '../../projects/AddMemberModal'

describe('AddMemberModal component', () => {
  afterEach(cleanup)

  describe('no members to be added', () => {
    let component
    beforeEach(() => {
      const state = {
        visible: true,
        confirmLoading: false,
        nonMembers: [],
        memberToAdd: null
      }
      component = (
        <AddMemberModal state={state} handleOk={jest.fn()} handleCancel={jest.fn()} handleOnChange={jest.fn()} />
      )
    })

    it('matches snapshot', () => {
      const { asFragment } = render(component)
      expect(asFragment()).toMatchSnapshot()
    })

    it('displays text indicating no members to add', () => {
      const { getByTestId, queryByTestId } = render(component)
      expect(getByTestId('no-members-left')).toHaveTextContent('no more members to add')
      expect(queryByTestId('add-member-select')).toBeNull()
    })
  })

  describe('there are members to be added', () => {
    let component
    beforeEach(() => {
      const state = {
        visible: true,
        confirmLoading: false,
        nonMembers: [
          { key: 1, preferredName: 'Alpha' },
          { key: 1, preferredName: 'Beta' },
          { key: 1, preferredName: 'Gamma' }
        ],
        memberToAdd: null
      }
      component = (
        <AddMemberModal state={state} handleOk={jest.fn()} handleCancel={jest.fn()} handleOnChange={jest.fn()} />
      )
    })

    it('matches snapshot', () => {
      const { asFragment } = render(component)
      expect(asFragment()).toMatchSnapshot()
    })

    it('displays text indicating no members to add', () => {
      const { getByTestId, queryByTestId } = render(component)
      expect(getByTestId('add-member-select')).not.toBeNull()
      expect(queryByTestId('no-members-left')).toBeNull()
    })
  })
})
