import React from 'react'
import { DatePicker } from 'antd'

import styles from './App.module.scss'

function App () {
  return (
    <>
      <h1 className={styles.testing}>Attendency</h1>
      <DatePicker />
    </>
  )
}

export default App
