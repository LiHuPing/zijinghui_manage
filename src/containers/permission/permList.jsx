/*
	权限组列表
	Created by Luzhipeng in 2018.12.03
*/
import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Layout, Table, Button, Form, Input, Modal } from 'antd'
const { Content } = Layout
const FormItem = Form.Item
const confirm = Modal.confirm
class PermList extends Component {
	handleDelete() {
	}
	state = {
		loading: false,
		editId: ""
	}
	columns = [{
		title: '权限组ID',
		dataIndex: 'perm_group_id',
		key: '0'
	}, {
		title: '权限组名称',
		dataIndex: 'group_name',
		key: '1'
	}, {
		title: '备注',
		dataIndex: 'notes',
		key: '2'
	}, {
		title: '操作',
		dataIndex: 'perm_group_id',
		key: '3',
		render: (text, record) => (
			<div>
				<Link to='' className="color-blue">编辑</Link>
				&nbsp;&nbsp;
					<a onClick={this.handleDelete.bind(this, record.perm_group_id)} >删除</a>
			</div>
		)
	}]
	direct(ID) {
		this.setState({
			editId: ID,
			modalV: true
		})
	}
	// 删除权限组
	deletePerm(perm_group_id) {
		confirm({
			title: '温馨提示',
			content: '确认要进行此操作吗？',
			onOk: () => {
			},
			okText: '确定',
			cancelText: '取消'
		})
	}
	render() {
		const formItemLayout = {
			labelCol: { span: 10 },
			wrapperCol: { span: 14 }
		}
		const { getFieldDecorator } = this.props.form
		const { list } = this.props.permList
		return (
			<Layout className="bg-fff flex-initial">
				<Content className="tb-contain">
					<Form layout="inline">
						<FormItem {...formItemLayout} label="权限组名称">
							{getFieldDecorator('group_name')(
								<Input placeholder="请输入权限组名称" />
							)}
						</FormItem>
					</Form>
					<div className="btn-group text-right">
						<Button type="primary" icon="search">搜索</Button>
						<Button type="default" icon="delete">清除</Button>
					</div>
					<Table
						className="table-fixed"
						rowClassName={(record, index) => index % 2 === 1 ? 'bg-fa' : ''}
						columns={this.columns}
						dataSource={list}
						loading={this.state.loading}
						rowKey={record => record.perm_group_id} />
				</Content>
			</Layout>
		)
	}
}
PermList = Form.create()(PermList)
export default connect(state => ({ user: state.user, permList: state.permList }), {})(PermList)
