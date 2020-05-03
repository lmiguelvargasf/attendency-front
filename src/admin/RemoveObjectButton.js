import React from 'react'
import useAxios from 'axios-hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import styles from './Admin.module.sass'

const RemoveObjectButton = ({ object, removeObject }) => {
  const [, execute] = useAxios(
    { url: object.url, method: 'delete' },
    { manual: true }
  )
  const remove = async () => {
    await execute()
    removeObject(object)
  }

  return (
    <button type='button' className={styles.linkButton} data-testid={object.url} onClick={remove}>
      <FontAwesomeIcon icon={faTrash} style={{ color: '#f2463d' }} />
    </button>)
}

export default RemoveObjectButton
