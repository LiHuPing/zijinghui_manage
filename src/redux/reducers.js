/*
包含n个reducer函数: 根据老的state和指定的action返回一个新的state
 */
import { RECEIVE_USER, RECEIVE_USERlIST, DELETE_USER, RECEIVE_PERMLIST } from './action-types'
import { combineReducers } from 'redux'

const initList = {
  current_page: 1,
  page_size: 15,
  list: []
}
const initUser = {
  admin_id: '',
  login_key: '97d812db7e3fa7e1a11748163412b4b3',
  admin_name: '',
  phone: ''
}
function userList(preState = initList, action) {
  switch (action.type) {
    case RECEIVE_USERlIST:
      const data = action.data
      return { ...preState, ...data }
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
function permList(preState = initList, action) {
  switch (action.type) {
    case RECEIVE_PERMLIST:
      const data = action.data
      return { ...preState, ...data }
    default:
      return { ...preState }
  }
}







export default combineReducers({
  user,
  userList,
  permList
})
// 向外暴露的状态的结构: {user: {}, userList: [], chat: {}}

