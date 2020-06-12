<template>
    <div class='footer'>
        <!--商品详情-->
        <div class="nav flex">
            <div class="nav-item" :class="{ active : activeTab === 'details' }" @click.stop="switchTab('details')">商品详情</div>
            <div class="nav-item" :class="{ active : activeTab === 'evaluate' }" @click.stop="switchTab('evaluate')">商品评价</div>
        </div>
        <div class="content">
            <!--详情-->
            <ProductDetails :content="content" v-if="activeTab === 'details'"></ProductDetails>
            <!--评论-->
            <block v-if="activeTab == 'evaluate'">
                <block v-if="comment.length"  v-for="(item, index) in comment" :key="index">
                    <Comment :commentInfo="item" v-if="activeTab === 'evaluate'"></Comment>
                </block>
                <block v-if="!comment.length">
                    <img class="comment-img" src="/static/common/coment-img.png" alt="">
                    <div class="text">还没有评价，等你来评论~</div>
                </block>
            </block>
        </div>
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
