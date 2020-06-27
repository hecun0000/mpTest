<template>
  <div class="container">
    <!-- <button class="action-item line" open-type="share" hover-class="none" >
        转发给好友
    </button> -->
    <!--用户-->
    <div class="user-box flex" v-if="is_down !== 1">
      <img class="avatar" :src="avatar" alt />
      <div class="text">我是{{nickname}}，为我助力吧~</div>
    </div>
    <!--砍价信息-->
    <div class="bargain-box">
      <div class="ware-box flex">
        <img class="ware-img" :src="product_info.product_img" />
        <div class="ware-info flex">
          <div class="ware-name line-clamp-2">{{ product_info.product_name }}</div>
          <!-- <div class="ware-count">X{{ product_info.quantity }}</div> -->
          <!-- <div
            class="sku-name line-clamp-1"
          >{{ product_info.sku_uuid ? product_info.sku_name : '' }}</div> -->
          <!-- <div class="ware-sale-price">
            零售价：
            <span>￥{{ product_info.origin_price }}</span>
          </div>
          <div class="ware-min-price">
            最低价：
            <span>￥</span>
            <span>{{ product_info.min_price }}</span>
          </div> -->
        </div>
      </div>
      <!--砍价信息-->
      <!-- <div class="bargain-info">
        <div class="bar">
          <div class="process" :style="{ width : percent + '%' }"></div>
        </div>
        <div class="bargain-price flex">
          <div class="cut-price">
            已砍
            <span>{{ already_cut_price }}</span> 元
          </div>
          <div class="current-price">
            现价
            <span>{{ current_price }}</span> 元
          </div>
        </div>
      </div> -->
      <img class="icon icon-water" src="./images/icon-water.png" alt />
    </div>
    <!--倒计时-->
    <div class="countdown flex" v-if="activity_status === 1 ">
      <div class="text">离砍价结束还剩：</div>
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
    <!--button-->
    <!--活动进行中-->
    <block v-if="activity_status === 1">
      <button class="btn-down btn" v-if="is_down === 1 ">恭喜{{ nickname }}，已砍到最低价</button>
      <form report-submit="true" @submit="actionSheet">
        <button
          class="btn animate"
          formType="submit"
          v-if="is_submit === 0 && is_self === 1 && is_down === 0"
        >好友帮砍</button>
      </form>
      <button
        class="btn btn-gray animate"
        v-if="is_submit === 1 && is_self === 1 && is_down === 0 "
      >好友帮砍</button>
      <!--本人 砍到底价 未付款-->
      <form report-submit="true" @submit="buy">
        <button
          class="buy-btn btn animate"
          formType="submit"
          v-if="is_self === 1 && is_down === 1 && order_state === 1"
        >{{ product_info.min_price }}元购买</button>
      </form>
      <!--本人 订单状态为1 订单状态提交过-->
      <button
        class="buy-btn btn btn-gray animate"
        v-if="is_self === 1 && order_state !== 1 "
      >{{ product_info.min_price }}元购买</button>
      <form report-submit="true" @submit="cut">
        <button
          class="btn animate"
          formType="submit"
          :class="{ 'btn-gray' : is_cut === 1 || is_down === 1 }"
          v-if="is_self === 0 && is_down === 0"
        >帮他砍一刀</button>
      </form>
      <button class="btn animate" v-if="is_self === 0" @click.stop="join">我要参加</button>
    </block>
    <!--活动已结束-->
    <block v-if="activity_status === 0">
      <div class="expired">活动过期啦</div>
      <button class="btn btn-gray" v-if="is_self === 1 && is_down === 0">好友帮砍</button>
      <!-- <button class="btn btn-gray" v-if="is_self === 1 ">立即购买</button> -->
      <button class="btn btn-gray" v-if="is_self === 0 && is_down === 0">为好友助力</button>
      <button class="btn btn-gray" v-if="is_self === 0 ">我要参加</button>
    </block>
    <!--帮砍榜-->
    <div class="rate-box">
      <div class="hd">助力榜</div>
      <div class="lf dot"></div>
      <div class="rt dot"></div>
      <div class="list">
        <div class="item flex" v-for="(item,index) in cutList" :key="index">
          <div class="person flex">
            <img class="avatar" :src="item.avatar" alt />
            <div class="nick-name">{{ item.nickName }}</div>
          </div>
          <div class="text">帮砍{{ item.cut_price }}元</div>
        </div>
      </div>
    </div>
    <!---->
    <!-- <SelectSheet ref="selectSheet" :trade_no="trade_no"></SelectSheet> -->
    <!--帮砍信息-->
    <!-- <div class="b-box" v-if="showBoxModal">
      <div class="content">
        <img class="coin" src="https://static.ledouya.com/FhWC1lLyEAdEPS6QT7ZMkSwlARBr" alt />
        <div class="text">
          恭喜您，已砍掉
          <span>{{ cut_price }}</span> 元
        </div>
        <div class="text">更多惊喜等着你</div>
        <form report-submit="true" @submit="actionSheet">
          <button class="share-btn" formType="submit">好友帮砍</button>
        </form>
      </div>
      <img class="close-btn" src="./images/icon-close.png" @click.stop="closeModal" />
    </div> -->
    <Auth></Auth>
  </div>
