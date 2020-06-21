import fly from '@/utils/fly'

// 微信小程序获取用户基本信息解密并存储
export function getQrCode (data) {
  return fly.get('/wx/user/wxcode', data)
}

export function getUserInfo (data) {
  return fly.get('/wx/user/info', data)
}
