<template>
  <div class="container">
    <!-- <div class="share" @click="showShare">
      <img class="icon" src="./images//share.png" alt="">
        <div class="text">分享</div>
    </div> -->
        <swiper @change="swiperChange" indicator-dots="true" autoplay="true" interval="5000" duration="500" circular="true"
                indicator-color="#D8D8D8" indicator-active-color="#E93C3E" :style="{height: (750)+'rpx'}">
            <swiper-item v-for="(item,index) in pictureArray" :key="index">
                <image :src="item" :id="index" @load="imageLoad" class="slide-image" mode="aspectFit" style="width: 100%; height: 100%"></image>
            </swiper-item>
        </swiper>

        <div class="mian-info">
          <div class="left">
            <div class="price">
              ￥ <div class="price-num">{{activityData.activityPrice}}</div>
            </div>
            <div class="price-info">
              <p class="price-origin">
                ￥{{activityData.originalPrice}}
              </p>
              <div class="main-num" v-if="activityData.type === 'group'">
                <div class="num">{{activityData.teamCount}}</div>
                人拼
              </div>
            </div>
          </div>
          <div class="right">
            <div class="time-title">
              距结束还剩
            </div>
            <div class="time">
              <van-count-down :time="time" format="DD天HH:mm:ss" />
            </div>
          </div>
        </div>

        <!--商品名称  经典模式-->
        <div class="base-info">
            <div class="tag">{{activityData.type === 'group' ? '拼团':"助力"}}</div>
            <div class="title line-clamp-2">{{activityData.title}}</div>
        </div>
    
        <!--底部评价和详情-->
        <ProductPingJia :data="qaList" v-if="qaList.length>0"/>
        <van-divider contentPosition="center">活动详情</van-divider>
  
        <div style="padding: 24rpx; background:#fff;">
            <wxParse :content="activityData.detail" :imageProp="imageProp"></wxParse>
        </div>
        <van-goods-action>
          <van-goods-action-icon icon="home-o" text="首页" @click="jumpTo('/pages/home/main')"/>
          <van-goods-action-icon icon="user-o" text="我的" @click="jumpTo('/pages/my/main')"/>
          <van-goods-action-button text="分享活动" type="warning" open-type="share"/>
          <van-goods-action-button :text="activityData.type === 'group'?( order?'参与拼团': '发起拼团'):'发起助力'" @click="pay"/>
        </van-goods-action>
        <share ref="share" :info="info"></share>
        <!-- <h-dialog ref="dialog"/> -->
        <Auth></Auth>
        <van-dialog id="van-dialog" />
    </div>
</template>

