import React from 'react'
import { Route } from 'react-router-dom'

import Admin from './admin/Admin'
import Login from './Login'

import './App.module.sass'

function App () {
  return (
    <>
      <Route exact path='/login' component={Login} />
      <Route path='/admin' component={Admin} />
    </>
  )
}

export default App
