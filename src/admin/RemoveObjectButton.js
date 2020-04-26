import React from 'react'
import useAxios from 'axios-hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const RemoveObjectButton = ({ object, removeObject }) => {
  const [, execute] = useAxios(
    { url: object.url, method: 'delete' },
    { manual: true }
  )
  const remove = async () => {
    await execute()
    removeObject(object)
  }

  return <a data-testid={object.url} onClick={remove}><FontAwesomeIcon icon={faTrash} /></a>
}

export default RemoveObjectButton