<script>
import wxParse from 'ldy-mpvue-wxparse'
import ProductFooter from './ProductFooter'
import ProductPingJia from './ProductPingJia'
import HDialog from './dialog'
// import share from './share'
import {getSwiper, getQa, getAtivityById, getPay} from '../../api/activity'
import {createOrder, addShare} from '../../api/order'
import store from '../../store'
import Auth from '@/components/NewAuth.vue'
import BasePlatPage from '@/utils/basePlatPage'
import {getUserInfoById} from '@/api/info'
import Dialog from '../../../static/vant/dialog/dialog'
export default new BasePlatPage({
  components: {
    ProductFooter,
    wxParse,
    ProductPingJia,
    HDialog,
    // share,
    Auth
  },
  data () {
    return {
      info: {},
      pictureArray: [],
      activityData: {},
      imageProp: {
        mode: 'widthFix',
        lazyLoad: true
      },
      time: 0,
      qaList: [],
      userInfo: {},
      loading: false,
      order: ''
    }
  },
  onShow () {
    this.getUesrInfo()
    this.loading = false
  },
  onLoad (params) {
    wx.setNavigationBarTitle({
      title: '活动详情'
    })
    console.log(params, 'params-----活动详情')
    this.activityId = params.id
    this.getSwiperList()
    this.getQaList()
    this.getDetail()
    console.log(params, params.orderNum)
    if (params.orderNum) {
      this.order = params.orderNum
    }
    if (params.scene) {
      let mainId = decodeURIComponent(params.scene).split('_')[2]
      console.log(mainId)
    }
  },
  onShareAppMessage () {
    return {
      title: '这里有优惠券，你确定不来看看嘛？',
      path: '/pages/detail/main?id=' + this.activityId + '&from=share',
      imageUrl: this.pictureArray[0]
    }
  },
  methods: {
    jumpTo (url) {
      wx.switchTab({url})
    },
    checkUserInfo () {
      console.log('check')
      return new Promise((resolve, reject) => {
        const { phone } = this.userInfo
        if (!phone) {
          Dialog.confirm({
            title: '温馨提示',
            message: '您暂未完善个人信息，请先完成个人信息！'
          })
            .then(() => {
            // on confirm
              wx.navigateTo({url: '/pages/info/main'})
              resolve(false)
            })
            .catch(() => {
            // on cancel
              resolve(false)
            })
        } else {
          resolve(true)
        }
      })
    },
    async getDetail () {
      const id = this.activityId
      const res = await getAtivityById(id)
      if (res.code === 200) {
        this.activityData = res.data
        this.time = new Date(res.data.endDate).getTime() - Date.now()
        this.info.title = res.data.title
      }
    },
    async getUesrInfo () {
      console.log(' wx.getStorageSync', wx.getStorageSync('openId'))
      const data = {
        openid: wx.getStorageSync('openId')
      }
      const res = await getUserInfoById(data)
      if (res.code === 200) {
        this.userInfo = res.data
      }
    },
    async pay () {
      const resultUserInfo = await this.checkUserInfo()
      console.log('resultUserInfo', resultUserInfo)
      console.log('this.activityId', this.activityId)
      if (!resultUserInfo) return
      // if (this.loading) return
      // this.loading = true
      const data = {
        openid: wx.getStorageSync('openId'),
        orderName: this.activityData.title.slice(0, 36),
        price: this.activityData.activityPrice,
        activityId: this.activityId
      }
      console.log(data, '生成订单参数传递')
      const res = await getPay(data)
      const self = this
      if (res.code === 200) {
        console.log(res.data)
        const { paySign, nonceStr, signType, timeStamp, orderId } = res.data
        wx.requestPayment({
          timeStamp,
          nonceStr,
          package: res.data.package,
          signType,
          paySign,
          success: async function (res) {
            // self.loading = false
            console.log(res, 'eeeeeeee')
            let orderNum = orderId
            // console.log(orderNum, 'orderNum', self.activityData.type)
            if (self.activityData.type === 'group') {
              console.log(self.order, 'this.order 生成拼团')
              if (self.order) {
                const result = await addShare({
                  orderId: self.order,
                  userId: wx.getStorageSync('openId')
                })

                console.log(result, '参加拼团')
              }
              if (self.order) orderNum = self.order
              // 拼团
              wx.navigateTo({url: '/pages/groupInfo/main?orderNum=' + orderNum})
            } else {
              if (self.order) {
                const result = await addShare({
                  orderId: self.order,
                  userId: wx.getStorageSync('openId')
                })

                console.log(result, '参加分享')
              }
              // 助力
              wx.navigateTo({url: '/pages/share/main?orderNum=' + orderNum})
            }
          },
          fail (res) { }
        })
      }
    },
    async addOrder () {
      const data = {
        'activityId': this.activityId,
        'userId': wx.getStorageSync('openId')
      }
      console.log(data, 'addorder,,,ssssss')
      const res = await createOrder(data)
      let orderNum
      if (res.code === 200) {
        orderNum = res.data
      }
      console.log(orderNum, 'orderNum11111111111111')
      return orderNum
    },
    async getQaList () {
      const res = await getQa(this.activityId)
      if (res.code === 200) {
        this.qaList = res.data
      }
    },
    async getSwiperList () {
      const res = await getSwiper(this.activityId)
      if (res.code === 200) {
        this.pictureArray = res.data.map(item => {
          item = store.state.baseURL + 'images/' + item.path
          console.log(item)
          return item
        })
        this.info.url = this.pictureArray[0]
        console.log(this.pictureArray)
      }
    },
    handleShare () {
      // wx.updateShareMenu({
      //   withShareTicket: true,
      //   success () { }
      // })
      // this.$refs.dialog.onOpen()
      // wx.navigateTo({url: '/pages/info/main'})
    },
    showShare () {
      this.$refs.share.onClickShow()
    }
  }

})
</script>

