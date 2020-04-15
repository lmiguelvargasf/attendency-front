import React from 'react'
import { Route } from 'react-router-dom'

import Admin from './admin/Admin'

import './App.module.sass'

function App () {
  return (
    <>
      <Route path='/admin' component={Admin} />
    </>
  )
}

export default App
