
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs } from 'antd'
import { Link } from 'react-router'

import PermList from './permList'
import PermDetail from './permDetail'

import PermAdd from './permAdd'
import { getPermList } from '../../redux/actions'
const { TabPane } = Tabs
class PermIndex extends Component {
  componentWillMount() {
    const { user, getPermList, permList } = this.props
    const { current_page, page_size } = permList
    getPermList({ token: user.login_key, current_page, page_size, group_name: '超级管理员' })
  }
  render() {
    return (
      <Tabs type="card">
        <TabPane tab={<Link to='/system/permIndex:list'>权限组列表</Link>} key="list">
          <PermList />
        </TabPane>
        <TabPane tab={<Link to='/system/permIndex:add'>添加权限组</Link>} key='add' >
          <PermDetail />
        </TabPane>
        <TabPane tab={<Link to='/system/permIndex:detail'>权限组详情</Link>} key="detail" >
          <PermAdd />
        </TabPane>
      </Tabs>
    )
  }
}
export default connect(state => ({ user: state.user, permList: state.permList }), { getPermList })(PermIndex)
