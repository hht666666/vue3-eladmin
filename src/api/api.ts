import http from '../utils/httpRequest'

//获取验证码图片
export const loginCode = () => {
  return http.get<any>('/auth/code')
}

//登录
interface Ilogin {
  username: string
  password: string
  code: string
  uuid: string
}
export const login = (data: Ilogin) => {
  return http.post<any>('/auth/login', data)
}

//左侧导航栏
export const getMenu = () => {
  return http.get<any>('/api/menus/build')
}
//---------------------------------用户管理---------------------------------
//获取用户管理树形结构
export const getUserTree = (pid?: number) => {
  return http.get<any>('/api/dept?sort=id,desc', { pid })
}
//搜索部门列表
export const searchDept = (name: string) => {
  return http.get<any>('/api/dept?sort=id,desc', { name })
}

//获取用户列表
interface IuserList {
  page: number
  size: number
  sort: string
  deptId: any
}
export const getUserList = (params: IuserList) => {
  return http.get<any>('/api/users', params)
}
//删除用户
export const deleteUser = (id: number) => {
  return http.delete<any>(`/api/users`, [id])
}
//---------------------------------角色管理---------------------------------
//获取角色列表
interface IroleList {
  page: number
  size: number
  sort: string
}
export const getRoleList = (params: IroleList) => {
  return http.get<any>('/api/roles', params)
}
//获取菜单分配列表
export const getMenuList = (pid: number) => {
  return http.get<any>(`/api/menus/lazy`, { pid })
}
