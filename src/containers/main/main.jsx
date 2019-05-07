import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Switch, Route } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import PubSub from 'pubsub-js'
import AdminIndex from '../admin/adminIndex'
import PermIndex from '../permission/permIndex'
import { getUserList, toAdduser } from '../../redux/actions'
const { Header, Content, Sider } = Layout;
class Main extends Component {
  componentWillMount() {
    const { user, getUserList, userList } = this.props
    const { current_page, page_size } = userList
    if (user.login_key) {
      getUserList({ token: user.login_key, current_page, page_size })
    }
  }
  componentDidMount() {
    PubSub.subscribe('addUser', this.adduser)
  }
  adduser = (msg, data) => {
    const { user, toAdduser } = this.props
    toAdduser({ ...data, token: user.login_key })
  }
  render() {
    return (
      <Layout>
        <Header className="header" style={{ background: '#fff', padding: 0 }}>
          <div className="logo text-center">
            <h1>资鲸汇后台管理系统</h1>
          </div>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="1">
                <NavLink to='/adminIndex'>
                  <Icon type="user" />
                  <span>后台用户</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="2">
                <NavLink to='/permIndex'>
                  <Icon type="laptop" />
                  <span>权限管理</span>
                </NavLink>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ margin: '10px', background: '#fff' }}>
            <Content style={{ height: '1000px', padding: '20px' }}>
              <Switch>
                <Route path='/adminIndex' component={AdminIndex}></Route>
                <Route path='/permIndex' component={PermIndex}></Route>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}
export default connect(state => ({ user: state.user, userList: state.userList }), { getUserList, toAdduser })(Main)

