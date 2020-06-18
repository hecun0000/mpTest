<template>
  <div>
    <van-overlay :show="show" bind:click="onClickHide" >
      <div class="poper-box">

      </div>
      <div class="poster">
        <canvas style="width: 681rpx; height:982rpx;" type="2d" id="ctx" canvas-id="ctx"></canvas>
      </div>
      <div class="button-box">
        <van-button border type="primary" block @click="downloadImg">保存到本地</van-button>
      </div>
    </van-overlay>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ctxWidth: null,
      ctxHeight: null,
      show: false,
      imgUrl: '',
      info: {

        title: '初秋新款德瑞毛茸高跟鞋标题标题标题标题标题可爱可爱可爱可爱可标题标题标题标题可爱可爱可标题标题标题标题可爱可爱可标题标题标题标题可爱可爱可爱 …',
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
      const self = this
      const query = wx.createSelectorQuery()
      query.select('#ctx')
        .fields({ node: true, size: true })
        .exec((res) => {
          console.log(res, 'res 2d')
          const canvas = res[0].node
          // self.ctxWidth = res[0].width
          // self.ctxHeight = res[0].height
          const dpr = wx.getSystemInfoSync().pixelRatio
          // 新接口需显示设置画布宽高；
          canvas.width = res[0].width * dpr
          canvas.height = res[0].height * dpr
          const ctx = canvas.getContext('2d')
          ctx.scale(dpr, dpr)

          console.log(ctx, 'ctx')
          // ctx.setFillStyle('#66ccff')
          ctx.fillStyle = '#66ccff'
          ctx.fillRect(0, 0, 681, 982)
          // ctx.draw()
          // ctx.restore()
          self.drawImg(ctx, canvas)
          // self.drawTitle(ctx)
          // self.canvasToImg()
        })
      var ctx = wx.createCanvasContext('ctx')
      console.log(this.toPX(681))
      console.log(ctx, 'ctx')
      // ctx.save()
      // ctx.beginPath()
    },
    drawImg (ctx, canvas) {
      // const that = this
      wx.downloadFile({
        url: this.info.url,
        success: function (res) {
          let img = canvas.createImage()
          img.onload = e => {
            ctx.drawImage(img, 20, 20, 644, 644)
          }
          img.src = res.tempFilePath
          // ctx.save()
          // ctx.beginPath()
          // ctx.rect(that.toPX(20), that.toPX(20), that.toPX(644), that.toPX(644))
          // ctx.clip()
          // ctx.restore()
          // ctx.draw(true)
        }
      })
    },
    drawTitle (ctx) {
      const fontSize = 16
      ctx.setFontSize(fontSize)
      ctx.setFillStyle('#000000')
      const str = this.info.title
      const width = this.toPX(644 - 20)
      const size = Math.ceil(width / fontSize)
      var strArr = []
      for (var i = 0, l = str.length; i < l / size; i++) {
        var a = str.slice(size * i, size * (i + 1))
        strArr.push(a)
      }
      let textTop = 710
      for (let j = 0; j < 2; j++) {
        ctx.fillText(strArr[j], this.toPX(20), this.toPX(textTop))
        textTop += 40
      }
      ctx.draw()
    },
    drawUser (ctx) {

    },
    canvasToImg () {
      const self = this
      setTimeout(() => {
        // 将生成的canvas图片，转为真实图片
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          canvasId: 'ctx',
          success: function (res) {
            console.log(res)
            self.imgUrl = res.tempFilePath
            // let shareImg = res.tempFilePath
            // that.setData({
            //   shareImg: shareImg,
            //   showModal: true,
            //   showShareModal: false
            // })

            // wx.hideLoading()
          },
          fail: function (res) {
          }
        })
      }, 500)
    },
    downloadImg () {
      var self = this
      console.log(self.imgUrl)
      wx.saveImageToPhotosAlbum({
        filePath: self.imgUrl,
        success (res) {
          console.log(res, 'dddddddddddddddddddd图片已保存到相册，赶紧晒')
          wx.showModal({
            content: '图片已保存到相册，赶紧晒一下吧~',
            showCancel: false,
            confirmText: '好的',
            confirmColor: '#333',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            },
            fail: function (res) {
              console.log(res)
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.poster {
  width: 90vw;
  margin: auto;
  margin-top: 5vh;
  // background: #fff;
}
.button-box {
  margin: 10vh 10vw 0;
}
.poper-box {
  padding: 0 10vw;
}
</style>