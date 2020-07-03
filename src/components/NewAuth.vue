<template>
    <div class="auth-box" v-if="showAuthModal">
        <div class="content">
            <div class="title">登录</div>
            <div class="center">
                <div class="view-icon">
                    <open-data class="avatar-icon" type="userAvatarUrl"></open-data>
                </div>
                <open-data class="nickName" type="userNickName"></open-data>
            </div>
            <!--授权按钮-->
            <button open-type="getUserInfo" class="auth-btn" @getuserinfo="onGetUserInfo" lang="zh_CN">微信快捷登陆</button>
        </div>
    </div>
</template>

<script>
    // import { saveUserBasicInfo } from '@/api/wechatAuth'
import Event from '@/utils/notice/Event'
import BaseComponent from '@/utils/baseComponent'
import { getUserInfo } from '@/api/user'
import store from '@/store'
export default new BaseComponent({
      name: 'Auth',
      data () {
        return {
          showAuthModal: false,
          userInfo: {}
        }
  },
      methods: {
        onGetUserInfo (e) {
          // let self = this
          let res = e.mp.detail
          if (res.errMsg === 'getUserInfo:fail auth deny') {
            console.info('auth deny')
            Event.emit(Event.AUTH_STATUS_CHANGE, -1)
            return
          }
          console.log(res)
          if (res.errMsg === 'getUserInfo:ok') {
            wx.showNavigationBarLoading()
            this.showAuthModal = false
            getUserInfo({
              sessionKey: store.state.sessionKey,
              signature: res.signature,
              rawData: res.rawData,
              encryptedData: res.encryptedData,
              iv: res.iv
            }).then(res => {
              wx.hideNavigationBarLoading()
              console.log(res, 'ddddddd')
              // store.state.userInfo.avatar = res.avatarUrl
              // store.state.userInfo.nickName = res.nickName
            })
          }
        },
        checkUserAuth () {
          wx.getSetting({
            success: (res) => {
              console.log(res)
              if (res.authSetting['scope.userInfo']) {
                this.showAuthModal = false
              } else {
                this.showAuthModal = true
              }
            },
            complete: (res) => { //

            }
          })
        }
      },

      onLoad () {
        this.checkUserAuth()
      },
      onShow () {
        // let authInfo = wx.getStorageSync('authInfo')
        // if (authInfo && authInfo.token) {
        //   this.showAuthModal = false
        // }
      }
    })
</script>

<style lang="less" scoped>
    .auth-box{
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.5);
        z-index: 999;
    }
    .content{
        background: #fff;
        border-radius: 10rpx;
        width: 600rpx;
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%,-30%);
        .title{
            color: #000;
            font-size: 32rpx;
            text-align: center;
            padding: 30rpx;
            border-bottom: 1rpx solid #E4E4E4;
            border-radius: 10rpx 10rpx 0 0;
        }
        .center{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 30rpx;
            padding-top: 60rpx;
            position: relative;
            .view-icon {
                width:100rpx;
                height:100rpx;
                border-radius: 50%;
                overflow:hidden;
            }
            .nickName {
                padding-top: 20rpx;
                font-size: 30rpx;
                color: #333;
            }

            .btn{
                position: absolute;
                right: 50rpx;
                bottom: 30rpx;
                background: #f1f1f1;
                width: 120rpx;
                height: 120rpx;
                line-height: 116rpx;
                border-radius:50%;
                color: #58C44B;
                font-size: 30rpx;
                text-align: center;
                border:4rpx solid #fff;
            }
        }
        .auth-btn{
            background: #FF4E6F;
            color: #fff;
            padding: 20rpx;
            border-radius: 10rpx;
            width: 90%;
            font-size: 30rpx;
            margin: 0 auto;
            margin-bottom: 30rpx;
        }
    }
</style>
