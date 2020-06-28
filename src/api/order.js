import fly from '@/utils/fly'

export function getOrder (data) {
  return fly.get('/order', data)
}

// 生成订单
export function createOrder (data) {
  return fly.post('/order', data)
}

// 根据订单号 获取订单详情
export function getOrderByID (data) {
  return fly.get('/order/info', data)
}

// 参加拼团/助力
export function addShare (data) {
  return fly.post('/share', data)
}
