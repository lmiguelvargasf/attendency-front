import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import { UserOutlined, LaptopOutlined, CalendarOutlined } from '@ant-design/icons'

import styles from './Admin.module.sass'

const { Header, Content, Sider } = Layout

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
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="1">
              <UserOutlined />
              <span>Projects</span>
            </Menu.Item>
            <Menu.Item key="2">
              <LaptopOutlined />
              <span>Members</span>
            </Menu.Item>
            <Menu.Item key="3">
              <CalendarOutlined />
              <span>Meetings</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className={styles.siteLayoutBackground}
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Admin
