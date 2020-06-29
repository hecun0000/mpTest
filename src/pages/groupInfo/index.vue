<template>
    <div class='container'>
        <div class="content">
            <div class="title-background">

            </div>
            <!--商品信息-->
            <div class="product-info flex">
                <img class="product-img" v-if="pictureArray.lenth >0" :src="pictureArray[0]" alt="">
                <div class="product-text flex">
                    <div class="name line-clamp-2">{{activityData.title}}</div>
                    <!-- <div class="sku line-clamp-1" ><span > {{property}} </span>数量：{{groupInfo.product_quantity}}</div> -->

                    <div class="price-info flex"><div class="num">{{activityData.teamCount}}人团</div><div class="price"><span>￥</span>{{activityData.activityPrice}}</div></div>
                    <div class="simple">单买价￥{{activityData.originalPrice}}</div>
                </div>
            </div>
            <!--团情况-->
            <div class="group-info">
                <div class="text success" v-if="status===1">
                    <img class="fail-success" src="./images/success.png" alt="">
                    <div class="explain">
                        <img src="./images/label.png" class="rotate" alt="">
                        <div>拼团成功</div>
                        <img src="./images/label.png" alt="">
                    </div>
                </div>
                <div class="text fail" v-if="status===2">
                    <img class="fail-success" src="./images/fail.png" alt="">
                    <div class="explain">
                        <img src="./images/label.png" class="rotate" alt="">
                        <div>拼团失败</div>
                        <img src="./images/label.png" alt="">
                    </div>
                </div>

                <div class="text" v-if="status===0">
                    <!-- 还差{{groupInfo.people_dis}}人成团，
                    <span>{{time_info.day}}</span> ：
                    <span>{{time_info.hour}}</span> ：
                    <span>{{time_info.minute}}</span> ：
                    <span style="margin-right: 20rpx">{{time_info.second}}</span>
                    结束 -->
                    <div class="explain">
                        <img src="./images/label.png" class="rotate" alt="">
                        <div>距结束</div>
                        <img src="./images/label.png" alt="">
                    </div>
                    <div class="cut-down">
                        <div class="item">{{time_info.day}}</div>
                        <div class="fen-ge">:</div>
                        <div class="item">{{time_info.hour}}</div>
                        <div class="fen-ge">:</div>
                        <div class="item">{{time_info.minute}}</div>
                        <div class="fen-ge">:</div>
                        <div class="item">{{time_info.second}}</div>
                    </div>
                    <div class="people-number">
                        <span>{{activityData.teamCount}}</span>
                        <div>人成团，还差</div>
                        <span>{{activityData.teamCount - shareList.length}}</span>
                        <div>人</div>
                    </div>
                </div>
                <div class="group-person">
                    <div class="item" v-for="(user,index) in shareList" :key="index">
                        <img class="avatar" :src="user.avatarUrl" alt="">
                        <div class="special" v-if="user.is_head==1">团长</div>
                    </div>
                    <div class="dot" v-if="activityData.teamCoun!=0||hasMoreUser">......</div>
                    <div class="item vacant" v-if="activityData.teamCoun!=0">?</div>
                    <div class="item" v-if="status===1&&hasMoreUser">
                        <img class="avatar" :src="lastUser.avatar" alt="">
                        <div class="special" v-if="lastUser.is_head==1">团长</div>
                    </div>
                </div>
            </div>
        </div>
        <!--btn-->

        <div  @click="joinGroup" v-if="status === 0">
            <button class="btn" >我要参团</button>
        </div>
        <!-- <div  @click="createGroup" v-if="status === 1 || groupInfo.people_dis <= 0">
            <button class="btn"  formType="click">再开一团</button>
        </div> -->
        <div  @click="showActionSheet" v-if="status === 0 && is_self == 1">
            <button class="btn">邀请好友参团</button>
        </div>

        <div  @click="handlePay" v-if="status === 0 && is_self == 1 && payment_status===1">
            <button class="btn"  >去支付</button>
        </div>

        <SelectSheet ref="selectSheet" :orderNum="orderNum" @createPoster="createPoster"></SelectSheet>
        <Auth></Auth>
        <share ref="share" :info="info"/>
    </div>
