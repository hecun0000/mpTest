<template>
<!--    <rich-text :nodes="content" bindtap="tap"></rich-text>-->
    <div>
        <wxParse v-if="content && content.length" :content="content" :imageProp="imageProp"></wxParse>
    </div>

</template>

<script>
	import wxParse from 'ldy-mpvue-wxparse'
// import BaseComponent from '@/utils/baseComponent';
export default {
	  props: ['content'],
	  components: {
	    wxParse
  },
  data () {
    return {
      imageProp: {
        mode: 'widthFix',
        lazyLoad: true
      }
    }
  },
  onLoad () { //
  }
}
</script>
