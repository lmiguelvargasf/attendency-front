import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Admin from './admin/Admin'
import Home from './Home'
import Login from './Login'

import './App.module.sass'

function App () {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/admin' component={Admin} />
      <Route render={() => <h2>404 Page Not Found</h2>} />
    </Switch>
  )
}

export default App
