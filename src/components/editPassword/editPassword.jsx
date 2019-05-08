import React, { Component } from 'react';
import { Form, Modal, Input, message } from 'antd';
const FormItem = Form.Item
class EditPassword extends Component {
	componentWillUpdate(nextProps) {
		if (nextProps.visible != this.props.visible && nextProps.visible === true) {
			this.props.form.resetFields(['pwd_old', 'pwd_new'])
		}
	}
	submitHandle = () => {
		const { getFieldValue, getFieldsValue } = this.props.form
		const roleType = 'plat'
		let pwd_old = getFieldValue('pwd_old'),
			pwd_new = getFieldValue('pwd_new'),
			admin_id = this.props.adminId

		if (!pwd_old) {
			message.error('请填写原密码')
			return
		}
		else if (!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,16}$/.test(pwd_new)) {
			message.error('新密码过于简单')
			return
		}
		let result = getFieldsValue()
		result[({ "plat": "admin_id", "law": "lawyer_id" })[roleType]] = admin_id
		this.props.editConfirm(result)
	}
	render() {
		const { getFieldDecorator } = this.props.form
		return (
			<Modal title="自行修改密码" width={600} visible={this.props.visible} maskClosable={false} onOk={this.submitHandle} onCancel={this.props.cancelConfirm} okText="确定" cancelText="取消" >
				<Form className="admin-new-form">
					<FormItem label="原密码">
						{getFieldDecorator('pwd_old', {
							rules: [{ required: true, message: "必填项" }],
						})(
							<Input placeholder="请输入原密码" />
						)}
					</FormItem>
					<FormItem label="新密码">
						{getFieldDecorator('pwd_new', {
							rules: [{ required: true, message: "必填项" }],
						})(
							<Input placeholder="新密码需为6-16位，且包含字母、数字、符号中的至少两种" />
						)}
					</FormItem>
				</Form>
			</Modal>
		)
	}
}
export default Form.create()(EditPassword)
