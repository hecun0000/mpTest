import fly from '@/utils/fly'

const common = {
  source: 'service'
}

const scene = {
  from: 'main'
}

// 微信小程序获取用户基本信息解密并存储
export function saveUserBasicInfo (data) {
  return fly.post('api/wechatAuth/info/lite', Object.assign(common, data, scene))
}

// 获取用户绑定的手机号
export function getUserBindPhone (data) {
  return fly.post('api/wechatAuth/phone/lite', Object.assign(common, data, scene))
}

// 用户绑定手机号
export function bindPhone (data) {
  return fly.post('api/wechatAuth/phone', Object.assign(common, data, scene))
}

// 发送手机号
export function sendVerfiyCode (data) {
  return fly.post('api/wechatAuth/phone/send', Object.assign(common, data, scene))
}
