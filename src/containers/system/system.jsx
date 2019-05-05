import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { test } from '../../redux/actions'
import { connect } from 'react-redux'
import { Layout } from 'antd'
const { Header, Footer, Sider, Content } = Layout
class System extends Component {
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
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    )
  }
}
export default connect(store => ({ userList: store.userList }), { test })(System)