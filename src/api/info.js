import fly from '@/utils/fly'

export function getUserInfo (data) {
  return fly.get('/user-info', data)
}
export function setUserInfo (data) {
  return fly.put('/user-info', data)
}
