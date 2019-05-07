import React, { Component } from 'react';
import { Layout, Button, Form, Input, Select, message } from 'antd';
import PubSub from 'pubsub-js'
const { Content } = Layout
const FormItem = Form.Item
const Option = Select.Option

class AdminAdd extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false
		}
	}

	handleAdd = () => {
		let { getFieldsValue } = this.props.form,
			{ phone, password, admin_name, perm_group_id } = getFieldsValue()

		if (!/^1[3|4|5|7|8]\d{9}$/.test(phone)) {
			message.error('请正确填写手机号')
			return
		}
		else if (!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,16}$/.test(password)) {
			message.error('密码过于简单')
			return
		}
		else if (!admin_name) {
			message.error('请填写姓名')
			return
		}
		else if (!perm_group_id) {
			message.error('请选择权限组')
			return
		}
		let { notes } = getFieldsValue()

		PubSub.publish('addUser', { ...getFieldsValue(), perm_group_id: perm_group_id * 1, notes: (notes ? notes : '') })

	}
	render() {
		const { getFieldDecorator } = this.props.form
		return (
			<Layout className="bg-fff flex-initial">
				<Content className="tb-contain">
					<Form className="admin-new-form">
						<FormItem label="手机号">
							{getFieldDecorator('phone', {
								rules: [{ required: true, message: "必填项" }],
							})(
								<Input placeholder="请输入手机号" />
							)}
						</FormItem>
						<FormItem label="密码">
							{getFieldDecorator('password', {
								rules: [{ required: true, message: "必填项" }],
							})(
								<Input type='password' placeholder="请输入密码，6-16位，非纯数字" />
							)}
						</FormItem>
						<FormItem label="姓名">
							{getFieldDecorator('admin_name', {
								rules: [{ required: true, message: "必填项" }],
							})(
								<Input placeholder="请输入姓名" />
							)}
						</FormItem>
						<FormItem label="权限组">
							{getFieldDecorator('perm_group_id', {
								rules: [{ required: true, message: "必填项" }],
								initialValue: 0
							})(

								<Input type='number' placeholder="权限组" />
							)}
						</FormItem>
						<FormItem label="备注">
							{getFieldDecorator('notes')(
								<Input placeholder="请输入备注（选填）" />
							)}
						</FormItem>
						<FormItem className="text-center">
							<Button size="large" type="primary" onClick={this.handleAdd}>新 增</Button>
						</FormItem>
					</Form>
				</Content>
			</Layout>
		)
	}
}
AdminAdd = Form.create()(AdminAdd)
export default AdminAdd
