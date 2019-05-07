/*
	权限组列表
	Created by Luzhipeng in 2018.12.03
*/

import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Layout, Table, Button, Form, Input, Modal, message } from 'antd';
import configs from '@/config'
import { authRender } from '@/utils/authrender';
const { Sider, Content } = Layout
const FormItem = Form.Item
const confirm = Modal.confirm
const sign = 'PERMSEARCH'

class Permlist extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			editId: ""
		}
		this.columns = [{
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
					{ 
						authRender('permgroup/modifyrec/', this.props) ?
						<Link to={ `/system/permedit/${ record.perm_group_id }` } className="color-blue">编辑</Link> : null
					}&nbsp;&nbsp;
					{ 
						authRender('permgroup/delrec/', this.props) ?
						<a onClick={ this.deletePerm.bind(this, record.perm_group_id) } >删除</a> : null
					}
				</div>
			)
		}]
	}
	
	direct(ID){
		this.setState({
			editId: ID,
			modalV: true
		})
	}
	
	// 删除权限组
	deletePerm(perm_group_id){
		let { Ajax } = this.props.actions
		confirm({
			title: '温馨提示',
			content: '确认要进行此操作吗？',
			onOk: () => {
				Ajax({
					url: `${ configs.THE_HOST }/permgroup/delrec/`,
					method: 'post',
					data: { perm_group_id },
					success: res => {
						message.success(res.msg)
						this.pullData()
					},
					fail: res => {
						message.error(res.data)
					}
				})
			},
			okText: '确定',
			cancelText: '取消'
		})
	}
	
	// 获取表格数据
	pullData(){
		const { AjaxList } = this.props.actions
		let { group_name } = this.props.listData
		
		this.setState({ loading: true })
		AjaxList({
			url: `${ configs.THE_HOST }/permgroup/search/`,
			method: 'post',
			data: { group_name },
			sign: sign,
			success: res => {
				this.setState({ loading: false })
			},
			fail: res => {
				this.setState({ loading: false })
				message.error(res.data)
			}
		})
	}
	
	// 翻页
	handleTableChange(pageC, filters, sorter){
		const current = pageC.current
		const { pushListData } = this.props.actions
		const { getFieldsValue } = this.props.form
		pushListData(sign, { current, ...getFieldsValue() })
		setTimeout(() => { this.pullData() })
	}
	
	// 条件搜索
	search(){
		const { pushListData } = this.props.actions
		const { getFieldsValue } = this.props.form
		let current = 1
		pushListData(sign, { 
			current, 
			...getFieldsValue()
		})
		setTimeout(() => { this.pullData() })
	}
	
	// 重置清除
	resetTable(){
		const { pushListData } = this.props.actions
		const { getFieldsValue, resetFields } = this.props.form
		resetFields()
		let current = 1
		pushListData(sign, { 
			current,
			...getFieldsValue()
		})
		setTimeout(() => { this.pullData() })
	}
	
	render() {
		const formItemLayout = {
			labelCol: { span: 10 },
			wrapperCol: { span: 14 }
		}
		const { getFieldDecorator } = this.props.form
		
		return (
			<Layout className="bg-fff flex-initial">
				<Content className="tb-contain">
					<Form layout="inline">
						<FormItem { ...formItemLayout } label="权限组名称">
							{getFieldDecorator('group_name')(
								<Input placeholder="请输入权限组名称" />
							)}
						</FormItem>
					</Form>
					<div className="btn-group text-right">
						<Button type="primary" onClick={ this.search.bind(this) } icon="search">搜索</Button>
						<Button type="default" onClick={ this.resetTable.bind(this) } icon="delete">清除</Button>
					</div>
					<Table className="table-fixed" rowClassName={ (record, index) => index%2 === 1 ? 'bg-fa' : '' } columns={ this.columns } dataSource={ this.props.listData.list } pagination={{ 
						current: this.props.listData.current,
						pageSize: configs.pageSize,
						total: this.props.listData.total
					}} onChange={ this.handleTableChange.bind(this) } loading={ this.state.loading } rowKey={ record => record.perm_group_id } />
					
				</Content>
			</Layout>
		)
	}
	
	componentDidMount(){
		this.resetTable()
	}
}

Permlist = Form.create()(Permlist)

export default Permlist
