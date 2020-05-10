import React from 'react'
import { Route } from 'react-router-dom'

import Admin from './admin/Admin'
import Home from './Home'
import Login from './Login'

import './App.module.sass'

function App () {
  return (
    <>
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={Login} />
      <Route path='/admin' component={Admin} />
    </>
  )
}

export default App
