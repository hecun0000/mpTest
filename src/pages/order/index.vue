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
    <van-tabs sticky>
      <van-tab title="全部"></van-tab>
      <van-tab title="已付款"></van-tab>
      <van-tab title="已取消"></van-tab>
    </van-tabs>
    <div>
      <div class="order-item">
        <van-card
          custom-class="yes-tag"
          tag="已付款"
          price="2.00"
          origin-price="10.00"
          desc="描述信息"
          title="2018秋冬新款男士休闲时尚军绿飞行夹克秋冬新款男"
          :thumb="imageURL"
        ></van-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrder } from '@/api/order'
export default {
  data () {
    return {
      list: [''],
      imageURL:
        'https://img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg'
    }
  },
  mounted () {
    wx.setNavigationBarTitle({
      title: '我的订单'
    })
  },
  methods: {
    async getList () {
      const res = await getOrder()
      if (res.code === 200) {
        // this.list = res.data
      }
    },
    jumpTo (url) {
      wx.navigateTo({ url })
    }
  }
}
</script>

<style>
.order-list .no-tag .van-tag {
  background: #6c6c6c;
}

.order-item {
  background: #fff;
  margin: 10rpx 0;
}
</style>