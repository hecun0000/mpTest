<template>
  <div>
    <van-cell-group>
      <van-field :value="username2" label="姓名" placeholder="请输入姓名" input-align="right"/>
      <van-field
        :value="phone"
        label="手机号"
        input-align="right"
        placeholder="请输入手机号"
      />
      <van-field :value="username2" label="性别" placeholder="请选择性别" readonly input-align="right" @click="onChangeSex"/>
      <van-action-sheet
        :show="show"
        :actions="actions"
        @close="onClose"
        @select="onSelect"
        cancel-text="取消"
      />
      <van-field :value="username2" label="年级" placeholder="请选择年级" readonly input-align="right" @click="onChangeGrade"/>
      <van-action-sheet
        :show="showoGrade"
        :actions="actionsGrade"
        @close="onCloseGrade"
        @select="onSelectGrade"
        cancel-text="取消"
      />
    </van-cell-group>
    <div class="save-button">
      <van-button type="primary" block >保存</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username2: '',
      phone: '',
      show: false,
      showoGrade: false,
      actionsGrade: [
        {name: '一年级'},
        {name: '二年级'},
        {name: '三年级'},
        {name: '四年级'},
        {name: '五年级'}
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
  mounted () {
    wx.setNavigationBarTitle({
      title: '个人信息'
    })
  },
  methods: {
    onChange () {

    },
    onChangeGrade () {
      this.showoGrade = true
    },
    onCloseGrade () {
      this.showoGrade = false
    },
    onSelectGrade (event) {
      console.log(event.detai)
    },
    onClose () {
      this.show = false
    },
    onChangeSex () {
      console.log(2222)
      this.show = true
    },
    onSelect (event) {
      console.log(event)
    }
  }

}
</script>

<style scoped>
.save-button {
  margin: 30rpx 10rpx;
}
</style>
