<template>
  <div class="list-page">
    <ul class="list">
      <li class="item" v-for="(item, index) in listData" :key="index" @click="jumpTo(item)">
        <img src="http://static.hecun.site/hecun159210240836740.png" class="cover" alt srcset />
        <p class="title">{{ item.title }}</p>
        <div class="content">
          <van-button plain hairline type="info" size="small" @click.stop="toDetail">查看详情</van-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import card from '@/components/card'
import { getAtivity } from '@/api/activity'

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
      const res = await getAtivity()
      if (res.code === 200) {
        this.listData = res.data
      }
    },
    jumpTo ({id}) {
      wx.navigateTo({url: '/pages/detail/main?id=' + id})
    },
    toDetail () {
      wx.navigateTo({url: '/pages/share/main'})
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
</style>
