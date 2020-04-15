import React from 'react'
import { Layout, Menu, Breadcrumb, Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDraftingCompass, faUsers, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

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
            <Menu.Item key='1'>
              <Space size='middle'>
                <FontAwesomeIcon icon={faDraftingCompass} />
                <span>Projects</span>
              </Space>
            </Menu.Item>
            <Menu.Item key='2'>
              <Space size='middle'>
                <FontAwesomeIcon icon={faUsers} />
                <span>Members</span>
              </Space>
            </Menu.Item>
            <Menu.Item key='3'>
              <Space size='middle'>
                <FontAwesomeIcon icon={faCalendarAlt} />
                <span>Meetings</span>
              </Space>
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
