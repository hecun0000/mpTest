<template>
  <div>
    <van-cell-group>
      <van-field
        :value="form.name"
        label="姓名"
        placeholder="请输入姓名"
        :error-message="error.name"
        @change="onChangeName"
        input-align="right"
      />
      <van-field
        type="number"
        :value="form.phone"
        label="手机号"
        input-align="right"
        placeholder="请输入手机号"
        :error-message="error.phone"
        @change="onChangePhone"
      />
      <van-field
        :value="form.gender"
        label="性别"
        placeholder="请选择性别"
        readonly
        input-align="right"
        :error-message="error.gender"
        @click="onChangegender"
      />
      <van-action-sheet
        :show="show"
        :actions="actions"
        @close="onClose"
        @select="onSelect"
        cancel-text="取消"
      />
      <van-field
        :value="form.grade"
        label="年级"
        placeholder="请选择年级"
        readonly
        input-align="right"
        :error-message="error.grade"
        @click="onChangeGrade"
      />
      <van-action-sheet
        :show="showoGrade"
        :actions="actionsGrade"
        @close="onCloseGrade"
        @select="onSelectGrade"
        cancel-text="取消"
      />
    </van-cell-group>
    <div class="save-button">
      <van-button type="primary" @click="handleSave" block>保存</van-button>
    </div>
    <auth></auth>
  </div>
</template>

<script>
import { setUserInfoById, getUserInfoById } from '@/api/info'
import BasePlatPage from '@/utils/basePlatPage'
import Auth from '@/components/NewAuth.vue'
export default new BasePlatPage({
  components: {
    Auth
  },
  data () {
    return {
      error: {
        name: '',
        phone: '',
        gender: '',
        grade: ''
      },
      form: {
        name: '',
        phone: '',
        gender: '',
        grade: ''
      },
      show: false,
      showoGrade: false,
      actionsGrade: [
        { name: '初一' },
        { name: '初二' },
        { name: '初三' },
        { name: '高一' },
        { name: '高二' },
        { name: '高三' }
      ],
      actions: [
        {
          name: '男'
        },
        {
          name: '女'
        }
      ]
    }
  },
  onLoad () {

  },
  mounted () {
    wx.setNavigationBarTitle({
      title: '个人信息'
    })
    this.getUesrInfo()
  },
  methods: {
    async getUesrInfo () {
      console.log(' wx.getStorageSync', wx.getStorageSync('openId'))
      const data = {
        openid: wx.getStorageSync('openId')
      }
      const res = await getUserInfoById(data)
      if (res.code === 200) {
        this.form = res.data
      }
    },

    valiate () {
      let result = true
      console.log(this.form, 'this.form')
      if (!this.form.name) {
        this.error.name = '请输入姓名'
        result = false
      } else {
        this.error.name = ''
      }
      if (!this.form.phone) {
        this.error.phone = '请输入手机号'
        result = false
      } else {
        this.error.phone = ''
      }
      if (!this.form.gender) {
        this.error.gender = '请选择性别'
        result = false
      } else {
        this.error.gender = ''
      }
      if (!this.form.grade) {
        this.error.grade = '请选择年级'
        result = false
      } else {
        this.error.grade = ''
      }

      return result
    },
    handleSave () {
      console.log(11)
      if (this.valiate()) {
        this.setInfo()
      }
    },
    async setInfo () {
      console.log('保存')
      const data = this.form
      data.openid = wx.getStorageSync('openId')
      const res = await setUserInfoById(data)

      if (res.code === 200) {
        wx.navigateBack({
          delta: 1, // 返回上一级页面。
          success: function () {
            console.log('成功！')
          }
        })
      }
    },
    onChangeName (e) {
      console.log(e)
      this.form.name = e.mp.detail
    },
    onChangePhone (e) {
      this.form.phone = e.mp.detail
    },
    onChange () {},
    onChangeGrade () {
      this.showoGrade = true
    },
    onCloseGrade () {
      this.showoGrade = false
    },
    onSelectGrade (event) {
      console.log(event.detai)
      this.form.grade = event.target.name
    },
    onClose () {
      this.show = false
    },
    onChangegender () {
      console.log(2222)
      this.show = true
    },
    onSelect (event) {
      console.log(event)
      this.form.gender = event.target.name
    }
  }
})
</script>

<style scoped>
.save-button {
  margin: 30rpx 10rpx;
}
</style>
<style>
.van-field__error-message {
  text-align: right !important;
}
</style>
