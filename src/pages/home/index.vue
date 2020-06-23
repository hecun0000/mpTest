<template>
  <div class="list-page">
    <ul class="list">
      <li class="item" v-for="(item, index) in listData" :key="index" @click="jumpTo(item)">
        <img src="http://static.hecun.site/hecun159210240836740.png" class="cover" alt srcset />
        <p class="title">{{ item.title }}</p>
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
    }
  },
  mounted () {
    wx.setNavigationBarTitle({
      title: '首页'
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
  border-radius: 8rpx;
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
    line-height: 48rpx;
  }
}
</style>
