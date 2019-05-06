import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { test } from '../../redux/actions'
import { connect } from 'react-redux'

class User extends Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  }
  componentWillMount() {
    this.props.test()
  }
  render() {
    const { userList } = this.props
    console.log('userList:', userList)
    return (
      <div>后台用户</div>
    )
  }
}
export default connect(store => ({ userList: store.userList }), { test })(User )