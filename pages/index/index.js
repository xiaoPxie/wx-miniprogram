
import { request } from "../../request/request.js"

Page({
  data: {
    //轮播图数组
    swiperList: [],
    //导航数组
    catesList: [],
    //
    floorList: [],
    // 标题栏信息
    styles: "",
    titleInfo: {
      height: 0,
      "padding-top": 0
    }
  },
  titleInfoCalc: {},
  
  onLoad: function () {
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect()
    const systemInfo = wx.getSystemInfoSync()
    // 状态栏高度
    const statusBarHeight = systemInfo.statusBarHeight
    // 胶囊高度
    const height = menuButtonInfo.height
    // 导航栏高度 667-619=48
    const navigationHeight = systemInfo.screenHeight - systemInfo.windowHeight
    // 整个沉浸式标题栏的高度 = 导航栏高度 + 状态栏高度
    const totalHeight = navigationHeight + statusBarHeight
    this.titleInfoCalc = { statusBarHeight, totalHeight }
    this.setData({ 
      titleInfo: {
        top: statusBarHeight * 2,
        height: navigationHeight * 2
      }
    })
    //
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
  },

  // 监听滚动事件
  onPageScroll(e) {
    if(e.scrollTop > 120) {
      this.setData({
        styles: `height:${this.titleInfoCalc.totalHeight*2}rpx;background:var(--themeColor)`
      })
    } else {
      this.setData({
        styles: "height:0"
      })
    }
  },

  // 获取轮播图数据
  getSwiperList() {
    request({
      url: '/home/swiperdata',
    }).then(result => {
      if(result.data.meta.status === 200){
        this.setData({
          swiperList: result.data.message
        })
      }
    })
  },
  // 获取分类栏目数据
  getCatesList() {
    request({
      url: '/home/catitems',
    }).then(result => {
      if(result.data.meta.status === 200){
        this.setData({
          catesList: result.data.message
        })
      }
    })
  },
  // 获取floor数据
  getFloorList() {
    request({
      url: '/home/floordata',
    }).then(result => {
      if(result.data.meta.status === 200){
        // 由于接口有误，这里需要做一些更改
        let dataList = result.data.message
        dataList.forEach((v,i) => {
          let productList = v.product_list
          productList.forEach((v2,i2) => {
            const urls = v2.navigator_url.split("?")
            v2.navigator_url = urls[0] + '/index?' + urls[1]
          })
        })
        this.setData({
          floorList: dataList
        })
      }
    })
  }
})
