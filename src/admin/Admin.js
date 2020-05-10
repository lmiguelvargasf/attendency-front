import React, { useState } from 'react'
import { Route, Switch, Link, Redirect, useLocation, useHistory } from 'react-router-dom'
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
    icon: faDraftingCompass,
    label: 'Projects',
    key: 'projects'
  },
  {
    icon: faUsers,
    label: 'Members',
    key: 'members'
  },
  {
    icon: faCalendarAlt,
    label: 'Meetings',
    key: 'meetings'
  }
]

const Admin = () => {
  const location = useLocation()
  const history = useHistory()
  const [selectedMenuItem, setselectedMenuItem] = useState(location.pathname.replace('/admin/', ''))
  const logOut = () => {
    localStorage.removeItem('token')
    history.push('/')
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
              <Menu.Item key={item.key}>
                <Link to={`/admin/${item.key}`} onClick={() => { setselectedMenuItem(item.key) }}>
                  <Space size='middle'>
                    <FontAwesomeIcon icon={item.icon} />
                    <span>{item.label}</span>
                  </Space>
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content
            className={styles.siteLayoutBackground}
            style={{ padding: 24 }}
          >
            <Switch>
              <Route exact path='/admin' render={() => (<Redirect to='/admin/projects' />)} />
              <Route path='/admin/projects' component={Projects} />
              <Route path='/admin/members' component={Members} />
              <Route path='/admin/meetings' component={Meetings} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Admin
