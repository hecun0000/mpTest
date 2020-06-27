import fly from '@/utils/fly'

export function getAtivity (data) {
  return fly.get('/activity', data)
}

export function getAtivityById (id) {
  return fly.get('/activity/' + id)
}

export function getSwiper (id) {
  return fly.get('/image/' + id)
}

export function getQa (id) {
  return fly.get('/qa/act/' + id)
}

export function getPay (data) {
  return fly.get('/pay/doUnifiedOrder', data)
}
