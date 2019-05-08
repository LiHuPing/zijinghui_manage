import React, { Component } from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';
import { withRouter } from 'react-router'
class MenuLeft extends Component {
  render() {
    const { pathname } = this.props.location
    return (
      <Menu
        mode="inline"
        defaultSelectedKeys={[(pathname.split('/')[2])]}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="adminIndex">
          <Link to='/system/adminIndex'>
            <Icon type="user" />
            <span>后台用户</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="permIndex">
          <Link to='/system/permIndex'>
            <Icon type="laptop" />
            <span>权限管理</span>
          </Link>
        </Menu.Item>
      </Menu>
    )
  }
}
export default withRouter(MenuLeft)

