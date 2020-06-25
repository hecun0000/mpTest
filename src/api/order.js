import fly from '@/utils/fly'

export function getOrder (data) {
  return fly.get('/order', data)
}
