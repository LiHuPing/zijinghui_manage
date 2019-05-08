import React, { Component } from 'react';
import { Button, Modal, Slider } from 'antd';
export default class AlterScreen extends Component {
	componentWillUpdate(nextProps) {
		if (nextProps.visible != this.props.visible && nextProps.visible === true) {
			
		}
	}
	brightChange = (v) => {
		document.querySelector('html').style.filter = `brightness(${v / 100})`
	}

	isWebkit = () => navigator.userAgent.toLowerCase().indexOf('applewebkit') > -1
	render() {
		let { brightness } = this.props
		let marks = {
			40: '40',
			100: '100'
		}

		return (
			<Modal title="调整屏幕亮度" width={450} visible={this.props.visible} maskClosable={false} onCancel={this.props.closeConfirm} footer={[
				<Button key="close" onClick={this.props.closeConfirm}>关闭</Button>
			]} mask={false}>
				{
					this.isWebkit() ?
						<Slider min={40} max={100} defaultValue={brightness} onChange={this.brightChange} marks={marks} /> : <h2 className="text-center">该功能需要Chrome内核的浏览器</h2>
				}
			</Modal>
		)
	}

	componentDidMount() {
		/* let brightness = cookies.get('brightness')
		if (!!brightness && this.isWebkit()) {
			document.querySelector('html').style.filter = `brightness(${brightness / 100})`
		} */
	}
}

