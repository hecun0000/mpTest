
import auth from '@/utils/auth'
import basePlatPage from './basePlatPage'
export default class baseComponent {
    baseData = {
      sizeRatio: 750 / 320
    };

    constructor (componentObj) {
      if (componentObj.data) { // data域合并
        let _data = componentObj.data
        let data = this.baseData

        componentObj.data = function () {
          return Object.assign(data, _data())
        }
      }
      // 组件的全局处理
      // 注册onRefresh事件等，希望刷新的时候，由各自的组件维护自己的数据域
      if (componentObj.needAuth) {
        if (componentObj.onLoad) {
          let _onLoad = componentObj.onLoad
          componentObj.onLoad = async function (options) {
            await baseComponent.wait()
            _onLoad.call(this, options)
          }
        } else if (componentObj.mounted) {
          let _mounted = componentObj.mounted
          componentObj.mounted = async function () {
            await baseComponent.wait()
            _mounted.call(this)
          }
        }
      }

      return componentObj
    }

    static async wait () {
      if (auth.isLiting) {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log(auth.isLiting, '-------')
            resolve(baseComponent.wait())
          }, 150)
        })
      } else {
        await baseComponent.checkAuth()
      }
    }

    static async checkAuth () {
      while (auth.isLiting) {
        console.log('-----------auth.isLiting-----------')
      }

      let result = await auth.appCheckAuth()
      if (!result) {
        wx.showToast({
          title: '用户校验失败',
          icon: 'none'
        })
        basePlatPage.jumpForbidden()
      }
    }
}
