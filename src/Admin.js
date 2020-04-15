import React from 'react'
import { Layout, Menu, Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDraftingCompass, faUsers, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

import styles from './Admin.module.sass'

const { Header, Content, Sider } = Layout

const menuItems = [
  {
    icon: faDraftingCompass,
    label: 'Projects'
  },
  {
    icon: faUsers,
    label: 'Members'
  },
  {
    icon: faCalendarAlt,
    label: 'Meetings'
  }
]

const Admin = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Header className='header'>
        <div className={styles.logo} />
        <Menu theme='dark' mode='horizontal' style={{ float: 'right' }}>
          <Menu.Item key='1'>Log Out</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200}>
          <Menu
            defaultSelectedKeys={['0']}
            style={{ height: '100%', borderRight: 0 }}
          >
            {menuItems.map((item, i) => (
              <Menu.Item key={i}>
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
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Admin
