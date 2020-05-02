import React from 'react'
import { Space, Modal, Select } from 'antd'
const { Option } = Select

const AddMemberModal = ({ state, handleOk, handleCancel, handleOnChange }) => {
  return (
    <Modal
      title='Add Member'
      visible={state.visible}
      onOk={handleOk}
      confirmLoading={state.confirmLoading}
      onCancel={handleCancel}
    >
      {
        state.nonMembers.length > 0 ? (
          <Space>
            <strong>Member:</strong>
            <Select style={{ width: 150 }} onChange={handleOnChange} value={state.memberToAdd}>
              {state.nonMembers.map(nonMember => (
                <Option key={nonMember.key} value={nonMember.key}>
                  {nonMember.preferredName ? nonMember.preferredName : `${nonMember.firstName} ${nonMember.lastName}`}
                </Option>
              ))}
            </Select>
          </Space>
        ) : (
          <span>There are no more members to add to this project.</span>
        )
      }
    </Modal>
  )
}

export default AddMemberModal
