/*
包含n个reducer函数: 根据老的state和指定的action返回一个新的state
 */
import { RECEIVE_USER, RECEIVE_USERlIST, DELETE_USER } from './action-types'
import { combineReducers } from 'redux'

const initUserList = {
  current_page: 1,
  page_size: 15,
  list: []
}
const initUser = {
  admin_id: '',
  login_key: '69dde233522558a151819215bd707dc1',
  admin_name: '',
  phone: ''
}
function userList(preState = initUserList, action) {
  switch (action.type) {
    case RECEIVE_USERlIST:
      const userList = action.data
      return { ...preState, ...userList }
    case DELETE_USER:
      const list = preState.list.filter(item => item.admin_id * 1 !== action.data)
      return { ...preState, list }
    default:
      return { ...preState }
  }
}
function user(preState = initUser, action) {
  switch (action.type) {
    case RECEIVE_USER:
      const user = action.data
      return { ...preState, ...user }
    default:
      return { ...preState }
  }
}

export default combineReducers({
  user,
  userList
})
// 向外暴露的状态的结构: {user: {}, userList: [], chat: {}}

