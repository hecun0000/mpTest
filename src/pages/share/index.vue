<template>
  <div class="container">
    <!--用户-->
    <div class="user-box flex" v-if="is_down !== 1">
      <img class="avatar" :src="user.avatarUrl" alt />
      <div class="text">我是{{user.nickName}}，为我助力吧~</div>
    </div>
    <!--砍价信息-->
    <div class="bargain-box">
      <div class="ware-box flex">
        <img class="ware-img" :src="pictureArray[0]" />
        <div class="ware-info flex">
          <div class="ware-name line-clamp-2">{{ activityData.title }}</div>
        </div>
      </div>
      <img class="icon icon-water" src="./images/icon-water.png" alt />
    </div>

    <!--活动已结束-->
    <block>
    <!--倒计时-->
    <div class="countdown flex" v-if="!overdue">
      <div class="text">离活动结束还剩：</div>
      <div class="time">
        <span class="digit">{{ time_info.days }}</span>
        <span class="dot">天</span>
        <span class="digit">{{ time_info.hours }}</span>
        <span class="dot">:</span>
        <span class="digit">{{ time_info.minutes }}</span>
        <span class="dot">:</span>
        <span class="digit">{{ time_info.seconds }}</span>
      </div>
    </div>
    <div v-else class="expired">活动过期啦</div>
      <button class="btn" :class="{'btn-gray':overdue}"  @click="showActionSheet">邀请好友助力</button>
      <button class="btn" v-if="!isMy" :class="{'btn-gray':overdue || is_self === 1}"  @click="handAdd">
        {{ is_self === 1 ? "已经助力过": "为好友助力" }}
      </button>
      <button class="btn" v-if="!isMy" :class="{'btn-gray':overdue}" @click="handleSend">我要发起助力</button>
    </block>
    <!--帮砍榜-->
    <div class="rate-box">
      <div class="hd">助力榜</div>
      <div class="lf dot"></div>
      <div class="rt dot"></div>
      <div class="list">
        <div class="item flex" v-for="(item,index) in shareList" :key="index">
          <div class="person flex">
            <img class="avatar" :src="item.avatarUrl" alt />
            <div class="nick-name">{{ item.nickName }}</div>
          </div>
          <!-- <div class="text">帮砍{{ item.cut_price }}元</div> -->
        </div>
      </div>
    </div>
      <SelectSheet ref="selectSheet" :orderNum="orderNum" @createPoster="createPoster"></SelectSheet>
        <Auth></Auth>
        <share ref="share" :info="info"/>
  </div>
</template>

<script>
import BasePlatPage from '@/utils/basePlatPage'
// func
import countdown from '@/utils/countdown'
// components
import Auth from '@/components/NewAuth.vue'
import { getOrderByID } from '@/api/order'
import {getSwiper} from '../../api/activity'
import SelectSheet from '../groupInfo/SelectSheet'
import share from '../groupInfo/share'
import store from '../../store'
import { addShare } from '../../api/order'

