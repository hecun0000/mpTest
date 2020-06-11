<template>
  <div>
    <swiper @change="swiperChange" indicator-dots="true" autoplay="true" interval="5000" duration="500" circular="true"
                indicator-color="#D8D8D8" indicator-active-color="#E93C3E">
            <swiper-item v-for="(item,index) in detailObject.picture_array" :key="index">
                <image :src="item" :id="index" @load="imageLoad" class="slide-image" mode="aspectFit" style="width: 100%; height: 100%"></image>
            </swiper-item>
        </swiper>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    wx.setNavigationBarTitle({
      title: '商品详情'
    })
  },
  methods: {

  }

}
</script>

<style scoped>
.save-button {
  margin: 30rpx 10rpx;
}
</style>
