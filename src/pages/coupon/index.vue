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
    <div class="coupon-item" v-for="item in couponList" :key="item">
      <div class="info" @click.stop="toDetail(item)">
            <!-- <img class="img" v-if="item.product_limit_type != 1" src="http://static.ledouya.com/FhonmRNhbZwPeZDlrqA_rosFTGeg" alt=""> 指定图标 -->
            <img class="img" src="../../../static/icon/coupon.png" alt="">
            <div class="content">
                <div class="price">
                    <div class="label">¥</div>
                    <div>{{item.money}}</div>
                </div>
                <div class="title">{{item.coupon_name}}</div>
                <div class="sub-tip">兑换码：heucn0000</div>
                <div class="date">{{item.start_time}}-{{item.end_time}}</div>
            </div>
        </div>
        <div class="flex-column show">
            <!-- <img class="icon" src="http://static.ledouya.com/Fk_5qV2j-sHUZczcsH81_H74Odo2" alt="">    已领取 -->
            <!-- <img class="icon" src="http://static.ledouya.com/Fqe8-LAcv8gW3RPJwZ567acwqUzI" alt="">     -->
            <!-- &lt;!&ndash; 已过期 &ndash;&gt; -->
            <img class="icon" src="http://static.ledouya.com/FkUAET2StJW2pqW-Hkn5VIeCA5N8" alt="">    
            <!-- &lt;!&ndash; 已使用 &ndash;&gt; -->
            <!-- <div class="btn">立即领取</div> -->
            <!--<div class="text">{{item.origin_receive_num}}人已领</div>-->
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      couponList: [
        {
          money: '100',
          coupon_name: '618年中特惠',
          start_time: '2020-06-01 21:00:00',
          end_time: '2020-06-06 21:00:00'
        },
        {
          money: '100',
          coupon_name: '618年中特惠',
          start_time: '2020-06-01 21:00:00',
          end_time: '2020-06-06 21:00:00'
        },
        {
          money: '100',
          coupon_name: '618年中特惠',
          start_time: '2020-06-01 21:00:00',
          end_time: '2020-06-06 21:00:00'
        },
        {
          money: '100',
          coupon_name: '618年中特惠',
          start_time: '2020-06-01 21:00:00',
          end_time: '2020-06-06 21:00:00'
        }
      ],
      imageURL: 'https://img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg'
    }
  },
  mounted () {
    wx.setNavigationBarTitle({
      title: '我的优惠券'
    })
  },
  methods: {
    jumpTo (url) {
      wx.navigateTo({ url })
    }
  }
}
</script>

<style>
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
  background: radial-gradient(circle at bottom right, transparent 14rpx, #FFECEC 0) bottom right, radial-gradient(circle at top right, transparent 14rpx, #FFECEC 0) top right;
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
  color: #FA7F5E;
  font-size: 28rpx;
}
.coupon-item .info .content .price {
  overflow: hidden;
  color: #FC5154;
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
  color: #F9835F;
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
  background: radial-gradient(circle at bottom left, transparent 14rpx, #FFECEC 0) bottom left, radial-gradient(circle at top left, transparent 14rpx, #FFECEC 0) top left;
  background-size: 100% 54%;
  background-repeat: no-repeat;
}
.coupon-item .show:before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 2rpx;
  height: 162rpx;
  border-left: 1px dashed #FA8768;
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
  color: #FF1046;
  font-size: 24rpx;
  padding-top: 14rpx;
}

</style>