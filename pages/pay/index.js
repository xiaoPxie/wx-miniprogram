// pages/cart/index.js

import { showModal } from "../../utils/axyncWx"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    // allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onShow: function() {
    // 获取缓存中的客户收货地址信息
    const address = wx.getStorageSync("address")
    // 获取缓存中的购物车信息
    let cart = wx.getStorageSync("cart") || []
    // 只需要checked为true的商品信息
    cart = cart.filter(v => v.checked)
    // 计算总价格和总数量
    let totalPrice = 0, totalNum = 0
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price
      totalNum += v.num
    })

    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
  },
})