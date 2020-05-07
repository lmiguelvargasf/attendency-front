import React from 'react'
import { Modal } from 'antd'
import useAxios from 'axios-hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import styles from './Admin.module.sass'
import PropTypes from 'prop-types'

const { confirm } = Modal

const RemoveObjectButton = ({ object, removeObject }) => {
  const [, execute] = useAxios(
    { url: object.url, method: 'delete' },
    { manual: true }
  )

  const showConfirm = () => {
    confirm({
      title: 'Delete Confirmation',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete this item? This process cannot be undone.',
      onOk: async () => {
        await execute()
        removeObject(object)
      },
      onCancel () {}
    })
  }

  return (
    <button type='button' className={styles.linkButton} data-testid={object.url} onClick={showConfirm}>
      <FontAwesomeIcon icon={faTrash} style={{ color: '#f2463d' }} />
    </button>)
}

RemoveObjectButton.propTypes = {
  object: PropTypes.object,
  removeObject: PropTypes.func
}

export default RemoveObjectButton
