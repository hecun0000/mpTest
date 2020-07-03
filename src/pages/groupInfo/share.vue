<template>
  <div>
    <van-overlay :show="show" @click="onClickHide">
      <div class="poper-box">

      </div>
      <div class="poster">
        <canvas style="width: 681rpx; height:900rpx;" type="2d" id="ctx" canvas-id="ctx"></canvas>
      </div>
      <div class="button-box">
        <van-button border type="primary" block @click="downloadImg">保存到本地</van-button>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import { getQrCode } from '@/api/qr'
import store from '@/store'
import {getUserInfoById} from '@/api/info'

export default {
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      avatarFilePath: '',
      qrFilePath: '',
      coverFilePath: '',
      textFinalTop: 0,
      avatar: '',
      canvas: null,
      width: 0,
      height: 0,
      ctxWidth: null,
      ctxHeight: null,
      show: false,
      imgUrl: '',
      dpr: 0,
      nickName: ''
    }
  },
  async mounted () {
    this.show = false
    const res = wx.getSystemInfoSync()
    this.windowWidth = res.windowWidth
    this.windowHeight = res.windowHeight
    this.dpr = wx.getSystemInfoSync().pixelRatio
    console.log(this.dpr, 'this.dpr', this.info)
    await this.getUesrInfo()
    this.saveAvatar(this.avatar)
    this.getQr()
    // this.init()
  },
  onShow () {
    this.onClickHide()
  },
  methods: {
    async getUesrInfo () {
      console.log(' wx.getStorageSync', wx.getStorageSync('openId'))
      const data = {
        openid: wx.getStorageSync('openId')
      }
      const res = await getUserInfoById(data)
      if (res.code === 200) {
        this.avatar = res.data.avatarUrl
        this.nickName = res.data.nickName
      }
    },
    toPX (px) {
      return px / 750 * this.windowWidth
    },
    async getQr () {
      console.log('eeeeeeeeeeeeeeeeeeeee')
      const url = this.info.type === 'group' ? '/pages/groupInfo/main' : '/pages/share/main'
      const res = await getQrCode({
        path: url,
        scene: this.info.orderNum
      })
      console.log(res, 'resssssssssssssss')
      if (res.code === 200) {
        console.log(res.data, store)
        console.log(store.state.baseURL + '/images' + res.data)
        this.saveQR(store.state.baseURL + 'images' + res.data)
      }
    },
    onClickShow () {
      console.log(this.coverFilePath, 'this.coverFilePath', this.qrFilePath, this.avatarFilePath)
      if (this.avatarFilePath && this.qrFilePath && this.coverFilePath) {
        this.show = true
        setTimeout(_ => {
          this.init()
        }, 500)
      } else {
        wx.showToast({
          title: '正在生成中...',
          icon: 'loading',
          duration: 2000
        })
      }
    },
    onClickHide () {
      this.show = false
    },
    init () {
      const self = this
      const query = wx.createSelectorQuery()
      query.select('#ctx')
        .fields({ node: true, size: true })
        .exec(async (res) => {
          const canvas = res[0].node
          // 新接口需显示设置画布宽高；
          self.dpr = wx.getSystemInfoSync().pixelRatio
          const width = res[0].width * self.dpr
          const height = res[0].height * self.dpr
          self.width = width
          self.height = height
          canvas.width = width
          canvas.height = height
          self.canvas = canvas
          const ctx = canvas.getContext('2d')
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(0, 0, width, height)
          self.drawnNickname(ctx)
          self.drawTitle(ctx)
          await self.drawImg(ctx, canvas)
          await self.drawQR(ctx, canvas)
          await self.drawAvatar(ctx, canvas)
        })
    },
    drawImg (ctx, canvas) {
      return new Promise((resolve) => {
        console.log(this.coverFilePath, ' this.coverFilePath')
        let img = canvas.createImage()
        img.src = this.coverFilePath
        img.onload = e => {
          const padding = 20
          ctx.drawImage(img, padding, padding, this.width - padding * this.dpr, this.width - padding * this.dpr)
          resolve()
        }
      })
    },
    saveAvatar (url) {
      wx.downloadFile({
        url: url,
        success: res => {
          this.avatarFilePath = res.tempFilePath
        }
      })
    },
    saveCover (url) {
      wx.downloadFile({
        url,
        success: res => {
          console.log(res.tempFilePath, 'res.tempFilePath')
          this.coverFilePath = res.tempFilePath
        }
      })
    },
    saveQR (url) {
      wx.downloadFile({
        url,
        success: res => {
          this.qrFilePath = res.tempFilePath
        }
      })
    },
    drawAvatar (ctx, canvas) {
      return new Promise(resolve => {
        let img = canvas.createImage()
        img.src = this.avatarFilePath
        img.onload = e => {
          const padding = 10
          ctx.save()
          ctx.beginPath()
          const aWidth = 40 * this.dpr
          ctx.arc(padding * this.dpr + aWidth / 2, this.height - padding * this.dpr - aWidth / 2, aWidth / 2, 0, Math.PI * 2, false)
          ctx.clip()
          ctx.drawImage(img, padding * this.dpr, this.height - padding * this.dpr - aWidth, aWidth, aWidth)
          resolve()
        }
      })
    },
    drawQR (ctx, canvas) {
      return new Promise(resolve => {
        let img = canvas.createImage()
        img.src = this.qrFilePath
        img.onload = e => {
          const padding = 10
          ctx.save()
          ctx.beginPath()
          // ctx.clip()
          const qrWidth = 60 * this.dpr
          ctx.drawImage(img, this.width - padding * this.dpr - qrWidth, this.height - padding * this.dpr - qrWidth, qrWidth, qrWidth)
          resolve()
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
      const len = strArr.length < 2 ? strArr.length : 2
      for (let j = 0; j < len; j++) {
        console.log(str, strArr[j], textTop, 'ress')
        ctx.fillText(strArr[j], 10 * this.dpr, textTop)
        textTop += fontSize * 1.5
      }
      this.textFinalTop = textTop
    },
    drawnNickname (ctx) {
      let name = this.nickName
      const fontSize = 12 * this.dpr
      ctx.font = fontSize + 'px Verdana'
      ctx.fillStyle = '#000000'
      const padding = 10
      const aWidth = 40 * this.dpr
      ctx.fillText(name, padding * this.dpr + 20 + aWidth, this.height - padding * this.dpr - fontSize * this.dpr / 2)
    },
    downloadImg () {
      console.log('downloadImg')
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
            },
            fail (res1) {
              console.log(res1, '图片已保存到相册，赶紧晒 --- 失败')
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