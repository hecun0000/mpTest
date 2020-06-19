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
      canvas: null,
      width: 0,
      height: 0,
      ctxWidth: null,
      ctxHeight: null,
      show: false,
      imgUrl: '',
      dpr: 0,
      info: {
        title: '兰蔻大粉水新清滢柔肤水化妆品套装护肤化妆水爽肤水补水保湿超级盒子',
        url: 'https://img11.360buyimg.com/n1/s450x450_jfs/t1/131421/9/1916/444202/5ee0d3fbE8d0281f3/11faf05514ecc347.jpg'
      }
    }
  },
  mounted () {
    const res = wx.getSystemInfoSync()
    this.windowWidth = res.windowWidth
    this.windowHeight = res.windowHeight
    this.dpr = wx.getSystemInfoSync().pixelRatio
    console.log(this.dpr, 'this.dpr')
    this.init()
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
          const canvas = res[0].node
          // 新接口需显示设置画布宽高；
          self.dpr = wx.getSystemInfoSync().pixelRatio
          const width = res[0].width * self.dpr
          const height = res[0].height * self.dpr
          console.log(width, height, res[0], self.dpr)
          self.width = width
          self.height = width
          canvas.width = width
          canvas.height = height
          self.canvas = canvas

          const ctx = canvas.getContext('2d')
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(0, 0, width, height)

          self.drawImg(ctx, canvas)
          self.drawTitle(ctx)
          console.log(ctx)
        })
    },
    drawImg (ctx, canvas) {
      const self = this
      wx.downloadFile({
        url: this.info.url,
        success: function (res) {
          let img = canvas.createImage()
          img.onload = e => {
            const padding = 20
            ctx.drawImage(img, padding, padding, self.width - padding * self.dpr, self.width - padding * self.dpr)
          }
          img.src = res.tempFilePath
        }
      })
    },
    drawTitle (ctx) {
      const fontSize = 14 * this.dpr
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
      let textTop = this.width + 20
      for (let j = 0; j < 2; j++) {
        console.log(str, strArr[j], textTop, 'ress')
        ctx.fillText(strArr[j], 10 * this.dpr, textTop)
        textTop += fontSize * 1.5
      }
    },
    drawUser (ctx) {
    },
    downloadImg () {
      const canvas = this.canvas
      const self = this
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        canvas,
        success: function (res) {
          console.log(res)
          self.imgUrl = res.tempFilePath
          wx.saveImageToPhotosAlbum({
            filePath: self.imgUrl,
            success (res) {
              console.log(res, '图片已保存到相册，赶紧晒')
            }
          })
        },
        fail: function (res) {
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