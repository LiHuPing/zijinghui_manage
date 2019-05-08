import React, { Component } from 'react'
import { Menu, Dropdown, Button, Icon } from 'antd'
import EditPassword from '../editPassword/editPassword'
import AlterScreen from '../alterScreen/alterScreen'
import Music from '../music/music'
const MenuItem = Menu.Item
export default class TopButton extends Component {
  state = {
    modalV: false,
    modalV2: false,
    bgm: false
  }

  handleLogout = () => {

  }
  editPassword = () => {
    this.setState({
      modalV: true
    })
  }
  editPwdSubmit = (param) => {

  }

  brightAdjust = () => {
    this.setState({
      modalV2: true
    })
  }

  bgmCtrl = () => {
    this.setState({ bgm: !this.state.bgm })
  }
  render() {
    const menu = (
      <Menu>
        <MenuItem>
          <div onClick={this.editPassword}>
            <Icon type="edit" /> 修改密码
					</div>
        </MenuItem>
        <MenuItem>
          <div onClick={this.brightAdjust}>
            <Icon type="eye" /> 屏幕亮度
					</div>
        </MenuItem>
        <MenuItem>
          <div onClick={this.bgmCtrl}>
            {this.state.bgm ? <Icon type="pause-circle" /> : <Icon type="play-circle" />} 背景音乐
					</div>
        </MenuItem>
        <MenuItem>
          <div onClick={this.handleLogout}>
            <Icon type="logout" /> 退出登录
					</div>
        </MenuItem>
      </Menu>
    )
    return (
      <div>
        <Dropdown overlay={menu} placement="bottomLeft">
          <Button className="top-buttons" icon="user">
            李虎平
					</Button>
        </Dropdown>
        <EditPassword visible={this.state.modalV} editConfirm={this.editPwdSubmit} cancelConfirm={() => {
          this.setState({
            modalV: false
          })
        }} {...this.props} />
        <AlterScreen visible={this.state.modalV2} closeConfirm={() => {
          this.setState({
            modalV2: false
          })
        }} {...this.props} />
        {
          this.state.bgm ? <Music /> : null
        }
      </div>
    )
  }
}


