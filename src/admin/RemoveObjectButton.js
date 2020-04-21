import React from 'react'
import useAxios from 'axios-hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const RemoveObjectButton = ({ url, object, updateObjects }) => {
  const [, execute] = useAxios(
    { url: url, method: 'delete' },
    { manual: true }
  )
  const removeObject = async () => {
    await execute()
    updateObjects(object)
  }

  return <a data-testid={url} onClick={removeObject}><FontAwesomeIcon icon={faTimes} /></a>
}

export default RemoveObjectButton