</template>

<script>
import BasePlatPage from '@/utils/basePlatPage'
// func
import countdown from '@/utils/countdown'
// components
import Auth from '@/components/NewAuth.vue'
export default new BasePlatPage({
  components: {
    Auth
  },
  data () {
    return {
      // 头像
      avatar: '',
      // 昵称
      nickname: '禾寸',
      // 活动id
      activity_id: '神鼎飞丹砂',
      // 活动状态 1 进行中 0 已结束
      activity_status: 0,
      // 订单号
      trade_no: '',
      // 砍价弹窗
      showBoxModal: false,
      // 砍价
      cut_price: '0.00',
      // 商品信息
      product_info: {
        product_img: 'https://img11.360buyimg.com/n1/s450x450_jfs/t1/131421/9/1916/444202/5ee0d3fbE8d0281f3/11faf05514ecc347.jpg',
        product_name: '菏泽特产100%纯牡丹籽油一级冷榨健康食用油天然无添加高档礼盒装高档礼…',
        price_current: '10.00',
        price_original: '20.00'
      },
      // 已砍
      already_cut_price: '0.00',
      // 现价
      current_price: '0.00',
      // 百分比
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
      // 订单状态
      order_state: 1,
      // 是否是本人 0 非本人 ， 1 本人
      is_self: 0,
      // 是否砍到底价 0 未到 1 砍到底价
      is_down: 0,
      // 是否砍过 0 未砍 1 砍过
      is_cut: 0,
      // 是否提交 0 未提交 1 提交
      is_submit: 0,
      // 帮砍帮
      cutList: [],
      cutText: [
        '我正在抢购商品，快来帮我砍价啊~',
        '求帮砍！关系好不好，一刀见分晓！',
        '得到好物的机会，就差你这刀了～'
      ],
      shareImageURL: ''
    }
  },

  methods: {
    // 好友砍价
    cut (e) {
      // let { formId } = e.mp.detail
      // collectFormID({ form_id: formId })
      // if (this.is_cut === 1 || this.is_down === 1) return
      // wx.showLoading({
      //   title: '加载中',
      //   mask: true,
      //   icon: 'none'
      // })
      // cutProduct({
      //   main_no: this.trade_no
      // }).then(res => {
      //   wx.hideLoading()
      //   if (res.cut_amount) {
      //     this.cut_price = parseFloat(res.cut_amount / 100).toFixed(2)
      //     this.showBoxModal = true
      //     this.getBargainActivityInfo(this.trade_no)
      //   }
      // })
    },
    // 参加
    join () {
      this.$router.push({
        path: './index',
        query: {
          activity_id: this.activity_id
        }
      })
    },
    // 分享底部
    actionSheet (e) {
      // let { formId } = e.mp.detail
      // collectFormID({ form_id: formId })
      // this.showBoxModal = false
      // this.$nextTick(() => {
      //   this.$refs.selectSheet.openActionSheet()
      // })
    },
    // 弹窗关闭
    closeModal () {
      this.showBoxModal = false
    },
    // 倒计时
    activityCountdown () {
      countdown(
        this.timeStamp,
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
    // 立即购买
    buy (e) {
      // wx.showLoading({
      //   title: '处理中...',
      //   mask: true
      // })
      // let { formId } = e.mp.detail
      // collectFormID({ form_id: formId })

      // // 结算
      // settlement({
      //   main_no: this.trade_no,
      //   product_info: [
      //     {
      //       product_uuid: this.product_info.product_uuid,
      //       sku_uuid: this.product_info.sku_uuid,
      //       product_quantity: this.product_info.quantity
      //     }
      //   ],
      //   activity_id: this.activity_id,
      //   order_type: 3
      // }).then(res => {
      //   wx.hideLoading()
      //   if (res.product_info && res.product_info.length) {
      //     // 购物车
      //     this.$store.state.buyList = [
      //       {
      //         product_uuid: this.product_info.product_uuid,
      //         sku_uuid: this.product_info.sku_uuid,
      //         product_quantity: this.product_info.quantity
      //       }
      //     ]
      //     // 订单地址信息
      //     this.$store.state.orderInfo = {
      //       // 订单号
      //       trade_no: this.trade_no,
      //       // 活动类型
      //       activity_type: 2,
      //       // 活动id
      //       activity_id: this.activity_id,
      //       product_uuid: this.product_info.product_uuid,
      //       sku_uuid: this.product_info.sku_uuid,
      //       product_quantity: this.product_info.quantity,
      //       // 订单类型, 3 砍价订单
      //       order_type: 3,
      //       // 订单信息，是否 ， 0 自提 ， 1 快递
      //       logistics_type: res.logistics_type,
      //       canUserMemberDiscount: !!(
      //         res.member_discount &&
      //         res.member_discount.allow_member_discount === 1
      //       ),
      //       booking: 0
      //     }

      //     if (Number(res.logistics.type) === 0) {
      //       this.$store.state.orderInfo.phone =
      //         res.logistics.auto_info.business_phone
      //       this.$store.state.orderInfo.address =
      //         res.logistics.auto_info.business_address
      //     }

      //     this.$router.push({
      //       path: '/pages/cart/submitOrder',
      //       query: {
      //         booking: 0
      //       }
      //     })
      //   }
      // })
    },
    // 获取信息
    getBargainActivityInfo (num) {
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
      // // 获取砍价信息
      // getBargainInfo({
      //   main_no: num
      // }).then(res => {
      //   wx.hideLoading()
      //   if (res.info) {
      //     // 活动订单号
      //     this.trade_no = res.info.main_no
      //     // 活动id
      //     this.activity_id = res.info.activity_id
      //     // 活动状态 1 进行中 0 已结束
      //     this.activity_status = Number(res.info.activity_status)
      //     // 用户名
      //     this.avatar = res.info.avatar
      //     // 头像
      //     this.nickname = res.info.user_name
      //     // 商品信息
      //     this.product_info = {
      //       //
      //       product_img: res.info.product_thumbnail,
      //       // 商品名称
      //       product_name: res.info.product_name,
      //       // 商品 id
      //       product_uuid: res.info.product_uuid,
      //       // sku 名称
      //       sku_name: res.info.sku_name,
      //       // sku id
      //       sku_uuid: res.info.sku_uuid,
      //       // 数量
      //       quantity: res.info.product_quantity,
      //       // 最低价
      //       min_price: parseFloat(res.info.floor_price / 100).toFixed(2),
      //       // 零售价
      //       origin_price: parseFloat(res.info.price_current / 100).toFixed(2)
      //     }
      //     // 商品百分比
      //     this.percent = res.info.percent
      //     // 已砍
      //     this.already_cut_price = parseFloat(
      //       res.info.already_cut / 100
      //     ).toFixed(2)
      //     // 当前
      //     this.current_price = parseFloat(
      //       res.info.order_actual_payment / 100
      //     ).toFixed(2)
      //     // 是否本人  0 非本人 ， 1 本人
      //     this.is_self = Number(res.info.is_self)
      //     // 是否砍到底价 0 未到 1 砍到底价
      //     this.is_down = Number(res.info.status)
      //     // 是否已经砍过 0 没砍过 1 砍过
      //     this.is_cut = Number(res.info.is_cut)
      //     // 是否已经提交订单 0 未提交 1提交
      //     this.is_submit = Number(res.info.is_submit)
      //     // 倒计时
      //     this.timeStamp = Number(res.info.count_down)
      //     // 活动进行中，且订单未关闭
      //     if (this.activity_status === 1 && this.timeStamp > 0) { this.activityCountdown() }
      //     // 订单状态
      //     //
      //     if ((this.timeStamp - new Date().getTime() / 1000) < 0 || res.info.state === 6) this.activity_status = 0
      //     // 订单状态
      //     this.order_state = Number(res.info.state)

      //     // 显示砍价
      //     if (this.$store.state.first_emit_cut && this.is_self === 1) {
      //       this.cut_price = parseFloat(
      //         res.info.first_cut_amount / 100
      //       ).toFixed(2)
      //       this.showBoxModal = true
      //       this.$store.state.first_emit_cut = false
      //     }
      //   }
      //   if (res.help && res.help.length) {
      //     this.cutList = []
      //     for (let i = 0; i < res.help.length; i++) {
      //       this.cutList.push({
      //         avatar: res.help[i].avatar,
      //         nickName: res.help[i].user_name,
      //         cut_price: parseFloat(res.help[i].cut_amount / 100).toFixed(2)
      //       })
      //     }
      //   }
      //   // 获取分享图片
      //   this.shareImageURL = genereateShareImage({
      //     trade_no: this.trade_no,
      //     type: 3
      //   })
      // })
    },
    // 下拉刷新
    onRefresh () {
      this.getBargainActivityInfo(this.trade_no)
    },
    onShareAppMessage () {
      let text = this.cutText[Math.round(Math.random() * 2)]
      return {
        title: text,
        path:
          '/bargainModule/pages/bargainInfo?trade_no=' +
          this.trade_no +
          '&from=share',
        imageUrl: this.shareImageURL
      }
    }
  },

  onShow () {
    // let pages = getCurrentPages()
    // let currPage = pages[pages.length - 1]

    // if (currPage.data.refresh) {
    //   this.getBargainActivityInfo(this.trade_no)
    // }
  },

  onLoad (params) {
    // 分享给好友或者朋友圈
    if (params.trade_no) {
      this.trade_no = params.trade_no
      this.getBargainActivityInfo(this.trade_no)
    }
    // 小程序扫码进入
    if (params.scene) {
      let mainId = decodeURIComponent(params.scene).split('_')[2]
      this.getBargainActivityInfo(mainId)
    }
  },

  mounted () {},

  onUnload () {
    this.showBoxModal = false
  }
})
</script>

<style lang="less">
page {
  background: #fa3c3d;
}
.container {
  background: url("http://static.ledouya.com/FrC5SW71Gbp2Hx5Dy-jSBc3PQnr6")
    no-repeat;
  background-size: 100%;
  padding-top: 30rpx;
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
