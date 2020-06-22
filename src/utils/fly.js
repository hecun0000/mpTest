// token
// import auth from './auth'
import Store from '../store'

const Fly = require('flyio/dist/npm/wx')
const fly = new Fly()

const baseURL = Store.state.baseURL
// const serviceURL = Store.state.domain

const baseConfig = {
  method: 'post',
  timeout: 60000,
  parseJson: true,
  withCredentials: false
}

fly.config = baseConfig

// 请求拦截
fly.interceptors.request.use(async (config) => {
  // 请求头

  // let token = await wait()

  // if (config.body && config.body.source === 'service') config.baseURL = serviceURL
  // else
  config.baseURL = baseURL

  // if (config.body) config.body.envVersion = Store.state.envVersion
  // else {
  //   config.body = {
  //     envVersion: Store.state.envVersion,
  //     version: Store.state.version
  //   }
  // }

  // config.body.newVersion = Store.state.newVersion // 当前版本号

  // config.headers['token'] = token

  // Store.state.requestHeader = config
  return config
})

// 响应拦截器
fly.interceptors.response.use(response => {
  // // 特殊提示
  // if (response.data.error === 1) {
  //   console.log('header', Store.state.requestHeader)
  //   // console.error(response)
  //   wx.showModal({
  //     title: '出错啦',
  //     content: response.data.error_reason,
  //     showCancel: false
  //   })
  //   return { fail: true }
  // }

  // // 出错了
  // let authErrCode = [
  //   10001, 10002, 10003, 10004, 10005
  // ]

  // if ((parseInt(response.data.error) !== 0)) {
  //   console.log('header', Store.state.requestHeader)
  //   console.error('response', response)
  //   wx.hideLoading()

  //   if (authErrCode.indexOf(parseInt(response.data.error)) > -1) { // 触发重新获取令牌操作

  //   } else {
  //     wx.showModal({
  //       title: '温馨提示',
  //       content: response.data.error_reason,
  //       showCancel: false
  //     })

  //     return { fail: true }
  //   }
  // }

  return (response && response.data) || { success: true }
}, error => {
  console.log('header', Store.state.requestHeader)
  console.error('fail', error)
  return error
})

// async function wait () {
//   return new Promise((resolve) => {
//     let token = auth.getToken()
//     if (!token) {
//       setTimeout(() => {
//         console.log('---wait---')
//         resolve(wait())
//       }, 200)
//     } else {
//       resolve(token)
//     }
//   })
// }

export default fly
