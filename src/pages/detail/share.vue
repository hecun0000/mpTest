<template>
  <div>
    <van-overlay :show="show" bind:click="onClickHide" >
      <div class="poper-box">

      </div>
      <div class="poster">
        <canvas style="width: 681rpx; height:982rpx;"  canvas-id="ctx"></canvas>
      </div>
      <div class="button-box">
        <van-button border type="primary" block>保存到本地</van-button>
      </div>
    </van-overlay>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: false,
      info: {
        title: 'F18初秋新款 德瑞毛茸高跟鞋标题标题标题标题标题可爱可爱可爱可爱可爱 …',
        url: 'https://img11.360buyimg.com/n1/s450x450_jfs/t1/131421/9/1916/444202/5ee0d3fbE8d0281f3/11faf05514ecc347.jpg'
      }
    }
  },
  mounted () {
    const res = wx.getSystemInfoSync()
    this.windowWidth = res.windowWidth
    this.windowHeight = res.windowHeight
  },
  methods: {
    toPX (px) {
      return px / 750 * this.windowWidth
    },
    onClickShow () {
      this.show = true
      this.init()
    },

    onClickHide () {
      this.show = false
    },
    init () {
      var ctx = wx.createCanvasContext('ctx')
      ctx.save()
      ctx.beginPath()
      ctx.rect(0, 0, this.toPX(681), this.toPX(982))
      ctx.setFillStyle('#fff')
      ctx.fill()
      ctx.draw(true)
      // ctx.restore()
      this.drawTitle(ctx)
      this.drawImg(ctx)
    },
    drawImg (ctx) {
      const that = this
      wx.downloadFile({
        url: this.info.url,
        success: function (res) {
          ctx.save()
          ctx.beginPath()
          ctx.rect(that.toPX(20), that.toPX(20), that.toPX(644), that.toPX(644))
          ctx.clip()
          ctx.drawImage(res.tempFilePath, 0, 0, that.toPX(644), that.toPX(644))
          ctx.restore()
          ctx.draw(true)
        }
      })
    },
    drawTitle (ctx) {
      console.log(222)
      ctx.setFontSize(16)
      ctx.setFillStyle('#000000')
      // const str = this.info.title
      ctx.fillText(this.info.title, this.toPX(20), this.toPX(690))

      ctx.draw()
    }
  }
}
</script>
<style lang="less" scoped>
.poster {
  width: 90vw;
  margin: auto;
  margin-top: 5vh;
  background: #fff;
}
.button-box {
  margin: 10vh 10vw 0;
}
.poper-box {
  padding: 0 10vw;
}
</style>