
import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import { connect } from 'react-redux'
import { getUserList, toAdduser } from '../../redux/actions'
import AdminList from './adminList'
import AdminAdd from './adminAdd'
import { Tabs } from 'antd'
const { TabPane } = Tabs
class AdminIndex extends Component {
  componentWillMount() {
    const { user, getUserList, userList } = this.props
    const { current_page, page_size } = userList
    getUserList({ token: user.login_key, current_page, page_size })
  }
  adduser = (msg, data) => {
    const { user, toAdduser } = this.props
    toAdduser({ ...data, token: user.login_key })
  }
  componentDidMount() {
    PubSub.subscribe('addUser', this.adduser)
  }
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
export default connect(state => ({ user: state.user, userList: state.userList }), { getUserList, toAdduser })(AdminIndex)