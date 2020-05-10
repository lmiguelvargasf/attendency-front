import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'antd'

const Home = () => {
  const history = useHistory()
  return (
    <>
      <h1>Attendency</h1>
      <Button type='primary' onClick={() => { history.push('/login') }}>Log In</Button>
    </>
  )
}

export default Home
