/*
	权限组编辑
	Created by Luzhipeng in 2018.12.03
*/
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '@/store/actions';
import { Layout, Button, Form, Input, Checkbox, Row, Col, message } from 'antd';
import configs from '@/config';
import { authRender } from '@/utils/authrender';
import arrayUniq from 'array-uniq';
import md5 from 'md5';

const { Sider, Content } = Layout
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group

class Permedit extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			
		}
	}
	
	selectAll = (e) => {
		const { basicperm, form } = this.props
		const groupItemsName =  this.groupItemName()
		if (e.target.checked === true){
			const fieldValue = {};
			groupItemsName.forEach(n => {
					fieldValue[n + 'Permission'] = basicperm.filter(item => item.function_code === n).map(item => item.perm_id)
			})
			form.setFieldsValue(fieldValue)
		} 
		else if (e.target.checked === false) {
			const fieldValue = {};
			groupItemsName.forEach(n => {
					fieldValue[n + 'Permission'] = []
			})
			form.setFieldsValue(fieldValue)
		}
	}
	
	groupItemName = () => {
		const { basicperm } = this.props;
		return arrayUniq(basicperm.map(group => group.function_code)) || [];
	}
	
	// 获取基本权限
	getBasicperm = () => {
		let { Ajax } = this.props.actions
		Ajax({
			url: `${ configs.THE_HOST }/sysset/basicperm/`,
			method: 'post',
			data: { 
				token: md5('XJL_CRM_API'),
				authType: 'pub'
			},
			action: 'pushBasicperm',
			success: res => {
				
			},
			fail: res => {
				message.error(res.data)
			}
		})
	}
	
	// 获取待改权限
	getPermDetail = () => {
		let { Ajax } = this.props.actions
		let { perm_group_id } = this.props.params
		Ajax({
			url: `${ configs.THE_HOST }/permgroup/detail/`,
			method: 'post',
			data: { perm_group_id },
			action: 'pushPermDetail',
			success: res => {
				
			},
			fail: res => {
				message.error(res.data)
			}
		})
	}
	
	// 提交修改
	handleSubmit = () => {
		const { getFieldsValue } = this.props.form
		const { perm_group_id } = this.props.params
		const groupItemsName =  this.groupItemName()
		const authArray = getFieldsValue(groupItemsName.map(item => item + 'Permission'));
		const permissionList = Object.keys(authArray).filter(n => authArray[n] && authArray[n].length > 0).map(n => authArray[n].join(',')).toString();
		const postData = Object.assign({
			perm: permissionList,
			perm_group_id
		},
		getFieldsValue(['group_name','notes']))
		
		let { Ajax } = this.props.actions
		Ajax({
			url: `${ configs.THE_HOST }/permgroup/modifyrec/`,
			method: 'post',
			data: postData,
			success: res => {
				message.success(res.msg)
				let { AjaxRelogin } = this.props.actions
				AjaxRelogin({
					method: 'post',
					data: { },
					success: res => {
						browserHistory.push('/system/permission?select=list')
						message.success('重获取权限成功')
					}
				})
			},
			fail: res => {
				message.error(res.data)
			}
		})
	}
	
	isItAll = (checked) => {
		const { getFieldsValue, setFieldsValue } = this.props.form
		const { basicperm } = this.props
		const groupItemsName =  this.groupItemName()
		const authArray = getFieldsValue(groupItemsName.map(item => item + 'Permission'));
		const permissionList = Object.keys(authArray).filter(n => authArray[n] && authArray[n].length > 0).map(n => authArray[n])
		let permissionNow = Array.prototype.concat.apply([], permissionList)
		setFieldsValue({ "selectAll": permissionNow.length === basicperm.length })
	}
	
	render() {
		const { getFieldDecorator } = this.props.form
		const { basicperm } = this.props || []
		
		const groupItemsName = arrayUniq(basicperm.map(group => group.function_code + ',' + group.function_name));
		const groupItems = groupItemsName.map(group => (
			<Col xs={ 24 } sm={ 12 } key={group.split(",")[0]} >
				<FormItem label={group.split(",")[1]}>
					{getFieldDecorator(group.split(",")[0] + 'Permission')(
							<CheckboxGroup onChange={() => { setTimeout(this.isItAll) }} options={basicperm.filter(item => item.function_code === group.split(",")[0]).map(n => {
									let lt = {};
									lt.label = n.perm_name;
									lt.value = n.perm_id;
									return lt
								})}
							/>
					)}
				</FormItem>
			</Col>
		));
		
		return (
			<Layout className="bg-fff flex-initial">
				<Content className="tb-contain">
					<div className="marb-30">
						<Button icon="rollback" type="default" onClick={ () => {
							browserHistory.push({ pathname: '/system/permission' })
						} }>返回</Button>
					</div>
					<Form className="form-with-editor">
						<Row>
							<Col xs={ 24 } sm={ 12 } >
								<FormItem label="权限组名称">
									{getFieldDecorator('group_name', {
										rules: [{ required: true, message: "必填项"}],
									})(
										<Input maxLength="20" placeholder="2-20个字符" />
									)}
								</FormItem>
							</Col>
							<Col xs={ 24 } sm={ 12 } >
								<FormItem label="备注">
									{getFieldDecorator('notes')(
										<Input placeholder="权限组备注（选填）" />
									)}
								</FormItem>
							</Col>
							{ groupItems }
						</Row>
						<FormItem className="text-center mart-60">
							{
								getFieldDecorator('selectAll', {
									valuePropName: "checked"
								})(<Checkbox key="all" onChange={ this.selectAll } >全选</Checkbox>)
							}
							{
								authRender('permgroup/modifyrec/', this.props) ?
								<Button size="large" type="primary" onClick={ this.handleSubmit }>提交修改</Button> : null
							}
						</FormItem>
					</Form>
					
				</Content>
			</Layout>
		)
	}
	
	componentDidMount(){
		this.getBasicperm()
		this.getPermDetail()
	}
}


// lead stores in
const mapStateToProps = state => ({
	basicperm: state.systemInfo['basicperm'],
	perm_detail: state.detailRecord['perm_detail'],
	permSelf: state.loginInfo['perm']
})

// lead actions in
const mapDispatchToProps = dispatch => ({ "actions": bindActionCreators(actions, dispatch) })

Permedit = Form.create({
	mapPropsToFields(props){
		// 填充待改权限
		const detail = props.perm_detail || {}
		const group_name = detail.group_name || ''
		const notes = detail.notes || ''
		const permission = detail.permission || []
		const isSelectAll = (permission.length === props.basicperm.length)
		
		let result = {
			"group_name": Form.createFormField({ value: group_name }),
			"notes": Form.createFormField({ value: notes }),
			"selectAll": Form.createFormField({ value: isSelectAll })
		}
		
		const groupItemsValue = arrayUniq(permission.map(group => group.function_code)).forEach(item => {
			const permIdArray = permission.filter(n => n.function_code === item).map(s => s.perm_id)
			result[item + 'Permission'] = Form.createFormField({ value: permIdArray })
		})
		
		return result
	}
})(Permedit)

export default connect(mapStateToProps, mapDispatchToProps)(Permedit)
