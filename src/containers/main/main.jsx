import React, { Component } from 'react'
import { connect } from 'react-redux'
import PubSub from 'pubsub-js'
import { Switch, Redirect, Route } from 'react-router'
import TopNavigator from '../../components/topNavigator/topNavigator'
import TopButton from '../../components/topButton/topButton'
import MenuLeft from '../../components/menuLeft/menuLeft'
import AdminIndex from '../admin/adminIndex'
import PermIndex from '../permission/permIndex'
import PermList from '../permission/permList'
import { Layout } from 'antd'
const { Header, Content, Sider } = Layout;
class Main extends Component {
  render() {
    const { login_key } = this.props.user
    if (!login_key) {
      return <Redirect to='/login' />
    }
    return (
      <Layout>
        <Header className="header header-light" style={{ height: '80px' }}>
          <div className="logo-brand pull-left color-beige">资鲸汇</div>
          <TopNavigator />
          <TopButton user={this.props.user} />
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <MenuLeft />
          </Sider>
          <Layout style={{ margin: '10px', background: '#fff' }}>
            <Content style={{ height: '1000px', padding: '20px' }}>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout >
    )
  }
}
export default connect(state => ({ user: state.user }))(Main)

