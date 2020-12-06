// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    // historyList: [{
    //   id: 0,
    //   num: 0,
    //   title: "收藏的店铺"
    // },{
    //   id: 1,
    //   num: 0,
    //   title: "收藏的商品"
    // },{
    //   id: 2,
    //   num: 0,
    //   title: "关注的商品"
    // },{
    //   id: 3,
    //   num: 0,
    //   title: "我的足迹"
    // }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 从缓存中获取微信用户信息
    const userInfo = wx.getStorageSync("userInfo");
    this.setData({
      userInfo,
      hasUserInfo: true
    })
  },

  // 微信一键登录
  handleGetUserInfo(res) {
    const { userInfo } = res.detail
    // 用户允许授权
    if(typeof(userInfo)!="undefined") {
      this.setData({
        userInfo,
        hasUserInfo: true
      })
      // 将微信用户信息存入用户中
      wx.setStorageSync("userInfo", userInfo)
    }
  },

  // 收货地址管理
  handleAddressEdit() {
    wx.chooseAddress()
  }
})