export default new BasePlatPage({
  components: {
    Auth,
    SelectSheet,
    share
  },
  data () {
    return {
      isMy: false,
      is_self: 1, // 1 表示在其中 2 表示不在
      info: {},
      orderNum: '',
      activityId: '',
      pictureArray: [],
      activityData: {},
      user: {},
      shareList: [],
      percent: 0,
      // 定时器
      timer: null,
      // 时间戳
      timeStamp: '',
      // 倒计时
      time_info: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      },
      cutText: [
        '我正在抢购商品，快来帮我助力啊~',
        '求助力！关系好不好，就看这一次了！',
        '得到好物的机会，就差你的助力了～'
      ],
      shareImageURL: '',
      overdue: false, // true 为过期
      loading: false
    }
  },
  methods: {
    // 判断活动是否过期
    isEnd (date) {
      const now = Date.now()
      const dateTimes = new Date(date).getTime()
      console.log(now, dateTimes, now > dateTimes)
      this.overdue = now > dateTimes
    },
    // 发起助力
    handleSend () {
      if (this.overdue) return
      this.$router.push({
        path: '/pages/detail/main',
        query: {
          id: this.activityId
        }
      })
    },
    // 为好友助力
    async handAdd () {
      if (this.overdue) return
      if (this.is_self === 1) return

      if (this.loading) return
      this.loading = true

      const result = await addShare({
        orderId: this.orderNum,
        userId: wx.getStorageSync('openId')
      })
      this.loading = false

      if (result.code === 200) {
        console.log('参加助力')
        this.getOrderDetail(this.orderNum)
      }
    },
    showActionSheet (e) {
      if (this.overdue) return
      this.$refs.selectSheet.openActionSheet()
    },
    // 分享
    onShareAppMessage () {
      let text = this.cutText[Math.round(Math.random() * 2)]
      return {
        title: text,
        path: '/pages/share/main?orderNum=' + this.orderNum + '&id=' + this.activityId,
        imageUrl: this.pictureArray[0]
      }
    },
    createPoster () {
      if (this.overdue) return
      this.$refs.share.onClickShow()
    },
    async getOrderDetail (id) {
      const res = await getOrderByID({id})
      if (res.code === 200) {
        console.log(res.data, '这是活动详情', new Date(res.data.activity.endDate))
        this.activityData = res.data.activity
        this.info.title = res.data.activity.title
        this.info.type = res.data.activity.type
        this.info.orderNum = this.orderNum
        this.user = res.data.user
        this.shareList = res.data.shareList
        this.activityId = res.data.activity.id
        this.user.is_head = 1
        this.checkIsMy(res.data.user.openId)
        // 当前人是不是
        this.checkHasIn()
        this.getSwiperList()
        console.log(this, this.activityCountDown, ' this.activityCountDown')
        // 倒计时
        this.activityCountDown(new Date(res.data.activity.endDate).getTime() / 1000)
        // 判断当前活动是不是过期
        this.isEnd(res.data.activity.endDate)
      }
    },
    // 判断是否在当前团中
    checkHasIn () {
      const current = wx.getStorageSync('openId')
      const res = this.shareList.findIndex(item => item.openId === current)
      this.is_self = res > -1 ? 1 : 2
    },
    // 检查是不是自己的助力活动
    checkIsMy (openid) {
      this.isMy = openid === wx.getStorageSync('openId')
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
        this.$refs.share.saveCover(this.info.url)
        console.log(this.pictureArray)
      }
    },
    // 倒计时
    activityCountDown (timeStamp) {
      console.log(timeStamp, 'timeStamp')
      countdown(
        timeStamp,
        () => {
          this.activity_status = 0
        },
        (d, h, m, s) => {
          this.time_info = {
            days: d,
            hours: h,
            minutes: m,
            seconds: s
          }
        }
      )
    },
    // 下拉刷新
    onRefresh () {
      console.log('下拉刷新number')
      this.getOrderDetail(this.orderNum)
    }
  },
  // 分享
  onShareAppMessage () {
    let text = this.cutText[Math.round(Math.random() * 3)]
    return {
      title: text,
      path: '/pages/share/main?orderNum=' + this.orderNum,
      imageUrl: this.pictureArray[0]
    }
    // path: '/pages/groupInfo/main?orderNum=' + this.orderNum + '&id=' + this.activityId,
  },

  onShow () {
    // let pages = getCurrentPages()
    // let currPage = pages[pages.length - 1]

    // if (currPage.data.refresh) {
    //   this.getBargainActivityInfo(this.trade_no)
    // }
  },

  onLoad (params) {
    console.log(params.scene, 'params.sceneparams.sceneparams.scene')
    // // 小程序扫码进入
    if (params.scene) {
      this.orderNum = decodeURIComponent(params.scene)
      console.log(this.orderNum)
      this.getOrderDetail(this.orderNum)
    }
    if (params.orderNum) {
      this.orderNum = params.orderNum
      this.getOrderDetail(this.orderNum)
    }
  }
})
</script>

