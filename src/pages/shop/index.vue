<template>
  <div class="list-page">
    <ul class="list" v-if="listData.length > 0">
      <li class="item" v-for="(item, index) in listData" :key="index">
        <img :src="item.headImg" class="cover" alt srcset />
        <p class="title">{{ item.title }}</p>
        <div class="content">
          <van-button plain hairline type="info" size="small" @click.stop="toDetail(item)">查看详情</van-button>
        </div>
      </li>
    </ul>
    <div class="no-data" v-else>
      <img src="./no-bill.png" mode="aspectFit" class="empty-img"/>
      <div class="text">您还没有相关活动</div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
import { getOrderList } from '@/api/order'

export default {
  data () {
    return {
      listData: []
    }
  },

  components: {
    card
  },

  methods: {
    async getList () {
      const data = {
        userId: wx.getStorageSync('openId')
      }
      const res = await getOrderList(data)
      this.listData = []
      if (res.code === 200) {
        this.listData = res.data
      }
    },
    jumpTo ({id}) {
      // wx.navigateTo({url: '/pages/detail/main?id=' + id})
    },
    toDetail (item) {
      const url = item.type === 'group' ? '/pages/groupInfo/main' : '/pages/share/main'
      wx.navigateTo({url: url + '?orderNum=' + item.id})
    }
  },
  mounted () {
    wx.setNavigationBarTitle({
      title: '我的活动'
    })
    this.getList()
  },
  created () {}
}
</script>

<style lang="less" scoped>
.list-page {
  padding: 20rpx;
}
.list {
  border-radius: 18rpx;
  li {
    padding: 20rpx;
    background: #fff;
    // margin-bottom: 20rpx;
  }
  li + li {
    margin-top: 20rpx;
  }
  .cover {
    height: 300rpx;
    width: 100%;
  }
  .title {
    font-size: 30rpx;
    font-weight: 500;
    color: #333;
    line-height: 60rpx;
  }
}
.content {
  border-top: 1rpx solid #eee;
  text-align: right;
  padding: 18rpx 0 0;
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
