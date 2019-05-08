/*
入口JS
 */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory, Switch } from 'react-router'
import { Provider } from 'react-redux'
import store from './redux/store'
import Login from './containers/login/login'
import Main from './containers/main/main'

import AdminIndex from './containers/admin/adminIndex'

import PermIndex from './containers/permission/permIndex'
import PermList from './containers/permission/permList'
import PermDetail from './containers/permission/permDetail'
import PermAdd from './containers/permission/permAdd'


import './assets/css/style.less'
class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return this.props.children
  }
}

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Main} />
        <Route path="/login" component={Login} />
        <Route path='/system' component={Main}>
          <IndexRoute to='/system/adminIndex' />
          <Route path='/system/adminIndex' component={AdminIndex} />
          <Route path='/system/permIndex' component={PermIndex} >
            <Route path='/system/permIndex:list' component={PermList} />
            <Route path='/system/permIndex:add' component={PermAdd} />
            <Route path='/system/permIndex:detail' component={PermDetail} />
          </Route>
          
        </Route>
      </Route>
    </Router>
  </Provider >
), document.getElementById('root'))