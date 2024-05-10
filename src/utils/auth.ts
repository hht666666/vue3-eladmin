import Cookies from 'js-cookie'
import { HttPRequest } from './http'
// 随着实际情况变化而变化
const TokenKey = HttPRequest.TOKENKEY

//获取
export function getToken() {
  return Cookies.get(TokenKey)
}
//存储
export function setToken(token: string) {
  return Cookies.set(TokenKey, token)
}
//删除
export function removeToken() {
  return Cookies.remove(TokenKey)
}
