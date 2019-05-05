/*
包含n个reducer函数: 根据老的state和指定的action返回一个新的state
 */
import { combineReducers } from 'redux'

const initUserList = []

function userList(preState = initUserList, action) {
  switch (action.type) {
    default:
      return preState
  }
}

export default combineReducers({
  userList,
})
// 向外暴露的状态的结构: {user: {}, userList: [], chat: {}}

