<template>
  <div class="wrapper">
    <div class="sheet" v-if="showActionSheet">
      <div class="mask" :class="{ active : animation  }" @click.stop="closeActionSheet"></div>
      <div class="action-list" :class="{ active : animation  }">
        <button
          class="action-item line"
          open-type="share"
          hover-class="none"
          @click.stop="closeActionSheet"
        >
          <img class="icon" src="http://static.ledouya.com/FvbzRHx3g18CwAvhnQsrLad4vS2S" />
          <span>转发给好友</span>
        </button>
        <button class="action-item line" hover-class="none" @click.stop="createPoster">
          <img class="icon" src="http://static.ledouya.com/FgAOmpJvm80QrEcdeMApRFCNQ0WF" alt />
          <span>生成专属海报</span>
        </button>
        <button class="action-item" hover-class="none" @click.stop="closeActionSheet">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseComponent from '@/utils/baseComponent'

export default new BaseComponent({
  props: ['orderNum'],
  data () {
    return {
      poster: '',
      showActionSheet: false,
      animation: false
    }
  },
  methods: {
    // 打开选择框
    openActionSheet () {
      this.showActionSheet = true
      this.$nextTick(() => {
        this.animation = true
      })
    },
    // 关闭选择框
    closeActionSheet () {
      this.animation = false
      this.$nextTick(() => {
        this.showActionSheet = false
      })
    },
    // 生成海报
    createPoster () {
      this.closeActionSheet()
      this.$emit('createPoster')
    }
  },
  onLoad () {},
  onUnload () {
    this.$refs.poster.closePoster()
  }
})
</script>

<style scoped lang="less">
.sheet {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 999;
}
.mask {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: all 0.3s ease;
  &.active {
    opacity: 1;
  }
}
.action-list {
  position: absolute;
  bottom: -360rpx;
  width: 100%;
  background-color: #fff;
  transition: all 0.3s ease;
  &.active {
    bottom: 0;
  }
  .action-item {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32rpx;
    color: #666;
    text-align: center;
    padding: 30rpx 20rpx;
    border-bottom: 1px solid #f2f2f2;
    .icon {
      width: 40rpx;
      height: 40rpx;
      margin-right: 10rpx;
    }
  }
}
</style>
