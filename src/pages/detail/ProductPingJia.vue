<template>
  <div class="footer">
    <div class="title-box">
      <div class="left">评价</div>
      <div class="info" @click="showPopup">
        共{{data.length}}+条评论
        <van-icon name="arrow" />
      </div>
    </div>

    <ul class="ask-box">
      <li class="item" v-for="(item, index) in dataTop" :key="index">
            <div class="ask-title">{{ item.question }}</div>
            <div class="ask-info">{{ item.answer }}</div>
          </li>
    </ul>

    <van-popup :show="show" closeable position="bottom" @close="onClose">
      <div class="pop-box">
        <p class="pop-title">活动评价</p>
        <ul class="ask-box ask-box-pop">
          <li class="item" v-for="(item, index) in data" :key="index">
            <div class="ask-title">{{ item.question }}</div>
            <div class="ask-info">{{ item.answer }}</div>
          </li>
        </ul>
      </div>
    </van-popup>
  </div>
</template>

<script>
// import BaseComponent from '@/utils/baseComponent'
import ProductDetails from './ProductDetails'
import Comment from './comment'

export default {
  components: {
    ProductDetails,
    Comment
  },
  props: ['content', 'comment', 'data'],
  data () {
    return {
      show: false
    }
  },
  computed: {
    dataTop () {
      const res = []
      for (let i = 0; i < 3; i++) {
        if (this.data[i]) {
          res.push(this.data[i])
        }
      }
      return res
    }
  },
  methods: {
    onClose () {
      this.show = false
    },
    showPopup () {
      this.show = true
    }
  },
  onLoad () {},
  mounted () {},
  watch: {
    activeTab (newVal) {
      this.$emit('changeActiveTab', newVal)
    }
  }
}
</script>

<style scoped lang="less">
.title-box {
  margin-top: 20rpx;
  // height: 120rpx;
  display: flex;
  background: #fff;
  justify-content: space-between;
  padding: 30rpx 24rpx;
  border-bottom: 1px solid #e8e8e8;
  .left {
    font-size: 30rpx;
    color: rgba(51, 51, 51, 1);
    line-height: 42rpx;
  }
  .info {
    font-size: 26rpx;
    font-weight: 400;
    color: rgba(184, 184, 184, 1);
    line-height: 37rpx;
  }
}
.nav {
  font-size: 30rpx;
  width: 640rpx;
  margin: 30rpx auto;
  border-radius: 40rpx;
  .nav-item {
    text-align: center;
    font-size: 30rpx;
    flex: 1;
    padding: 20rpx 0;
    &:nth-of-type(1) {
      border: 1px solid #e8e8e8;
      border-radius: 40rpx 0 0 40rpx;
      border-right: 0;
    }
    &:nth-of-type(2) {
      border: 1px solid #e8e8e8;
      border-radius: 0 40rpx 40rpx 0;
      border-left: 0;
    }
    &.active {
      color: #fff;
      background: #ffbc00;
      border: 1px solid #ffbc00;
    }
  }
}
.content {
  padding: 20rpx;
}
.comment-img {
  width: 200rpx;
  height: 200rpx;
  margin: 20rpx auto;
}
.text {
  font-size: 26rpx;
  text-align: center;
  margin-top: 20rpx;
  color: #999;
}
.ask-box {
  display: flex;
  flex-direction: column;
  background: #fff;
  .item {
    padding: 0 20rpx;
    border-bottom: 1rpx solid #f2f2f2;
  }
  .ask-title {
    font-size: 30rpx;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 70rpx;
  }
  .ask-info {
    font-size: 26rpx;
    color: rgb(70, 70, 70);
    line-height: 60rpx;
  }
}
.ask-box-pop {
  height: 60vh;
  overflow: auto;
}
.pop-title {
  padding: 10rpx 20rpx;
  font-size: 36rpx;
  line-height: 60rpx;
}
</style>
