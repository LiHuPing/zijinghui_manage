
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/actions'
import AdminList from './adminList'
import AdminAdd from './adminAdd'
import { Tabs } from 'antd'
const { TabPane } = Tabs
class AdminIndex extends Component {
  render() {
    return (
      <Tabs type="card">
        <TabPane tab="管理员列表" key="1">
          <AdminList></AdminList>
        </TabPane>
        <TabPane tab="新增管理员" key="2">
          <AdminAdd ></AdminAdd>
        </TabPane>
      </Tabs>
    )
  }
}
export default connect(state => ({ userList: state.userList, user: state.user }), { getUserList })(AdminIndex)