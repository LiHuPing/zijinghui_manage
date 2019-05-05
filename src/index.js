/*
入口JS
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import System from './containers/system/system'
import Login from './containers/login/login'
ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route component={System}></Route> 默认路由
      </Switch>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'))