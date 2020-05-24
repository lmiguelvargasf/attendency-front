import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'
import App from './App'
import * as serviceWorker from './serviceWorker'

import './index.css'

axios.defaults.baseURL = process.env.REACT_APP_API_URL

axios.interceptors.request.use(function (config) {
  if (window.localStorage.getItem('token')) {
    const token = window.localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
  }
  return config
})

const getNewToken = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/token/refresh/`,
      data: {
        refresh: window.localStorage.getItem('refreshToken')
      }
    }).then(response => {
      window.localStorage.setItem('token', response.data.access)
      resolve(response.data.access)
    }).catch((error) => {
      reject(error)
    })
  })
}

axios.interceptors.response.use((response) => {
  // Return a successful response back to the calling service
  return response
}, (error) => {
  // Return any error which is not due to authentication back to the calling service
  if (error.response.status !== 401) {
    return new Promise((resolve, reject) => {
      reject(error)
    })
  }

  // Logout user if token refresh didn't work or user is disabled
  if (error.config.url === `${process.env.REACT_APP_API_URL}/token/refresh/`) {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('refreshToken')
    window.location.href = '/login'

    return new Promise((resolve, reject) => {
      reject(error)
    })
  }

  // Try request again with new token
  return getNewToken()
    .then(token => {
      // New request with new token
      const config = error.config
      config.headers.Authorization = `Bearer ${token}`

      return new Promise((resolve, reject) => {
        axios.request(config).then(response => {
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
      })
    })
    .catch(error => {
      Promise.reject(error)
    })
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
