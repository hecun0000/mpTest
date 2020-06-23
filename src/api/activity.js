import fly from '@/utils/fly'

export function getAtivity (data) {
  return fly.get('/activity', data)
}
