import React from 'react'
import { render, cleanup } from '@testing-library/react'
import RemoveMemberModal from '../../projects/RemoveMemberModal'

describe('RemoveMemberModal component', () => {
  afterEach(cleanup)

  describe('no members to be removed', () => {
    let component
    beforeEach(() => {
      const state = {
        visible: true,
        confirmLoading: false,
        members: [],
        memberToRemove: null
      }
      component = (
        <RemoveMemberModal state={state} handleOk={jest.fn()} handleCancel={jest.fn()} handleOnChange={jest.fn()} />
      )
    })

    it('matches snapshot', () => {
      const { asFragment } = render(component)
      expect(asFragment()).toMatchSnapshot()
    })

    it('displays text indicating no members to remove', () => {
      const { getByTestId, queryByTestId } = render(component)
      expect(getByTestId('no-members-remove')).toHaveTextContent('no more members to remove')
      expect(queryByTestId('remove-member-select')).toBeNull()
    })
  })

  describe('there are members to be removed', () => {
    let component
    beforeEach(() => {
      const state = {
        visible: true,
        confirmLoading: false,
        members: [
          { key: 1, preferredName: 'Alpha' },
          { key: 1, preferredName: 'Beta' },
          { key: 1, preferredName: 'Gamma' }
        ],
        memberToRemove: null
      }
      component = (
        <RemoveMemberModal state={state} handleOk={jest.fn()} handleCancel={jest.fn()} handleOnChange={jest.fn()} />
      )
    })

    it('matches snapshot', () => {
      const { asFragment } = render(component)
      expect(asFragment()).toMatchSnapshot()
    })

    it('displays select', () => {
      const { getByTestId, queryByTestId } = render(component)
      expect(getByTestId('remove-member-select')).not.toBeNull()
      expect(queryByTestId('no-members-remove')).toBeNull()
    })
  })
})
