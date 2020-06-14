/**
 * 消息数组
 * @type {Array}
 * @private
 */

export default class Notification {
    static __notices = [];
    static isDebug = true;

    /**
     * addNotification
     * 注册通知对象方法
     *
     * 参数:
     * name： 注册名，一般let在公共类中
     * selector： 对应的通知方法，接受到通知后进行的动作
     * observer: 注册对象，指Page对象
     */
    static addNotification (name, selector, observer) {
      if (name && selector) {
        if (!observer) {
          console.log("addNotification Warning: no observer will can't remove notice")
        }
        console.log('addNotification:' + name)
        var newNotice = {
          name: name,
          selector: selector,
          observer: observer
        }

        this.addNotices(newNotice)
      } else {
        console.log('addNotification error: no selector or name')
      }
    }

    static addNotificationSignal (name, selector, observer) {
      if (name && selector) {
        if (!observer) {
          console.log("addNotification Warning: no observer will can't remove notice")
        }
        console.log('addNotification:' + name)
        var newNotice = {
          name: name,
          selector: selector,
          observer: observer
        }
        this.__notices = [] // 清空事件回调
        this.addNotices(newNotice)
      } else {
        console.log('addNotification error: no selector or name')
      }
    }

    /**
     * 仅添加一次监听
     *
     * 参数:
     * name： 注册名，一般let在公共类中
     * selector： 对应的通知方法，接受到通知后进行的动作
     * observer: 注册对象，指Page对象
     */
    static addOnceNotification (name, selector, observer) {
      if (this.__notices.length > 0) {
        for (var i = 0; i < this.__notices.length; i++) {
          var notice = this.__notices[i]
          if (notice.name === name) {
            if (notice.observer === observer) {
              return
            }
          }
        }
      }
      this.addNotification(name, selector, observer)
    }

    static addNotices (newNotice) {
      if (this.__notices.length > 0) {
        for (let i = 0; i < this.__notices.length; i++) {
          let hisNotice = this.__notices[i]
          // 当名称一样时进行对比，如果不是同一个 则放入数组，否则跳出
          if (newNotice.name === hisNotice.name) {
            if (!this.cmp(hisNotice, newNotice)) {
              this.__notices.push(newNotice)
            }
            return
          } else {
            this.__notices.push(newNotice)
            return
          }
        }
      } else {
        this.__notices.push(newNotice)
      }
    }

    static getNotices () {
      return this.__notices
    }

    /**
     * removeNotification
     * 移除通知方法
     *
     * 参数:
     * name: 已经注册了的通知
     * observer: 移除的通知所在的Page对象
     */

    static removeNotification (name, observer) {
      for (let i = 0; i < this.__notices.length; i++) {
        let notice = this.__notices[i]
        if (notice.name === name) {
          if (notice.observer === observer) {
            this.__notices.splice(i, 1)
            return
          }
        }
      }
    }

    /**
     * postNotificationName
     * 发送通知方法
     *
     * 参数:
     * name: 已经注册了的通知
     * info: 携带的参数
     */

    static postNotificationName (name, info) {
      console.log('postNotificationName:' + name)
      if (this.__notices.length === 0) {
        console.log("postNotificationName error: u hadn't add any notice.")
        return
      }

      for (var i = 0; i < this.__notices.length; i++) {
        var notice = this.__notices[i]

        if (notice.name === name) {
          notice.selector(info)
        }
      }
    }

  // 用于对比两个对象是否相等
    static cmp (x, y) {
      // If both x and y are null or undefined and exactly the same
      if (x === y) {
        return true
      }

      // If they are not strictly equal, they both need to be Objects
      if (!(x instanceof Object) || !(y instanceof Object)) {
        return false
      }

      // They must have the exact same prototype chain, the closest we can do is
      // test the constructor.
      if (x.constructor !== y.constructor) {
        return false
      }

      for (var p in x) {
        // Inherited properties were tested using x.constructor === y.constructor
        if (x.hasOwnProperty(p)) {
          // Allows comparing x[ p ] and y[ p ] when set to undefined
          if (!y.hasOwnProperty(p)) {
            return false
          }

          // If they have the same strict value or identity then they are equal
          if (x[p] === y[p]) {
            continue
          }

          // Numbers, Strings, statics, Booleans must be strictly equal
          if (typeof (x[p]) !== 'object') {
            return false
          }

          // Objects and Arrays must be tested recursively
          if (!Object.equals(x[p], y[p])) {
            return false
          }
        }
      }

      for (p in y) {
        // allows x[ p ] to be set to undefined
        if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
          return false
        }
      }
      return true
    };
}

//
// module.exports = {
//     addNotification: addNotification,
//     removeNotification: removeNotification,
//     postNotificationName: postNotificationName,
//     addOnceNotification: addOnceNotification,
//     getNotices: getNotices
// }