<style lang="less" scoped>
page {
  background: #fa3c3d;
}
.container {
  background: url("http://static.ledouya.com/FrC5SW71Gbp2Hx5Dy-jSBc3PQnr6")
    no-repeat;
  background-size: 100% 100%;
  padding-top: 30rpx;
  overflow: auto;
}

.user-box {
  align-items: center;
  padding: 0 24rpx 30rpx;
  .avatar {
    width: 80rpx;
    height: 80rpx;
    margin-right: 30rpx;
    background: #fff;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid #fff;
  }
  .text {
    font-size: 34rpx;
    color: #fff;
  }
}

.bargain-box {
  margin: 0 24rpx 30rpx;
  position: relative;
  background: #fff;
  border-radius: 40rpx;
  box-shadow: 0 6rpx 18rpx 0 rgba(247, 54, 58, 1);
  padding: 28rpx 24rpx;
  .ware-box {
    flex-direction: column;
    // justify-content: space-between;
    .ware-img {
      width: 100%;
      // height: 270rpx;
      margin-right: 24rpx;
      background: #999;
      border-radius: 10rpx;
    }
    .ware-info {
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      .ware-name {
        font-size: 30rpx;
        color: #333;
        height: 80rpx;
        line-height: 40rpx;
      }
      .ware-count {
        margin-top: 10rpx;
        font-size: 26rpx;
        color: #999;
      }
      .sku-name {
        color: #999;
        font-size: 26rpx;
      }
      .ware-min-price {
        color: #999;
        font-size: 26rpx;
        margin-top: -6rpx;
        span {
          color: #ed342f;
        }
        span:nth-of-type(1) {
          font-size: 24rpx;
        }
        span:nth-of-type(2) {
          font-weight: bold;
          font-size: 32rpx;
        }
      }
      .ware-sale-price {
        color: #999;
        font-size: 26rpx;
      }
    }
  }
  .bargain-info {
    margin-top: 50rpx;
    .bar {
      position: relative;
      height: 16rpx;
      background: #f2f2f2;
      border-radius: 8rpx;
      .process {
        position: absolute;
        height: 100%;
        border-radius: 8rpx;
        background: linear-gradient(
          90deg,
          rgba(246, 102, 102, 1) 0%,
          rgba(233, 52, 84, 1) 100%
        );
      }
    }
    .bargain-price {
      margin-top: 30rpx;
      font-size: 30rpx;
      align-items: center;
      justify-content: space-between;
      color: #de1644;
      .cut-price span {
        color: #fff;
        background: linear-gradient(
          90deg,
          rgba(246, 102, 102, 1) 0%,
          rgba(233, 52, 84, 1) 100%
        );
        padding: 4rpx 16rpx;
        border-radius: 24rpx;
      }
      .current-price span {
        font-weight: bold;
      }
    }
  }
  .icon {
    position: absolute;
    &.icon-hammer {
      top: 4rpx;
      left: 0;
      width: 66rpx;
      height: 50rpx;
    }
    &.icon-stars {
      top: 30rpx;
      left: 240rpx;
      height: 34rpx;
      width: 30rpx;
    }
    &.icon-water {
      top: -10rpx;
      right: -16rpx;
      width: 76rpx;
      height: 34rpx;
    }
  }
}

.countdown {
  margin: 50rpx auto;
  text-align: center;
  align-items: center;
  font-size: 30rpx;
  color: #fff;
  justify-content: center;
  .text {
    height: 46rpx;
    line-height: 46rpx;
  }
  .digit {
    display: inline-block;
    background: #fff;
    width: 46rpx;
    height: 46rpx;
    text-align: center;
    line-height: 46rpx;
    color: #d3143d;
    margin-left: 4rpx;
    margin-right: 4rpx;
    border-radius: 4rpx;
  }
  .dot {
    margin-left: 6rpx;
    margin-right: 6rpx;
  }
}

.expired {
  font-size: 30rpx;
  color: #fff;
  text-align: center;
  margin: 30rpx auto;
}

