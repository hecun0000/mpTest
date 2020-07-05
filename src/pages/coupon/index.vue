<!--
 * @Author: your name
 * @Date: 2020-06-10 14:05:57
 * @LastEditTime: 2020-06-24 09:39:25
 * @LastEditors: hecun
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\pages\coupon\index.vue
--> 
<template>
  <div class="coupon-list">
    <template v-if="couponList.length > 0">
      <div class="coupon-item" v-for="item in couponList" :key="item">
        <div class="info" @click.stop="toDetail(item)">
          <!-- <img class="img" v-if="item.product_limit_type != 1" src="http://static.ledouya.com/FhonmRNhbZwPeZDlrqA_rosFTGeg" alt=""> 指定图标 -->
          <img class="img" src="../../../static/icon/coupon.png" alt />
          <div class="content">
            <div class="price">
              <div class="label">¥</div>
              <div>{{item.amount}}</div>
            </div>
            <div class="title">{{item.coupon_name}}</div>
            <div class="sub-tip">兑换码: {{item.couponCode}}</div>
            <div class="date">截止日期: {{item.expireDate}}</div>
          </div>
        </div>
        <div class="flex-column show">
          <img
            class="icon"
            v-if="item.valid"
            src="http://static.ledouya.com/Fk_5qV2j-sHUZczcsH81_H74Odo2"
            alt
          />
          <!-- <img class="icon" src="http://static.ledouya.com/Fqe8-LAcv8gW3RPJwZ567acwqUzI" alt="">     -->
          <!-- &lt;!&ndash; 已过期 &ndash;&gt; -->
          <img
            class="icon"
            v-if="!item.valid"
            src="http://static.ledouya.com/FkUAET2StJW2pqW-Hkn5VIeCA5N8"
            alt
          />
          <!-- &lt;!&ndash; 已使用 &ndash;&gt; -->
          <!-- <div class="btn">立即领取</div> -->
          <!--<div class="text">{{item.origin_receive_num}}人已领</div>-->
        </div>
      </div>
    </template>
    <!-- 没有优惠券 -->
    <div class="no-coupon" v-else>
      <img src="./empty-coupon.png" />
      <div class="desc">呜！您暂无可用优惠券~</div>
    </div>
  </div>
</template>

<script>
import { getCouponById } from '@/api/coupon'
import BasePlatPage from '@/utils/basePlatPage'
export default new BasePlatPage({
  data () {
    return {
      couponList: [],
      imageURL:
        'https://img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg'
    }
  },
  mounted () {
    wx.setNavigationBarTitle({
      title: '我的优惠券'
    })
    this.getList()
  },
  methods: {
    onRefresh () {
      this.getList()
    },
    async getList () {
      const userId = wx.getStorageSync('openId')
      const res = await getCouponById(userId)
      if (res.code === 200) {
        this.couponList = res.data
      }
    },
    jumpTo (url) {
      wx.navigateTo({ url })
    }
  }
})
</script>

<style lang="less" scoped>
page {
  background: #fff;
}
.coupon-item {
  width: 710rpx;
  height: 190rpx;
  background: #fff;
  display: flex;
  align-items: center;
  margin: 0 auto 20rpx;
}
.coupon-item .info {
  display: flex;
  align-items: center;
  padding-left: 12rpx;
  width: 532rpx;
  height: 100%;
  border-radius: 16rpx;
  background: radial-gradient(
        circle at bottom right,
        transparent 14rpx,
        #ffecec 0
      )
      bottom right,
    radial-gradient(circle at top right, transparent 14rpx, #ffecec 0) top right;
  background-size: 100% 54%;
  background-repeat: no-repeat;
  overflow: hidden;
}
.coupon-item .info .img {
  width: 90rpx;
  height: 90rpx;
  margin-right: 20rpx;
  flex-shrink: 0;
}
.coupon-item .info .content {
  flex: 1;
  padding: 24rpx 0;
  display: flex;
  flex-direction: column;
  color: #fa7f5e;
  font-size: 28rpx;
}
.coupon-item .info .content .price {
  overflow: hidden;
  color: #fc5154;
  font-size: 48rpx;
}
.coupon-item .info .content .price > div {
  display: inline-block;
  vertical-align: baseline;
}
.coupon-item .info .content .price .free {
  width: 64rpx;
  height: 38rpx;
  line-height: 38rpx;
  text-align: center;
  color: #fff;
  font-size: 22rpx;
  background: linear-gradient(270deg, #ff7f19 0%, #ffbe33 100%);
  border-radius: 8rpx;
}
.coupon-item .info .content .price .label {
  font-size: 30rpx;
}
.coupon-item .info .content .sub-tip {
  /* padding-left: 16rpx; */
  color: #ff0844;
  font-size: 28rpx;
}
.coupon-item .info .content .title {
  color: #000;
  font-size: 28rpx;
  height: 42rpx;
  overflow: hidden;
}
.coupon-item .info .content .date {
  color: #f9835f;
  font-size: 22rpx;
  padding-top: 4rpx;
  height: 30rpx;
  overflow: hidden;
}
.coupon-item .show {
  position: relative;
  flex: 1;
  height: 100%;
  border-radius: 16rpx;
  background: radial-gradient(
        circle at bottom left,
        transparent 14rpx,
        #ffecec 0
      )
      bottom left,
    radial-gradient(circle at top left, transparent 14rpx, #ffecec 0) top left;
  background-size: 100% 54%;
  background-repeat: no-repeat;
}
.coupon-item .show:before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 2rpx;
  height: 162rpx;
  border-left: 1px dashed #fa8768;
}
.coupon-item .show .btn {
  width: 127rpx;
  height: 50rpx;
  line-height: 50rpx;
  text-align: center;
  background: linear-gradient(270deg, #ff0844 0%, #f9835f 100%);
  border-radius: 25rpx;
  font-size: 26rpx;
  color: #fff;
}

.coupon-item .show .icon {
  position: absolute;
  right: 0;
  top: 0;
  width: 112rpx;
  height: 100rpx;
}
.coupon-item .show .text {
  color: #ff1046;
  font-size: 24rpx;
  padding-top: 14rpx;
}
.no-coupon {
  margin-top: 100rpx;
  image {
    width: 161rpx;
    height: 161rpx;
    margin: 0 auto;
    opacity: 0.7;
  }
  .desc {
    text-align: center;
    font-size: 26rpx;
    color: #999;
    padding: 30rpx 0 200rpx;
  }
}
</style>