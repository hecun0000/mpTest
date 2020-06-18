<template>
  <div>
    <van-overlay :show="show" bind:click="onClickHide" >
      <div class="poper-box">

      </div>
      <div class="poster">
        <canvas style="width: 681rpx; height:890rpx;" type="2d" id="ctx" canvas-id="ctx"></canvas>
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
      width: 0,
      height: 0,
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
  onload () {
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
      setTimeout(_ => {
        this.init()
      }, 500)
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
          const dpr = wx.getSystemInfoSync().pixelRatio
          // 新接口需显示设置画布宽高；
          const width = res[0].width * dpr
          const height = res[0].height * dpr
          self.width = width
          self.height = width
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(0, 0, width, height)
          // ctx.font = '100px Georgia'
          // ctx.fillText('Hello World!', 10, 50)
          self.drawImg(ctx, canvas)
          self.drawTitle(ctx)
          self.canvasToImg(canvas)
        })
    },
    drawImg (ctx, canvas) {
      const that = this
      wx.downloadFile({
        url: this.info.url,
        success: function (res) {
          let img = canvas.createImage()
          img.onload = e => {
            const padding = 40
            ctx.drawImage(img, padding, padding, that.width - padding * 2, that.width - padding * 2)
          }
          img.src = res.tempFilePath
        }
      })
    },
    drawTitle (ctx) {
      // ctx.font = '100px Verdana'
      // ctx.fillText('禾寸', 80, 1210)
      const fontSize = 20 * 2
      // console.log(ctx, 'ctx')
      ctx.font = fontSize + 'px Verdana'
      ctx.fillStyle = '#000000'
      const str = this.info.title
      const width = (this.width - 80)
      const size = Math.ceil(width / fontSize)
      var strArr = []
      for (var i = 0, l = str.length; i < l / size; i++) {
        var a = str.slice(size * i, size * (i + 1))
        strArr.push(a)
      }
      console.log(strArr, 'strArr')
      let textTop = 1140
      for (let j = 0; j < 2; j++) {
        console.log(str, strArr[j], textTop, 'ress')
        ctx.fillText(strArr[j], 40, textTop)
        textTop += 60
      }
      // ctx.draw()
    },
    drawUser (ctx) {
    },
    canvasToImg (canvas) {
      console.log('dddddddddddddddddddd图片已保存到相册，赶紧晒 canvas')
      const self = this
      setTimeout(() => {
        // 将生成的canvas图片，转为真实图片
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          canvas,
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