.btn {
  width: 700rpx;
  margin: 40rpx auto 0;
  color: #e8454c;
  font-size: 32rpx;
  text-align: center;
  font-weight: bold;
  height: 90rpx;
  line-height: 78rpx;
  background: url("http://static.ledouya.com/Fs6VP6ry2rxyjnsZ7epSxYMkRbDZ")
    no-repeat center center;
  background-size: 100% 100%;
  &.btn-down {
    color: #fff;
    background: transparent;
    height: 40rpx;
    line-height: 40rpx;
    margin: 0 auto;
  }
  &.btn-red {
    color: #fff;
    background: url("http://static.ledouya.com/FrGUcxH8m0s5MMFf_kVNz8mpYkrF")
      no-repeat center center;
    background-size: 100% 100%;
  }
  &.btn-gray {
    color: #999;
    background: url("http://static.ledouya.com/FizwkmPDtq1qg_wUKar-qz6KPRwG")
      no-repeat center center;
    background-size: 100% 100%;
  }
  &.animate {
    animation: scaleAnim 2s linear infinite;
  }
}
@keyframes scaleAnim {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
.rate-box {
  position: relative;
  margin: 60rpx 24rpx;
  background: #fff;
  padding: 80rpx 24rpx 16rpx;
  border-radius: 14rpx;
  .dot {
    position: absolute;
    top: 70rpx;
    width: 30rpx;
    height: 16rpx;
    border-radius: 8rpx;
    background: #fb4c3c;
    &.lf {
      left: -14rpx;
    }
    &.rt {
      right: -14rpx;
    }
  }
  .hd {
    position: absolute;
    left: 24rpx;
    right: 24rpx;
    top: 20rpx;
    background: url("http://static.ledouya.com/Fi-zPcVzyBHUwK1y1aAzzYhKSW-U")
      no-repeat center center;
    background-size: 100%;
    font-size: 34rpx;
    text-align: center;
    color: #f96344;
    font-weight: bold;
  }
  .list {
    min-height: 200rpx;
    max-height: 1000rpx;
    overflow: auto;
    &:nth-last-of-type(1) {
      border: 0 none;
    }
    .item {
      padding: 20rpx 0;
      border-bottom: 1px dashed #d8d8d8;
      align-items: center;
      justify-content: space-between;
      font-size: 30rpx;
      .person {
        align-items: center;
      }
      .avatar {
        background: #fff;
        border-radius: 50%;
        width: 70rpx;
        height: 70rpx;
        margin-right: 20rpx;
      }
      .nick-name {
        color: #f96344;
      }
      .text {
        color: #f96344;
      }
    }
  }
}

.bottom {
  width: 750rpx;
  height: 110rpx;
}

//帮砍信息
.b-box {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  .content {
    position: absolute;
    top: 200rpx;
    width: 600rpx;
    left: 75rpx;
    background: #fff;
    border-radius: 20rpx;
    padding: 50rpx 30rpx;
    .coin {
      width: 300rpx;
      height: 200rpx;
      margin: 50rpx auto;
    }
    .text {
      font-size: 32rpx;
      color: #333;
      text-align: center;
      line-height: 50rpx;
      span {
        color: #e82429;
      }
    }
    .share-btn {
      margin: 40rpx auto 20rpx;
      width: 340rpx;
      font-size: 32rpx;
      text-align: center;
      height: 80rpx;
      line-height: 80rpx;
      color: #fff;
      background: linear-gradient(
        270deg,
        rgba(255, 206, 105, 1) 0%,
        rgba(252, 112, 60, 1) 100%
      );
      box-shadow: 0 5rpx 20rpx 0 rgba(253, 129, 68, 1);
      border-radius: 40rpx;
    }
  }
  .close-btn {
    width: 70rpx;
    height: 70rpx;
    position: absolute;
    top: 880rpx;
    left: 50%;
    transform: translateX(-50%);
    z-index: 101;
  }
}
</style>
