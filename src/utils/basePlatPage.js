import auth from '@/utils/auth'
import store from '@/store'

export default class basePlatPage {
    baseData = {
      sizeRatio: 750 / 320,
      canShare: true,
      pagesData: {},
      pageAlias: '',
      tabBar: null,
      activeIndex: -1,
      shopId: null
    };

    constructor (pageObj) {
      let self = this
      if (pageObj.data) { // data域合并。
        let _data = pageObj.data
        let data = this.baseData
        pageObj.data = function () {
          return Object.assign(data, _data())
        }
      }

      pageObj.onShareAppMessage = self.onShareAppMessage
      pageObj.onPullDownRefresh = self.onPullDownRefresh

      if (pageObj.methods && !pageObj.methods.loadPageData) {
        pageObj.methods.loadPageData = self.loadPageData
      }
      console.log(33333333, pageObj.onLoad)
      // 拦截入参，onLoad 事件特殊处理
      if (pageObj.onLoad) {
        console.log(1211111)
        let _onLoad = pageObj.onLoad
        pageObj.onLoad = async function (options) {
          await basePlatPage.wait()

          // await basePlatPage.checkAuth();
          if (!store.state.authInfo.token) return

          await basePlatPage.sysTabBarDetail()

          if (!this.alias) {
            this.pageAlias = options.alias
          }

          basePlatPage.initPage(pageObj.title)

          // 获取分享
          // if (!store.state.storeShareInfo.isRequest) {
          //   store.state.storeShareInfo.isRequest = true
          //   getStoreShareInfo().then(res => {
          //     if (res.mtoken) {
          //       store.state.storeShareInfo.title = res.title || '快来看我分享的小程序吧'
          //       store.state.storeShareInfo.imgUrl = res.img || ''
          //       store.state.storeShareInfo.isRequest = true
          //     }
          //   })
          // }

          _onLoad.call(this, options)
        }
      }

      return pageObj
    }

    static async wait () {
      if (auth.isLiting) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(basePlatPage.wait())
          }, 150)
        })
      } else {
        await basePlatPage.checkAuth()
      }
    }

    static async checkAuth () {
      let result = await auth.appCheckAuth()
      if (!result) {
        // wx.showToast({
        //   title: '用户校验失败',
        //   icon: 'none'
        // })
        // basePlatPage.jumpForbidden()
      }

      return true
    }

    static initPage (title) {
      if (title && title.length > 0) {
        wx.setNavigationBarTitle({
          title: title
        })
      }
    }

    static jumpForbidden () {
      // wx.redirectTo({
      //   url: '/pages/forbidden/main'
      // })
    }

    /**
     * 初始化分享信息
     */
    initShare (that) {
      // 初始化页面分享信息
      if (that.canShare) {
        wx.showShareMenu({
          withShareTicket: false
        })
      } else {
        wx.hideShareMenu()
      }
    }

    onShareAppMessage (originOptions) {
      let pageShareOptions = this.onShareAppMessage ? this.onShareAppMessage() : {}
      // 获取当前路由
      let currentPage = basePlatPage.getPageInstance()
      let urlPath = currentPage.route // 当前页面url
      let jumpUrl = pageShareOptions.path || ('/' + urlPath)

      if (store.state.distributorInfo.id) {
        if (jumpUrl.indexOf('?') > -1) {
          jumpUrl += '&P_ID=' + store.state.distributorInfo.id
        } else {
          jumpUrl += '?P_ID=' + store.state.distributorInfo.id
        }
      }

      // 设置菜单中的转发按钮触发转发事件时的转发内容
      let shareObj = {
        title: pageShareOptions.title || store.state.storeShareInfo.title,
        path: jumpUrl, // 默认是当前页面，必须是以‘/’开头的完整路径 ,
        success: function (res) {
          // 转发成功之后的回调
          if (res.errMsg === 'shareAppMessage:ok') {}
        },
        fail: function (res) {
          // 转发失败之后的回调
          if (res.errMsg === 'shareAppMessage:fail cancel') {
            // 用户取消转发
          } else if (res.errMsg === 'shareAppMessage:fail') {
            // 转发失败，其中 detail message 为详细失败信息
          }
        },
        complete: function () {
          // 转发结束之后的回调（转发成不成功都会执行）

        }
      }
      return shareObj
    }

    // 支持下拉刷新
    onPullDownRefresh () {
      if (this.onRefresh) {
        this.onRefresh()
        setTimeout(() => {
          wx.stopPullDownRefresh()
        }, 1500)
      }
    }
}
