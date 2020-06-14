<template>
  <div class="list-page">
    <ul class="list">
      <li class="item" v-for="(item, index) in 4" :key="index" @click="jumpTo(item)">
        <img src="http://static.hecun.site/hecun159210240836740.png" class="cover" alt srcset />
        <p class="title">菏泽特产100%纯牡丹籽油一级冷榨健康食用油天然无添加高档礼盒装高档礼…</p>
      </li>
    </ul>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {}
  },

  components: {
    card
  },

  methods: {
    jumpTo () {
      wx.navigateTo({url: '/pages/detail/main'})
    }
  },
  mounted () {
    wx.setNavigationBarTitle({
      title: '首页'
    })
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
