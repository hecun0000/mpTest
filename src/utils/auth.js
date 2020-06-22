import Store from '@/store'

const Fly = require('flyio/dist/npm/wx')
const fly = new Fly()
// 微信授权登录
export default class auth {
    static isLiting = false;

    static async appCheckAuth () {
      return new Promise(function (resolve) {
        if (auth.isLiting) {
          resolve(false)
          return
        }
        if (auth.checkAuth()) {
          auth.isLiting = false
          Store.state.authInfo = wx.getStorageSync('authInfo')
          resolve(true)
          return
        }
        auth.isLiting = true
        wx.showLoading({
          title: '加载中...',
          mask: true
        })

        // 无效
        wx.login({
          success: res => {
            let code = res.code
            console.log(res, res.code, 'ddddd')
            fly.get(`${Store.state.domain}wx/user/login`, {
              code: code
            }).then(response => {
              wx.hideLoading()
              const res = response.data.data
              Store.state.sessionKey = res
              resolve(true)
            })
          },
          fail: res => {
            auth.isLiting = false
            resolve(false)
          }
        })
      })
    }

  // 检查令牌是否有效 true--> 有效  false--> 无效

    static checkAuth () {
      // TODO: 修改过期时间
      let authInfo = wx.getStorageSync('authInfo') || {}
      let expiryTime = 0
      let nowTime = ~~(Date.now() / 1000)

      if (authInfo.exp) {
        expiryTime = authInfo.exp
      }

      return expiryTime - nowTime > 300
    }

  // 获取token
    static getToken () {
      let authInfo = wx.getStorageSync('authInfo')
      return authInfo.token
    }
  // 获取token
    static saveToken (type, token) {
      let res = wx.getStorageInfoSync()
      let keys = res.keys
      if (keys.length > 30) {
        for (let i = 0, len = keys.length; i < len; i++) {
          if (keys[i].indexOf('storeToken_') >= 0) {
            wx.removeStorageSync(keys[i])
          }
        }
      }

      let key = 'storeToken_' + type
      wx.setStorageSync(key, token)
    }
}
