/*
入口JS
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import Login from './containers/login/login'
import Main from './containers/main/main'
import NotFound from './components/not-found/not-found'
import './assets/css/style.less'
ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route component={Main} />
        <Route path="/notFound" component={NotFound} />
      </Switch>
    </BrowserRouter>
  </Provider >
), document.getElementById('root'))