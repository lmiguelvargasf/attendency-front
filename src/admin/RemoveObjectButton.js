import React from 'react'
import useAxios from 'axios-hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const RemoveObjectButton = ({ object, updateObjects }) => {
  const [, execute] = useAxios(
    { url: object.url, method: 'delete' },
    { manual: true }
  )
  const removeObject = async () => {
    await execute()
    updateObjects(object)
  }

  return <a data-testid={object.url} onClick={removeObject}><FontAwesomeIcon icon={faTimes} /></a>
}

export default RemoveObjectButton