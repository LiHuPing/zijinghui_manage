import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Table, Button, Form, Input, Select, Row, Col, Popconfirm } from 'antd';
import PubSub from 'pubsub-js'
import { toDeleteUser } from '../../redux/actions'
const { Content } = Layout
const FormItem = Form.Item
const Option = Select.Option

class AdminList extends Component {
	handleDelete = admin_id => {
		console.log(admin_id)
		this.props.toDeleteUser({ admin_id: admin_id * 1, token: this.props.user.login_key })
	}
	columns = [
		{
			title: '管理员ID',
			dataIndex: 'admin_id',
			key: '0'
		},
		{
			title: '管理员姓名',
			dataIndex: 'admin_name',
			key: '1'
		},
		{
			title: '电话',
			dataIndex: 'phone',
			key: '2'
		},
		{
			title: '状态',
			dataIndex: 'is_freezed_txt',
			key: '3'
		},
		{
			title: '权限名',
			dataIndex: 'perm_group_name',
			key: '4'
		},
		{
			title: '备注',
			dataIndex: 'notes',
			key: '5'
		},
		{
			title: '操作',
			dataIndex: 'perm_group_id',
			key: '6',
			render: (text, user) => {
				return (
					<div>
						<a className="color-blue">编辑</a>
						&nbsp;&nbsp;
						<Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(user.admin_id)}>
							<a href="javascript:;">Delete</a>
						</Popconfirm>
						&nbsp;&nbsp;
						<a className="color-yel">{{ "0": "冻结", 1: "解冻" }[user.is_freezed]}</a>
					</div>
				)
			}
		}
	]
	render() {
		const { list } = this.props.userList
		console.log(list)
		const formItemLayout = { labelCol: { span: 7 }, wrapperCol: { span: 17 } }
		const { getFieldDecorator } = this.props.form
		return (
			<Layout className="bg-fff flex-initial">
				<Content className="tb-contain">
					<Form layout="inline" className="align-table">
						<Row>
							<Col xs={24} sm={6}>
								<FormItem {...formItemLayout} label="管理员">
									{getFieldDecorator('admin_name')(
										<Input placeholder="请输入管理员姓名" />
									)}
								</FormItem>
							</Col>
							<Col xs={24} sm={6}>
								<FormItem {...formItemLayout} label="手机号">
									{getFieldDecorator('phone')(
										<Input placeholder="请输入手机号" />
									)}
								</FormItem>
							</Col>
							<Col xs={24} sm={6}>
								<FormItem {...formItemLayout} label="关键字">
									{getFieldDecorator('keyword')(
										<Input placeholder="请输入关键字" />
									)}
								</FormItem>
							</Col>
							<Col xs={24} sm={6}>
								<FormItem {...formItemLayout} label="冻结状态">
									{getFieldDecorator('is_freezed')(
										<Select>
											<Option value="0">正常</Option>
											<Option value="1">冻结</Option>
										</Select>
									)}
								</FormItem>
							</Col>
							<Col xs={24} sm={6}>
								<FormItem {...formItemLayout} label="权限组">
									{getFieldDecorator('perm_group_id')(
										<Select>
										</Select>
									)}
								</FormItem>
							</Col>
						</Row>

					</Form>
					<div className="btn-group text-right">
						<Button type="primary" icon="search">搜索</Button>
						<Button type="default" icon="delete">清除</Button>
					</div>
					<Table className='text-center' bordered columns={this.columns} dataSource={list} rowKey={user => user.admin_id} />
				</Content>
			</Layout>
		)
	}
}
AdminList = Form.create()(AdminList)
export default connect(state => ({ user: state.user, userList: state.userList }), { toDeleteUser })(AdminList)