<style lang="less" scoped>
.container {
  padding-bottom: 100rpx;
  // background: #fff;
}
//极简模式商品名称
.ji-jian-name {
    padding: 30rpx 24rpx;
    display: flex;
    align-items: center;
    border-bottom: 2rpx solid #e8e8e8;
    .left {
        display: flex;
        .tag {
            font-size: 18rpx;
            color: #fff;
            width: 67rpx;
            height: 28rpx;
            background: url("http://static.ledouya.com/FrvSNOawFjXshpo72Kux8PPGjwng") no-repeat center;
            background-size: 100% 100%;
            margin-top: 6rpx;
            line-height: 28rpx;
            text-align: center;
            margin-right: 4rpx;
        }
        .product-name {
            font-size: 30rpx;
            color: #333;
            width: 480rpx;
        }
    }
    .func{
        margin-left: auto;
        .collect{
            border-right: 1px solid #f8f8f8;
            padding-right: 20rpx;
            background: #fff;
        }
        .share{
            padding-left: 20rpx;
            background: #fff;
        }
        .icon{
            height: 34rpx;
            width: 34rpx;
            margin: 0 auto;
        }
        .text{
            font-size: 24rpx;
            text-align: center;
            color: #666;
            margin-top: 12rpx;
        }
    }
}
//商品名称
.base-info{
  padding: 30rpx 24rpx 40rpx 24rpx;
  position: relative;
  background: #fff;
  .tag{
    position: absolute;
    left: 24rpx;
      top: 36rpx;
    color: #fff;
    font-size: 18rpx;
      text-align: center;
    //padding: 8rpx 30rpx;
      width: 67rpx;
      height: 28rpx;
      line-height: 28rpx;
    background: url("http://static.ledouya.com/FrvSNOawFjXshpo72Kux8PPGjwng") no-repeat center;
    background-size: 100% 100%;
  }
  .title{
    font-size: 30rpx;
    color: #333;
    //padding-right: 150rpx;
    line-height: 42rpx;
    text-indent: 90rpx;
    //height: 100rpx;
  }

  .func{
    position: absolute;
    right: 24rpx;
    //top: 100rpx;
      bottom: 40rpx;
    .collect{
      border-right: 1px solid #f8f8f8;
      padding-right: 20rpx;
        background: #fff;
    }
    .share{
      padding-left: 20rpx;
        background: #fff;
    }
    .icon{
      height: 34rpx;
      width: 34rpx;
      margin: 0 auto;
    }
    .text{
      font-size: 24rpx;
      text-align: center;
      color: #666;
      margin-top: 12rpx;
    }
  }

  .price{
    margin-top: 36rpx;
    font-size: 36rpx;
    color: #E51C24;
  }

  .vip-price{
    font-size: 24rpx;
    color: #666;
    margin-top: 16rpx;
    margin-right: 20rpx;
    span{
      font-size: 20rpx;
    }
    .vip-badge{
      position: relative;
      color: #fff;
      background: url("http://static.ledouya.com/FpZSN4bo3y6QRGBPNylr5L_FUOeg") no-repeat center center;
      background-size:100% 100%;
      padding: 4rpx 12rpx 4rpx 20rpx;
      border-radius: 8rpx;
    }
  }
}
.multi-content {
    width: 100%;
    padding: 30rpx 24rpx;
    //border-top: #F7F7F7 20rpx solid;
    border-bottom: #F7F7F7 20rpx solid;
    .top {
        padding-bottom: 20rpx;
        border-bottom: dashed 2rpx #D8D8D8;
        display: flex;
        .point-image {
            width: 100rpx;
            height: 100rpx;
            border-radius: 50%;
            margin-right: 24rpx;
        }
        .name-phone {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100rpx;
            .name {
                font-size:32rpx;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(51,51,51,1);
                line-height:45rpx;
            }
            .phone {
                font-size:28rpx;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(102,102,102,1);
                line-height:40rpx;
                display: flex;
                align-items: center;
                .image {
                    width: 40rpx;
                    height: 40rpx;
                    margin-left: 34rpx;
                }
            }
        }
        .switch {
            font-size:28rpx;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(9,187,7,1);
            line-height:40rpx;
            margin-left: auto;
        }
    }
    .bottom {
        padding-top: 14rpx;
        display: flex;
        align-items: center;
        .distance {
            font-size:28rpx;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(9,187,7,1);
            line-height:40rpx;
        }
        .address {
            width: 542rpx;
            font-size:28rpx;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(102,102,102,1);
            line-height:32rpx;
            padding-left: 10rpx;
            border-left: 2rpx #979797 solid;
            margin-left: 10rpx;
        }
        .image {
            width: 40rpx;
            height: 40rpx;
            margin-left: auto;
        }
    }
}
.point-info {
    height: 100rpx;
    display: flex;
    align-items: center;
    padding-left: 24rpx;
    border-bottom: 2rpx #F2F2F2 solid;
    img {
        width: 40rpx;
        height: 40rpx;
        margin-right: 15rpx;
    }
    div {
        font-size:30rpx;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:42rpx;
    }
}
//促销
.basic-cell{
  padding: 0 24rpx;
  height: 100rpx;
  .label{
    color: #666666;
  }
  .item-col{
    margin-left: 36rpx;
    color: #000;
    flex: 1;
    .bargain{
      display: inline-block;
      padding: 6rpx 12rpx;
      border:1px solid #FD9512;
      border-radius: 8rpx;
    }
  }
  .icon-support{
    width: 36rpx;
    height: 36rpx;
  }
  .icon{
    margin-left: 20rpx;
    &.right{
      width: 20rpx;
      height: 34rpx;
    }
    &.down{
      width: 34rpx;
      height: 20rpx;
    }
  }
}
.earn{
    width: 120rpx;
    height: 120rpx;
    position: fixed;
    z-index: 8;
    right: 0;
    bottom: 130rpx;
    border-radius: 50%;
    overflow: hidden;
    image{
        width: 120rpx;
        height: 120rpx;
    }
}
.point-not-buy {
    width: 100%;
    height: 70rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background:rgba(255,37,1,0.4);
    font-size:26rpx;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(230,79,76,1);
    line-height:46rpx;
    letter-spacing:2rpx;
    position: fixed;
    bottom: 100rpx;
    left: 0;
}
//底部
.buy-box{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100rpx;
  border-top: 1px solid #f2f2f2;
  background: #fff;
  z-index: 6;
  justify-content: space-between;
  align-items: center;
  .column-center{
    font-size: 20rpx;
    color: #666;
    text-align: center;
    &:nth-of-type(1){
      margin-left: 80rpx ;
      //margin-right: 20rpx;
    }
    &:nth-of-type(2){
      margin-left: 80rpx ;
      //margin-right: 40rpx;
    }
    .icon{
      margin: 4rpx auto 10rpx;
      width: 40rpx;
      height: 40rpx;
    }
  }
  .btn-box {
      justify-content: center;
      flex: 1;
      .buy-btn {
          width: 240rpx;
          text-align: center;
          font-size: 30rpx;
          color: #fff;
          flex-direction: column;
          justify-content: center;
          .text,.price {
            font-size:30rpx;
          }
          &.simple {
              background: #FFBC00;
          }
          &.bargain {
              //background:linear-gradient(90deg,rgba(255,79,2,1) 0%,rgba(255,1,1,1) 100%);
          }
          &.bargain1 {
              background: #C6C6C6;
          }
      }
  }
}
.address {
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
}

