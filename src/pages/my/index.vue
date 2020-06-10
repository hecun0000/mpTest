<!--
 * @Author: your name
 * @Date: 2020-06-10 14:05:57
 * @LastEditTime: 2020-06-10 17:24:46
 * @LastEditors: hecun
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\pages\my\index.vue
--> 
<template>
  <div>
    <div class="header">
      <div class="info-box">
        <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="" srcset="">
        <div>
          <span class="info-name">hecun</span>
        </div>
      </div>
    </div>
    <div class="container-my">
      <ul class="list">
      <li class="list-box">
        <span class="icon collection"></span>
        <div class="list-item" @click="jumpTo('/pages/info/main')">
          个人信息
          <span class="icon more"/>
        </div>
      </li>
      <li class="list-box">
        <span class="icon about"></span>
        <div class="list-item" @click="jumpTo('/pages/coupon/main')">
          代金券
          <span class="icon more"/>
        </div>
      </li>
      <li class="list-box">
        <span class="icon about"></span>
        <div class="list-item" @click="jumpTo('/pages/order/main')">
          我的订单
          <span class="icon more"/>
        </div>
      </li>
      <li class="list-box">
        <span class="icon about"></span>
        <div class="list-item" @click="jumpTo('/pages/about/main')">
          关于
          <span class="icon more"/>
        </div>
      </li>
    </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    jumpTo (url) {
      wx.navigateTo({url})
    }
  }
}
</script>

<style scoped>

.header {
  height: 300rpx;
  background: linear-gradient(to top, #b6fbff, #83a4d4);
  padding: 30rpx;
  display: flex;
  align-items: flex-end;
}

.header img {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
}

.container-my {
  overflow: auto;
}

.info-name {
  padding: 0 20rpx;
  color: #666;
  font-size: 40rpx;
  font-weight: 400;
}

.info-box {
  display: flex;
  align-items: center;
}

.list {
  margin-top: 20rpx;
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
  height: 100rpx;
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
.list .collection {
  background: url("../../../static/icon/collection.png");
}
.list .about {
  background: url("../../../static/icon/about.png");
}
.list .icon {
  width: 48rpx;
  height: 48rpx;
  background-size: 100%;
}


</style>