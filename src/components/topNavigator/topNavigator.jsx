import React, { Component } from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
function TopNavigator(props) {
    return (
        <Menu mode="horizontal" className="pull-left" style={{ lineHeight: '78px' }} defaultSelectedKeys={['system_manage']} >
            <Menu.Item key="system_manage">
                <Link to='/system/adminIndex'>
                    <Icon style={{ fontSize: '16px' }} type="setting" />系统设置
					</Link>
            </Menu.Item>
            <Menu.Item key="verify_manage">
                <Link to=''>
                    <Icon style={{ fontSize: '16px' }} type="solution" />鉴标管理
				</Link>
            </Menu.Item>
            <Menu.Item key="operation_manage">
                <Link to=''>
                    <Icon style={{ fontSize: '16px' }} type="desktop" />运营管理
					</Link>
            </Menu.Item>
            <Menu.Item key="business_manage">
                <Link to=''>
                    <Icon style={{ fontSize: '16px' }} type="shop" />商户管理
					</Link>
            </Menu.Item>
            <Menu.Item key="lawworks_manage">
                <Link to=''>
                    <Icon style={{ fontSize: '16px' }} type="book" />法务管理
					</Link>
            </Menu.Item>
            <Menu.Item key="payment_manage">
                <Link to=''>
                    <Icon style={{ fontSize: '16px' }} type="credit-card" />支付流水
					</Link>
            </Menu.Item>
            <Menu.Item key="analysis_manage">
                <Link to=''>
                    <Icon style={{ fontSize: '16px' }} type="line-chart" />数据分析
					</Link>
            </Menu.Item>
        </Menu>
    )
}
export default TopNavigator
