/*
	管理员登录
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Icon, Button, Form, Input, Select, Tooltip, message } from 'antd';
import { Redirect } from 'react-router'

import { login } from '../../redux/actions'
const { Content } = Layout
const FormItem = Form.Item
const Option = Select.Option
class Login extends Component {
  state = {
    loading: false,
    farTop: `${(document.documentElement.clientHeight - 360) / 2}px`,
    minH: `${document.documentElement.clientHeight}px`,
    roleType: "plat"
  }
  handleLogin = () => {
    if (this.state.loading) return
    const { getFieldValue } = this.props.form
    let phone = getFieldValue('phone')
    let user_name_reg = getFieldValue('user_name_reg')
    let password = getFieldValue('password')
    let roleType = this.state.roleType
    if (roleType === 'plat' && !/^1[3|4|5|7|8|9]\d{9}$/.test(phone)) {
      message.error('请正确填写手机号')
      return
    }
    if (roleType === 'law' && !user_name_reg) {
      message.error('请填写律师登录名')
      return
    }
    else if (!password) {
      message.error('请填写密码')
      return
    }
    if (roleType === 'plat') {
      this.props.login({ phone, password, roleType })
    } else {
      this.props.login({ user_name_reg, password, roleType })
    }
    this.setState({ loading: true })
  }
  roleTypeSwitch = vaule => {
    this.setState({ roleType: vaule })
  }
  render() {
    const { login_key } = this.props.user
    if (login_key) {
      return <Redirect to='/'></Redirect>
    }
    const { getFieldDecorator } = this.props.form
    return (
      <Layout className="flex-initial rela" style={{ minHeight: this.state.minH, background: `url(${require('../../assets/images/pamyatnik-mininu-i-pozharskomu.jpg')}) center / 100% no-repeat` }}>
        <Content className="login-container abso" style={{ paddingTop: this.state.farTop }} >
          <Form className="login-form">
            <div className="logo-surface color-beige">资鲸汇</div>
            <FormItem>
              <Select size="large" defaultValue='plat' onChange={this.roleTypeSwitch}>
                <Option value="plat">管理员登录</Option>
                <Option value="law">律师登录</Option>
              </Select>
            </FormItem>
            {
              this.state.roleType === "plat" ?
                <FormItem>
                  {getFieldDecorator('phone', {
                    rules: [{ required: true, message: '必填项' }],
                  })(
                    <Input prefix={<Icon type="user" />} size="large" placeholder="管理员手机号" />
                  )}
                </FormItem> :
                <FormItem>
                  {getFieldDecorator('user_name_reg', {
                    rules: [{ required: true, message: '必填项' }],
                  })(
                    <Input prefix={<Icon type="user" />} size="large" placeholder="律师登录名" />
                  )}
                </FormItem>
            }
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '必填项' }],
              })(
                <Input prefix={<Icon type="lock" />} type="password" size="large" placeholder="管理员密码" onKeyDown={e => e.keyCode === 13 ? this.handleLogin(e) : null} />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" size="large" onClick={this.handleLogin} className="login-form-button" loading={this.state.loading}>登录</Button>
            </FormItem>
          </Form>
          <div className="cpright abso color-fff text-center">
            <Tooltip title="Chrome 29.0+ / Firefox 22.0+ / IE 11.0+ / Safari 9.0+ / Opera 17.0+">
              <p style={{ textDecoration: 'underline', cursor: 'pointer' }}>支持的浏览器 √</p>
            </Tooltip>
            {`Copyright ©2018-${new Date().getFullYear()} 成都多鱼科技有限公司`}
          </div>
        </Content>
      </Layout>
    )
  }
}
const WrappedNormalLoginF = Form.create({ name: 'normal_login' })(Login)
export default connect(state => ({ user: state.user }), { login })(WrappedNormalLoginF)
