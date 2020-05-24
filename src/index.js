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
    config.headers.Authorization = `Bearer ${token}`
    return config
  }
  return config
})

let isAlreadyFetchingAccessToken = false

// This is the list of waiting requests that will retry after the JWT refresh complete
let subscribers = []

const onAccessTokenFetched = accessToken => {
  // When the refresh is successful, we start retrying the requests one by one and empty the queue
  subscribers.forEach(callback => callback(accessToken))
  subscribers = []
}

const addSubscriber = callback => {
  subscribers.push(callback)
}

const resetTokenAndReattemptRequest = async (error) => {
  try {
    const { response: errorResponse } = error
    const resetToken = window.localStorage.getItem('refreshToken')
    if (!resetToken) {
      return Promise.reject(error)
    }
    /* Proceed to the token refresh procedure
    We create a new Promise that will retry the request,
    clone all the request configuration from the failed
    request in the error object. */
    const retryOriginalRequest = new Promise(resolve => {
      /* We need to add the request retry to the queue
      since there another request that already attempt to
      refresh the token */
      addSubscriber(accessToken => {
        errorResponse.config.headers.Authorization = 'Bearer ' + accessToken
        resolve(axios(errorResponse.config))
      })
    })
    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true
      const response = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/token/refresh/`,
        data: {
          refresh: window.localStorage.getItem('refreshToken')
        }
      })
      if (!response.data) {
        return Promise.reject(error)
      }
      const newToken = response.data.access
      window.localStorage.setItem('token', newToken)
      isAlreadyFetchingAccessToken = false
      onAccessTokenFetched(newToken)
    }
    return retryOriginalRequest
  } catch (err) {
    return Promise.reject(err)
  }
}

const isTokenExpiredError = errorResponse => {
  const { code } = errorResponse
  return code === 'token_not_valid'
}

axios.interceptors.response.use(
  response => response,
  error => {
    const errorResponse = error.response
    if (isTokenExpiredError(errorResponse.data)) {
      return resetTokenAndReattemptRequest(error)
    }
    // If the error is due to other reasons, we just throw it back to axios
    return Promise.reject(error)
  }
)

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
