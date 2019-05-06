import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink,Switch,Route} from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Main extends Component {
  render() {
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">
              <NavLink to='/user'>系统设置</NavLink>

            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to='/notFount'>用户中心</NavLink>
            </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" title={<span><Icon type="user" />后台用户</span>}>
                
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="laptop" />权限管理</span>}>
              </SubMenu>
              <Menu.Item key="9">
                <Icon type="file" />
                <span>文件管理</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content style={{ height: '100%' }}>
              <Switch>
                <Route></Route>
                <Route></Route>
                <Route></Route>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default connect(state => ({}))(Main)

