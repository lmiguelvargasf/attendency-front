import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect, useLocation, useHistory } from 'react-router-dom'
import { Layout, Menu, Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDraftingCompass, faUsers, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

import Meetings from './meetings/Meetings'
import Members from './members/Members'
import Projects from './projects/Projects'

import styles from './Admin.module.sass'

const { Header, Content, Sider } = Layout

const menuItems = [
  {
    key: '1',
    icon: faDraftingCompass,
    label: 'Projects',
    path: '/admin/projects'
  },
  {
    key: '2',
    icon: faUsers,
    label: 'Members',
    path: '/admin/members'
  },
  {
    key: '3',
    icon: faCalendarAlt,
    label: 'Meetings',
    path: '/admin/meetings'
  }
]

const Admin = () => {
  const location = useLocation()
  const history = useHistory()
  const [selectedMenuItem, setselectedMenuItem] = useState(location.pathname.replace('/admin/', ''))
  const computeSelected = () => {
    const selected = menuItems.find(_item => location.pathname.startsWith(_item.path))
    return selected ? selected.key : null
  }
  useEffect(() => {
    setselectedMenuItem(computeSelected())
  }, [location])
  const logOut = () => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('refreshToken')
    history.push('/login')
  }
  const onClickMenu = (item) => {
    const clicked = menuItems.find(_item => _item.key === item.key)
    history.push(clicked.path)
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <Header className='header'>
        <div className={styles.logo} />
        <Menu theme='dark' mode='horizontal' style={{ float: 'right' }}>
          <Menu.Item key='1' onClick={logOut}>Log Out</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200}>
          <Menu
            selectedKeys={[selectedMenuItem]}
            style={{ height: '100%', borderRight: 0 }}
          >
            {menuItems.map(item => (
              <Menu.Item key={item.key} onClick={onClickMenu}>
                <Space size='middle'>
                  <FontAwesomeIcon icon={item.icon} />
                  <span>{item.label}</span>
                </Space>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content
            className={styles.siteLayoutBackground}
            style={{ padding: 24 }}
          >
            {window.localStorage.getItem('token') ? (
              <Switch>
                <Route exact path='/admin' render={() => (<Redirect to='/admin/projects' />)} />
                <Route path='/admin/projects' component={Projects} />
                <Route path='/admin/members' component={Members} />
                <Route path='/admin/meetings' component={Meetings} />
              </Switch>
            ) : (
              <Redirect to='/login' />
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Admin
