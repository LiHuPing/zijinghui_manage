
import React, { Component } from 'react'
import { Tabs } from 'antd'
const { TabPane } = Tabs
export default class PermIndex extends Component {
  render() {
    return (
      <Tabs type="card">
        <TabPane tab="权限组列表" key="1"></TabPane>
        <TabPane tab="新增权限组" key="2"></TabPane>
      </Tabs>
    )
  }
}
