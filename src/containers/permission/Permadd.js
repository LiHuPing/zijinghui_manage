import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Layout, Button, Form, Input, Checkbox, Row, Col, message } from 'antd';
import configs from '@/config';
import arrayUniq from 'array-uniq';

const { Sider, Content } = Layout
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group

class Permadd extends Component {
	
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
	
	// 提交权限组
	handleSubmit = () => {
		let { getFieldsValue, getFieldValue } = this.props.form
		
		if( !getFieldValue('group_name') ){
			message.error('请填写权限组名称')
			return
		}
		else if( getFieldValue('group_name').length < 2 || getFieldValue('group_name').length > 20 ){
			message.error('权限组名称需2-20位')
			return
		}
		
		const groupItemsName =  this.groupItemName();
		const authArray = getFieldsValue(groupItemsName.map(item => item + 'Permission'));
		const permissionList = Object.keys(authArray).filter(n => authArray[n] && authArray[n].length > 0).map(n => authArray[n].join(',')).toString();
		const postData = Object.assign({ 
			'perm': permissionList 
		}, getFieldsValue(['group_name','notes']))
		
		let { Ajax } = this.props.actions
		Ajax({
			url: `${ configs.THE_HOST }/permgroup/newrec/`,
			method: 'post',
			data: postData,
			success: res => {
				message.success(res.msg)
				browserHistory.push('/system/permission?select=list')
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
		const { basicperm } = this.props
		
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
							<Button size="large" type="primary" onClick={ this.handleSubmit }>提交权限组</Button>
						</FormItem>
					</Form>
					
				</Content>
			</Layout>
		)
	}
	
	componentDidMount(){
		
	}
}

Permadd = Form.create()(Permadd)

export default Permadd
