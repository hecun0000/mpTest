const UPDATE = 'UPDATE'
const MINUTE = 'MINUTE'
const ADD = 'ADD'
const SELECTED = 'SELECTED'
const UPDATE_TARGET = 'UPDATE_TARGET'

const mutations = {
  [UPDATE] (state, payload) {
    state.cartList = payload
  },
  [MINUTE] (state, payload) {
    state.cartList[payload].count--
  },
  [ADD] (state, payload) {
    state.cartList[payload].count++
  },
  [SELECTED] (state, payload) {
    state.cartList[payload].select = !state.cartList[payload].select
  },
  [UPDATE_TARGET] (state, payload) {
    state.cartList[payload.index].sku = payload.sku
    state.cartList[payload.index].sku_id = payload.sku_id
    state.cartList[payload.index].count = payload.count
    state.cartList[payload.index].price = payload.price
  },
  sessionKey (state, key) {
    state.sessionKey = key
  }
}

export default mutations
