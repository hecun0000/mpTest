import fly from '@/utils/fly'

export function getAtivity (data) {
  return fly.get('/activity', data)
}

export function getSwiper (id) {
  return fly.get('/image/' + id)
}

export function getQa (id) {
  return fly.get('/qa/act/' + id)
}
