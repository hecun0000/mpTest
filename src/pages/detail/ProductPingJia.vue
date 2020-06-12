<template>
    <div class='footer'>
      <div class="title-box">
        <div class="left">
          评价
        </div>
        <div class="info">
          共300+条评论
        </div>
      </div>
        <!-- <div class="nav flex">
            <div class="nav-item" :class="{ active : activeTab === 'details' }" @click.stop="switchTab('details')">商品详情</div>
            <div class="nav-item" :class="{ active : activeTab === 'evaluate' }" @click.stop="switchTab('evaluate')">商品评价</div>
        </div>
        <div class="content">
            <ProductDetails :content="content" v-if="activeTab === 'details'"></ProductDetails>
            <block v-if="activeTab == 'evaluate'">
                <block v-if="comment.length"  v-for="(item, index) in comment" :key="index">
                    <Comment :commentInfo="item" v-if="activeTab === 'evaluate'"></Comment>
                </block>
                <block v-if="!comment.length">
                    <img class="comment-img" src="/static/common/coment-img.png" alt="">
                    <div class="text">还没有评价，等你来评论~</div>
                </block>
            </block>
        </div> -->

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
  props: ['content', 'comment'],
  data () {
    return {
      activeTab: 'details'
    }
  },
  methods: {
    switchTab (item) {
      if (this.activeTab === item) return
      this.activeTab = item
    }
  },
  onLoad () {
    this.activeTab = 'details'
  },
  mounted () {

  },
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
  border-bottom: 1px solid #E8E8E8;
  .left {
    font-size:30rpx;
    color:rgba(51,51,51,1);
    line-height:42rpx;
  }
  .info {
    font-size:26rpx;
    font-weight:400;
    color:rgba(184,184,184,1);
    line-height:37rpx;
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
            &:nth-of-type(1){
                border: 1px solid #E8E8E8;
                border-radius: 40rpx 0 0 40rpx;
                border-right: 0;
            }
            &:nth-of-type(2){
                border: 1px solid #E8E8E8;
                border-radius: 0 40rpx 40rpx 0;
                border-left: 0;
            }
            &.active {
                color: #fff;
                background: #FFBC00;
                border: 1px solid #FFBC00;
            }
        }
    }
    .content{
        padding: 20rpx;
    }
    .comment-img{
        width: 200rpx;
        height: 200rpx;
        margin: 20rpx auto;
    }
    .text{
        font-size: 26rpx;
        text-align: center;
        margin-top: 20rpx;
        color: #999;
    }
</style>
