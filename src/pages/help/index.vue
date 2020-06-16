<!--
 * @Author: your name
 * @Date: 2020-06-10 14:05:57
 * @LastEditTime: 2020-06-13 09:20:13
 * @LastEditors: hecun
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\pages\my\index.vue
--> 
<template>
  <div>   

    
  </div>
</template>

<script>
import BasePlatPage from '@/utils/basePlatPage'
// import Auth from '@/components/NewAuth.vue'
export default new BasePlatPage({
  components: {
    // Auth
  },
  data () {
    return {
    }
  },
  methods: {

  },
  mounted () {
    wx.setNavigationBarTitle({
      title: '助力榜'
    })
  }
  // onLoad () {

  // }
})
</script>
<style scoped>

</style>