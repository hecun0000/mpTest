<!--
 * @Author: your name
 * @Date: 2020-06-10 14:05:57
 * @LastEditTime: 2020-06-22 08:50:57
 * @LastEditors: hecun
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\pages\my\index.vue
--> 
<template>
  <div>
    <div class="header">
      <div class="info-box">
        <!-- <img :src="Store.state.userInfo.avatar?Store.state.userInfo.avatar:'http://static.hecun.site/hecun.321c947a.jpg'" alt srcset /> -->
        <open-data class="avatar-icon" type="userAvatarUrl"></open-data>
        <div>
          <span class="info-name">
            <open-data class="nickName" type="userNickName"></open-data>
            <!-- {{Store.state.userInfo.nickName?Store.state.userInfo.nickName:'http://static.hecun.site/hecun.321c947a.jpg'}} -->
            </span>
        </div>
      </div>
    </div>
    <div class="container-my">
      <ul class="list">
        <!-- <li class="list-box">
          <span class="icon order"></span>
          <div class="list-item" @click="jumpTo('/pages/order/main')">
            我的订单
            <span class="icon more" />
          </div>
        </li> -->
        <li class="list-box">
          <span class="icon coupon"></span>
          <div class="list-item" @click="jumpTo('/pages/coupon/main')">
            代金券
            <span class="icon more" />
          </div>
        </li>
        <li class="list-box">
          <span class="icon info"></span>
          <div class="list-item" @click="jumpTo('/pages/info/main')">
            个人信息
            <span class="icon more" />
          </div>
        </li>
        <li class="list-box">
          <span class="icon shop"></span>
          <div class="list-item" @click="jumpTo('/pages/shop/main')">
            我的活动
            <span class="icon more" />
          </div>
        </li>
        <!-- <li class="list-box">
          <span class="icon about"></span>
          <div class="list-item" @click="jumpTo('/pages/about/main')">
            关于
            <span class="icon more" />
          </div>
        </li> -->
      </ul>
    </div>
    <Auth></Auth>
  </div>
</template>

<script>
import BasePlatPage from '@/utils/basePlatPage'
import Auth from '@/components/NewAuth.vue'
// import Store from '@/store'
export default new BasePlatPage({
  components: {
    Auth
  },
  data () {
    return {
      // Store
    }
  },
  methods: {
    jumpTo (url) {
      wx.navigateTo({url})
    }
  },
  mounted () {
    wx.setNavigationBarTitle({
      title: '我的'
    })
  },
  onLoad () {

  }
})
</script>
<style scoped>
.header {
  height: 320rpx;
  background: #74ebd5; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #acb6e5,
    #74ebd5
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #acb6e5,
    #74ebd5
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  padding: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header .avatar-icon {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
  margin-bottom: 20rpx;
  overflow: hidden;
}

.container-my {
  overflow: auto;
}

.info-name {
  padding: 0 20rpx;
  color: #fff;
  font-size: 36rpx;
  font-weight: 400;
}

.info-box {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.list {
  /* margin-top: 20rpx; */
  background: #fff;
  border-top: 1rpx solid #eee;
  border-bottom: 1rpx solid #eee;
}
.list .list-box {
  display: flex;
  align-items: center;
  margin: 0 40rpx 0 30rpx;
}
.list .list-box .icon {
  width: 40rpx;
  height: 40rpx;
}
.list .list-box ~ .list-box .list-item {
  border-top: 1rpx solid #eee;
}
.list .list-item {
  height: 116rpx;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 30rpx;
  margin-left: 20rpx;
  color: #333;
}
.list .more {
  background: url("../../../static/icon/more.png");
}
.list .info {
  background: url("../../../static/icon/setting.png");
}
.list .coupon {
  background: url("../../../static/icon/coupon-icon.png");
}
.list .order {
  background: url("../../../static/icon/order.png");
}
.list .about {
  background: url("../../../static/icon/service.png");
}
.list .shop {
  background: url("../../../static/icon/shop.png");
}
.list .icon {
  width: 48rpx;
  height: 48rpx;
  background-size: 100%;
}
</style>