// const NotificationCenter = require('./NotificationCenter.js');

import NotificationCenter from './Notification'

export default class Event {
  static PAGE_REFRESH = 'PAGE_REFRESH'; // 选择模版
  static AUTH_STATUS_CHANGE = 'AUTH_STATUS_CHANGE'; // 用户授权状态变更

  static listen (eventName, callback, observer) {
    // 先移除监听
    this.remove(eventName, observer)
    NotificationCenter.addNotification(eventName, callback, observer)
  }

  static listenSignal (eventName, callback, observer) {
    NotificationCenter.addNotificationSignal(eventName, callback, observer)
  }

  static emit (eventName, params) {
    NotificationCenter.postNotificationName(eventName, params)
  }

  static remove (eventName, observer) {
    NotificationCenter.removeNotification(eventName, observer)
  }

  static getNotices () {
    return NotificationCenter.getNotices()
  }
}
