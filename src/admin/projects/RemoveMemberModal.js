import React from 'react'
import { Space, Modal, Select } from 'antd'
const { Option } = Select

const RemoveMemberModal = ({ state, handleOk, handleCancel, handleOnChange }) => {
  return (
    <Modal
      title='Remove Member'
      visible={state.visible}
      onOk={handleOk}
      confirmLoading={state.confirmLoading}
      onCancel={handleCancel}
    >
      {
        state.members.length > 0 ? (
          <Space>
            <strong>Member:</strong>
            <Select style={{ width: 150 }} onChange={handleOnChange} value={state.memberToRemove} data-testid='remove-member-select'>
              {state.members.map(member => (
                <Option key={member.key} value={member.key}>
                  {member.preferredName ? member.preferredName : `${member.firstName} ${member.lastName}`}
                </Option>
              ))}
            </Select>
          </Space>
        ) : (
          <span data-testid='no-members-remove'>There are no more members to remove from this project.</span>
        )
      }
    </Modal>
  )
}

export default RemoveMemberModal