</template>

<script>
    import BasePlatPage from '@/utils/basePlatPage'

// components
import SelectSheet from './SelectSheet'
import share from './share'
import Auth from '@/components/NewAuth'

// import Mask from '@/components/Mask'
// api
// import { groupDetail } from '@/api/group'
import { getOrderByID } from '@/api/order'
// import { collectFormID } from '@/api/common'
import store from '../../store'
import {getSwiper} from '../../api/activity'
import countdown from '@/utils/countdown'
export default new BasePlatPage({
      components: {
        Auth,
        SelectSheet,
        share
        // Mask
      },
      data () {
        return {
          info: {},
          orderNum: '',
          activityId: '',
          pictureArray: [],
          activityData: {},
          user: {},
          shareList: [],
          time_info: {
            day: 0,
            hour: 0,
            minute: 0,
            second: 0
          },
          activity_type: 3,
          status: 0,
          mask: {
            state: false,
            anim: false
          },
          trade_no: '',
          is_self: 2, // 1 该用户是团成员, 2 不是
          activity_id: '',
          product_uuid: '',
          group_no: '',
          property: '',
          userList: [],
          lastUser: {},
          hasMoreUser: false,
          params: {},
          groupText: ['就差你了，快来和我组团吧~', '我都拼了，你还不来么~', '再不来拼就结束了，好伤心~', '人生需要拼，爱拼才会赢！快来等你哦~'],
          shareImageURL: '',
          payment_status: 1, // 支付状态 1---> 未支付 2---> 已支付
          order_no: ''
        }
      },
      methods: {
        showActionSheet (e) {
          // let { formId } = e.mp.detail
          // collectFormID({form_id: formId})
          this.$refs.selectSheet.openActionSheet()
        },
        // 倒计时函数
        activityCountDown (timeStamp) {
          console.log(timeStamp, 'timeStamp')
          countdown(timeStamp, () => {
            this.status = 0
          }, (d, h, m, s) => {
            this.time_info = {
              day: d,
              hour: h,
              minute: m,
              second: s
            }
          })
        },
        share () { // 分享
          this.mask.state = true
          this.mask.anim = true
          this.mask.data = {
            product_uuid: this.product_uuid,
            price_current: this.activity_price,
            price_original: this.price_original,
            activity_type: 0,
            activity_id: 0
          }
        },
        getGroupActivityInfo (params) {
          let obj = {}
          if (params.group_no) {
            obj.group_no = params.group_no
          } else if (params.groupId) {
            obj.groupId = params.groupId
          }
          // groupDetail(obj).then(res => {
          //   this.groupInfo = res
          //   this.payment_status = res.payment_status - 0
          //   if (this.payment_status === 1) {
          //     wx.hideShareMenu()
          //   } else {
          //     wx.showShareMenu()
          //   }
          //   this.trade_no = this.order_no = res.main_no
          //   this.groupInfo.price_current = Number(res.price_current / 100).toFixed(2)
          //   this.groupInfo.price_original = Number(res.price_original / 100).toFixed(2)
          //   this.status = parseInt(res.status)
          //   if (!this.status) {
          //     this.activityCountDown(res.expiry_time)
          //   }
          //   this.activity_id = res.activity_id
          //   this.product_uuid = res.product_uuid
          //   this.group_no = res.group_no
          //   this.userList = res.user_info
          //   if (this.userList.length > 6 && this.status === 0) { // 进行中
          //     this.userList = this.userList.slice(0, 6)
          //   } else if (this.userList.length > 6 && this.status === 1) { // 成功
          //     this.hasMoreUser = true
          //     this.lastUser = this.userList[this.userList.length - 1]
          //     this.userList = this.userList.slice(0, 6)
          //   }
          //   if (res.product_property.length > 0) {
          //     this.property = ''
          //     for (let j = 0; j < res.product_property.length; j++) {
          //       let temp = res.product_property[j]
          //       this.property += temp.attr_value + '_'
          //     }
          //     this.property = this.property.slice(0, this.property.length - 1)
          //   }
          //   // 判断用户是否是自己团内成员
          //   let utoken = this.$store.state.userInfo.utoken
          //   let userList = res.user_info
          //   for (let i = 0; i < userList.length; i++) {
          //     let user = userList[i]
          //     if (user.utoken === utoken) {
          //       this.is_self = 1
          //       break
          //     }
          //   }
          //   // 获取分享图片
          //   this.shareImageURL = genereateShareImage({ trade_no: this.group_no, type: 2 })
          // })
        },
        joinGroup (e) { // 参团跳转到活动商品详情
          // let { formId } = e.mp.detail
          // collectFormID({form_id: formId})
          this.$router.push({
            path: '/pages/detail/main',
            query: {
              orderNum: this.orderNum,
              id: this.activityId
            }
          })
        },
        createGroup (e) {
          // let { formId } = e.mp.detail
          // collectFormID({form_id: formId})
          this.$router.replace({
            path: './groupDetails',
            query: {
              product_uuid: this.product_uuid,
              activity_id: this.activity_id
            }
          })
        },
        // 去支付
        handlePay (e) {
          // let { formId } = e.mp.detail
          // collectFormID({form_id: formId})
          this.$router.push({
            path: '/pages/cart/payment',
            query: {
              order_no: this.order_no,
              group_no: this.group_no,
              order_type: '2',
              is_self: 1,
              amount: this.groupInfo.price_current
            }
          })
        },
        // 分享
        onShareAppMessage () {
          let text = this.groupText[Math.round(Math.random() * 3)]
          return {
            title: text,
            path: '/pages/groupInfo/main?orderNum=' + this.orderNum,
            imageUrl: this.pictureArray[0]
          }
          // path: '/pages/groupInfo/main?orderNum=' + this.orderNum + '&id=' + this.activityId,
        },
        createPoster () {
          this.$refs.share.onClickShow()
        },
        onRefresh () {
          this.getOrderDetail(this.orderNum)
        },
        async getOrderDetail (id) {
          const res = await getOrderByID({id})
          if (res.code === 200) {
            console.log(res.data, '这是活动详情')
            this.activityData = res.data.activity
            this.info.title = res.data.activity.title
            this.user = res.data.user
            this.shareList = res.data.shareList
            this.activityId = res.data.activity.id
            this.user.is_head = 1
            this.shareList.push(this.user)
            this.checkHasIn()
            this.getSwiperList()
            this.activityCountDown(new Date(res.data.activity.endDate).getTime() / 1000)
          }
        },
        // 判断是否在当前团中
        checkHasIn () {
          const current = wx.getStorageSync('openId')
          const res = this.shareList.findIndex(item => item.openId === current)
          this.is_self = res > -1 ? 1 : 2
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
        }
      },
      onLoad (params) {
        this.params = params
        console.log(params, 'paramsparamsparamsparamsparams')
        // wx.hideShareMenu()
        // if (params.scene) {
        //   let groupId = decodeURIComponent(params.scene).split('_')[2]
        //   this.getOrderDetail(groupId)
        // } else
        if (params.orderNum) {
          this.orderNum = params.orderNum
          this.getOrderDetail(this.orderNum)
        }
      },
      mounted () {
        console.log(this.$root.$mp.query)
        this.trade_no = this.$root.$mp.query.order_no
        this.group_no = this.$root.$mp.query.group_no

        console.log(this.trade_no)
      }
    })
