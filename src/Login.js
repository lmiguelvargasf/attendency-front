import React from 'react'
import { Row, Col, Form, Input, Button } from 'antd'
import { useHistory } from 'react-router-dom'
import useAxios from 'axios-hooks'

const layout = {
  labelCol: { offset: 6, span: 3 },
  wrapperCol: { span: 8 }
}
const tailLayout = {
  wrapperCol: { offset: 9, span: 16 }
}

const Login = () => {
  const history = useHistory()
  const [, login] = useAxios(
    {
      url: `${process.env.REACT_APP_API_URL}/token-auth/`,
      method: 'post'
    },
    { manual: true }
  )

  const onFinish = async values => {
    console.log(values)
    let response
    try {
      response = await login({ data: values })
    } catch (error) {
      console.log(error)
      return
    }
    const { data } = response
    window.localStorage.setItem('token', data.token)
    history.push('/admin')
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Row type='flex' justify='center' align='middle' style={{ minHeight: '100vh' }}>
      <Col span={24}>
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        <Form
          {...layout}
          name='basic'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label='Username'
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type='primary' htmlType='submit'>
          Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default Login
