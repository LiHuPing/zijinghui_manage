/*
包含了n个接口请求的函数的模块
函数返回值为: promise
 */

import ajax from './ajax'
export const reqLogin = data => (ajax('/admin/login/', { ...data, authType: 'pub'}))

export const reqLogout = data => (ajax('/admin/logout/', data))

export const reqUserList = data => (ajax('/admin/search/', data))





export const reqUpdateUserInfo = data => (ajax('/admin/modifyrec/', data))

export const reqUserInfo = data => (ajax('/admin/detail/', data))

export const reqAddUser = data => (ajax('/admin/newrec/', data))

export const reqDeleteUser = data => (ajax('/admin/delrec/', data))

export const reqFreeze = data => (ajax('/admin/freeze/', data))

export const reqUpdatePwd = data => (ajax('/admin/editpwd/', data))
