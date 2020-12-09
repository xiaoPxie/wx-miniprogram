// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    collectNum: 0
  },

  onLoad: function() {
    // 从缓存中获取微信用户信息
    const userInfo = wx.getStorageSync("userInfo");
    this.setData({
      userInfo
    })
  },

  onShow: function () {
    // 从缓存中获取收藏的商品
    const collect = wx.getStorageSync("goodsCollect") || []
    this.setData({
      collectNum: collect.length
    })
  },

  // 点击订单跳转
  handleNavigate(e) {
    const { url } = e.currentTarget.dataset
    // 用户是否已登录
    const token = wx.getStorageSync('token')
    if(!token) {
      wx.navigateTo({
        url: '/pages/login/index?reUrl=' + encodeURIComponent(url),
      })
      return;
    }
    // 跳转相应的页面
    wx.navigateTo({url})
  },

  // 收货地址管理
  handleAddressEdit() {
    wx.chooseAddress()
  }
})