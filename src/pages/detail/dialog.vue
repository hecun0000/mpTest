<template>
  <van-dialog
  use-slot
  title="完善个人信息"
  :show="show"
  show-cancel-button
  confirm-button-open-type="getUserInfo"
  @close="onClose"
  @getuserinfo="getUserInfo"
>
  <div>
    <van-cell-group>
      <van-field
        :value="form.name"
        label="姓名"
        placeholder="请输入姓名"
        :error-message="error.name"
        input-align="right"
      />
      <van-field
        type="number"
        :value="form.phone"
        label="手机号"
        input-align="right"
        placeholder="请输入手机号"
        :error-message="error.phone"
      />
      <van-field
        :value="form.sex"
        label="性别"
        placeholder="请选择性别"
        readonly
        input-align="right"
        :error-message="error.sex"
        @click="onChangeSex"
      />
      <van-action-sheet
        :show="showSelect"
        :actions="actions"
        @close="onCloseSelect"
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
  </div>
</van-dialog>
</template>
<script>
import { getUserInfo, setUserInfo } from '@/api/info'
export default {
  data () {
    return {
      show: true,
      error: {
        name: '',
        phone: '',
        sex: '',
        grade: ''
      },
      form: {
        name: '',
        phone: '',
        sex: '',
        grade: ''
      },
      showSelect: false,
      showoGrade: false,
      actionsGrade: [
        { name: '一年级' },
        { name: '二年级' },
        { name: '三年级' },
        { name: '四年级' },
        { name: '五年级' },
        { name: '六年级' },
        { name: '初一' },
        { name: '初二' },
        { name: '初三' }
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
  methods: {
    getUserInfo (event) {
      console.log(event.detail)
    },
    onOpen () {
      this.show = true
    },
    onClose () {
      this.setData({ close: false })
    },
    valiate () {
      let result = true
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
      if (!this.form.sex) {
        this.error.sex = '请选择性别'
        result = false
      } else {
        this.error.sex = ''
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
      if (this.valiate()) {
        this.setInfo()
      }
    },
    async getInfo () {
      const res = await getUserInfo()
      if (res.code === 200) {
        this.form = res.data
      }
    },
    async setInfo () {
      console.log('保存')
      const data = {}
      const res = await setUserInfo(data)

      if (res.code === 200) {
        wx.navigateTo({ url: '/page/my/main' })
      }
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
    onCloseSelect () {
      this.showSelect = false
    },
    onChangeSex () {
      console.log(2222)
      this.showSelect = true
    },
    onSelect (event) {
      console.log(event)
      this.form.sex = event.target.name
    }
  }
}
</script>
<style lang="less" scoped>

</style>