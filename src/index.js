/*
入口JS
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import Login from './containers/login/login'
import Main from './containers/main/main'
import NotFound from './components/not-found/not-found'
import User from './containers/user/user'
ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Main >
          <Route path='/user' component={User}>
            <Route path='/notFound' component={NotFound} />
            <Route path='/notFound' component={NotFound} />
          </Route>
          <Route path='/notFound' component={NotFound} />
        </Main>
      </Switch>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'))