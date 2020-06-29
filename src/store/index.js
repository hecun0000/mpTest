import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    sessionKey: '',
    envVersion: 'develop',
    version: '',
    newVersion: 'v2.0.0', // 当前最新版本
    // api域名
    baseURL: 'http://39.97.251.196:8888/',
    // baseURL: 'https://api.store.ledianyun.com/',
    domain: 'http://39.97.251.196:8888/',
    // domain: 'https://api.ledianyun.com/',
    // 用户信息
    checkTime: {},
    userInfo: {
      balance: '',
      level: '',
      point: '',
      level_name: '',
      avatar: '',
      nickName: ''
    },
    // 收藏信息
    collect_info: '',
    // 第三方信息
    extConfig: {
      'btoken': '50329e02db492b461120c25a212413c2',
      'mtoken': '0854089c8fa538ab3dd3d2e311b32c92'
    },
    // 订单信息
    orderInfo: {},
    // 地址信息
    addressInfo: {},
    // 购物列表
    buyList: [],
    // 购物车信息
    cartList: [],
    // 是否新用户
    isNewUser: true,
    // 是否有tabbar
    hasTabBar: false,
    // 用户顶部样式
    sysNavigationBarStyle: {
      frontColor: '',
      backgroundColor: ''
    },
    navigationBarStyle: {
      frontColor: '',
      backgroundColor: ''
    },
    shopId: '',
    // 页面数组
    rules: '',
    // 授权信息
    authInfo: {},
    pagesData: [],
    homePage: {},
    routers: [], // 系统维护的路由规则
    requestHeader: null,
    suit_unique_id: null,
    sceneArray: {},
    accessStore: {}, // 当前访问店铺信息
    sysTabBarDetail: null, // 底部菜单栏配置
    tabBar: {},
    // 是否第一次砍价
    first_emit_cut: false,
    // 经纬度
    location: {
      auth: -1,
      latitude: '',
      longitude: ''
    },
    // 权益信息
    qualificationInfo: null,
    storeShareInfo: {
      title: '',
      imgUrl: '',
      isRequest: false
    },
    // 分销员id
    p_id: '',
    // 技术支持内容
    supportInfo: {
      system_logo: '',
      custom_logo: '',
      title: '',
      jump_type: '',
      jump_data: '',
      is_hidden_system_logo: false,
      is_hidden: false
    },
    // 设备信息
    clientHeight: 0,
    // 商品信息
    _productInfo: {},
    // 自提点信息
    pickInfo: {
      id: 0
    },
    shareType: '',
    community_product: [],
    // 分销员绑定
    distributorInfo: {
      isRequest: false
    },
    // 判断用户是否绑定手机号
    bindMobileStatus: true
  },
  mutations
})

export default store
