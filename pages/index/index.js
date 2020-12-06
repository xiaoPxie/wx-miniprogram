//index.js
//获取应用实例
const app = getApp()

import { request } from "../../request/request.js"

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    //轮播图数组
    swiperList: [],
    //导航数组
    catesList: [],
    //
    floorList: []
  },
  
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    //
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
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
  getFloorList() {
    request({
      url: '/home/floordata',
    }).then(result => {
      if(result.data.meta.status === 200){
        this.setData({
          floorList: result.data.message
        })
      }
    })
  }
})
