import Vue from 'vue'
import App from './App'
import store from '@/store'
import MpvueRouterPatch from 'mpvue-router-patch'

Vue.config.productionTip = false
Vue.use(MpvueRouterPatch)

App.mpType = 'app'
App.store = store

const app = new Vue(App)
app.$mount()
