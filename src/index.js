import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'
import App from './App'
import * as serviceWorker from './serviceWorker'

import './index.css'

axios.interceptors.request.use(function (config) {
  if (window.localStorage.getItem('token')) {
    const token = window.localStorage.getItem('token')
    config.headers.Authorization = `JWT ${token}`
    return config
  }
  return config
})

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