</script>

<style scoped lang="less">
.content{
  //padding: 30rpx 24rpx;
  //background: #FCF7F4;
    .title-background {
        height: 208rpx;
        background:linear-gradient(180deg,rgba(255,170,78,1) 0%,rgba(255,106,78,1) 100%);
    }
  .product-info{
    justify-content: space-between;
      align-items: center;
      height: 260rpx;
    background: #fff;
      width: 702rpx;
      margin: -148rpx auto 0;
      z-index: 88;
      box-shadow:0px 2rpx 13rpx 0rpx rgba(0,0,0,0.11);
      border-radius:20rpx;
    .product-img{
      width: 224rpx;
      height: 224rpx;
      border-radius: 4rpx;
        margin-left: 18rpx;
    }
  }
  .product-text{
    height: 224rpx;
    padding: 10rpx 0;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    margin-left: 26rpx;
    .name{
      font-size: 30rpx;
      color: #333;
    }
    .sku{
      font-size: 26rpx;
      color: #666;
    }
    .price-info{
      align-items: center;
      color: #ED342F;
      font-size: 28rpx;
      .num{
        border:1px solid #ED342F;
        padding: 4rpx 16rpx;
        border-radius: 4rpx;
      }
      .price{
        span{
          font-size: 24rpx;
        }
        font-size: 36rpx;
        margin-left: 30rpx;
      }
    }
    .simple{
      font-size: 26rpx;
      color: #999;
    }
  }
  //拼团情况
  .group-info{
    margin-top: 30rpx;
    text-align: center;
    padding: 20rpx 24rpx;
    background: #fff;
    .text{
      font-size: 32rpx;
      color: #333;
        display: flex;
        flex-direction: column;
        align-items: center;
        .fail-success {
            width: 138rpx;
            height: 138rpx;
            margin-bottom: 12rpx;
        }
        .explain {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 32rpx;
            img {
                width: 60rpx;
                height: 20rpx;
            }
            .rotate {
                transform:rotate(180deg)
            }
            div {
                color: #FE3304;
                font-size: 32rpx;
                margin: 0 16rpx;
            }
        }
        .cut-down {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 20rpx 0;
            .item {
                width: 46rpx;
                height: 46rpx;
                border-radius: 10rpx;
                background: #FE3304;
                text-align: center;
                line-height: 46rpx;
                color: #fff;
                font-size: 30rpx;

            }
            .fen-ge {
                font-size: 32rpx;
                color: #FE3304;
                margin: 0 12rpx;
            }
        }
        .people-number {
            display: flex;
            align-items: center;
            font-size: 32rpx;
            color: #333;
            span {
                color: #FE3304;
            }
        }
    }
    .group-person{
      padding: 40rpx 0;
        margin-top: 20rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      .item{
        width: 76rpx;
        height: 76rpx;
        position: relative;
        border-radius: 50%;
        background: #FCF7F4;
        margin-right: 10rpx;
        &.vacant{
          border:1px dashed #FF6662;
          line-height: 76rpx;
          text-align: center;
          font-size: 40rpx;
          color: #F3ABAA;
        }
        .special{
          position: absolute;
          bottom: -4rpx;
          left: 50%;
          transform: translateX(-50%);
          height: 30rpx;
          line-height: 30rpx;
          background: #FF6662;
          color: #fff;
          font-size: 20rpx;
          text-align: center;
          width: 60rpx;
          border-radius: 15rpx;
        }
        .avatar{
          border:1px solid #FF6662;
          width: 76rpx;
          height: 76rpx;
          border-radius: 50%;
        }
      }
      .dot{
        position: relative;
        top: -10rpx;
        font-size: 30rpx;
        margin-right: 10rpx;
        color: #333;
      }
    }
  }
}
.btn{
    width: 689rpx;
    height: 88rpx;
    background: #FE3304;
    color: #fff;
    font-size: 32rpx;
    margin: 36rpx auto;
    border-radius: 44rpx;
    text-align: center;
    line-height: 88rpx;
}


</style>