.preBuyBtn{
    background:linear-gradient(90deg,rgba(255,79,2,1) 0%,rgba(255,1,1,1) 100%);
    margin-left:80rpx;
    height:100rpx;
}

.preBuyBtn1{
    background-color:#C6C6C6;
    margin-left:80rpx;
    height:100rpx;
}
.mian-info {
  height:110rpx;
  display: flex;
  .left {
    flex: 6;
    background:linear-gradient(270deg,rgba(250,60,60,1) 0%,rgba(255,138,0,1) 100%);
    display: flex;
    align-items: center;
    padding: 0 20rpx;
  }
  .right {
    flex: 4;
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background: #F7F7F7;
  }
  .price {
    font-size:32rpx;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:45rpx;
    display: flex;
    align-items: center;
    height: 100%;
    margin-right: 16rpx;
  }
  .price-num {
    font-size:60rpx;
    font-weight:bold;
    color:rgba(255,255,255,1);
    line-height:70rpx;
  }
  .price-info {
    font-size:24rpx;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:33rpx;
  }
  .price-origin {
    color: #FEC8AA;
    text-decoration:line-through;
  }
  .main-num {
    margin-left: 10rpx;
    height:40rpx;
    border-radius:8rpx;
    border:2rpx solid rgba(255,255,255,1);
    display: flex;
    margin-top: 6rpx;
    .num {
      background: #fff;
      color: #FA4338;
      padding: 0 10rpx;
    }
  }
}
.time-title {
  font-size:22rpx;
  font-weight:400;
  color:rgba(34,34,34,1);
  line-height:30rpx;
}
.time {
  color: #FD1717;
  margin-top: 10rpx;
  // font-size:22rpx;
}
.share {
  position: fixed;
  right: 0;
  top: 20vh;
  border-radius: 30rpx 0 0 30rpx;
  background: #FF4C1B;
  z-index: 1000;
  padding: 10rpx 16rpx 10rpx 30rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 28rpx;
  transition: all .2s;
  .icon {
    height: 34rpx;
    width: 34rpx;
    filter: brightness(1000);
  }
  &:hover {
    opacity: .7;
  }
}
</style>
