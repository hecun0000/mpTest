<!--
 * @Author: your name
 * @Date: 2020-06-10 14:05:57
 * @LastEditTime: 2020-06-10 17:24:46
 * @LastEditors: hecun
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\pages\my\index.vue
--> 
<template>
  <div class="order-list">
    <div  v-if="list.length>0">
      <div class="order-item" v-for="(item, index) in list" :key="index">
        <van-card
          custom-class="yes-tag"
          :tag="item.activity && item.activity.hasPay === 'Y'?'已付款':'未付款'"
          :price="item.activity.activityPrice"
          :origin-price="item.activity.originalPrice"
          desc="描述信息"
          :title="item.activity.title"
          :thumb="item.activity.headImg"
        ></van-card>
      </div>
    </div>
    <div class="no-data" v-else>
      <img src="./no-bill.png" mode="aspectFit" class="empty-img"/>
      <div class="text">您还没有相关订单</div>
    </div>
        <Auth></Auth>
  </div>
</template>

<script>
import { getOrderList } from '@/api/order'
import Auth from '@/components/NewAuth.vue'
import BasePlatPage from '@/utils/basePlatPage'
export default new BasePlatPage({
  components: {
    Auth
  },
  data () {
    return {
      list: [],
      imageURL:
        'https://img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg'
    }
  },
  mounted () {
    wx.setNavigationBarTitle({
      title: '我的订单'
    })
    // this.getList()
  },
  methods: {
    async getList () {
      const res = await getOrderList({
        userId: wx.getStorageSync('openId')
      })
      if (res.code === 200) {
        this.list = res.data
      }
    },
    jumpTo (url) {
      wx.navigateTo({ url })
    }
  }
})
</script>

<style lang="less" scoped>
.order-list .no-tag .van-tag {
  background: #6c6c6c;
}

.order-item {
  background: #fff;
  margin: 10rpx 0;
}
   .no-data{
        margin-top: 100rpx;
        text-align: center;
        color: #999;
        font-size: 24rpx;
        .empty-img {
            margin: 0 auto 10rpx;
            width: 161rpx;
            height: 161rpx;;

        }
    }
</style>