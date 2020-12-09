// pages/cart/index.js

import { login, requestPayment, showToast } from "../../utils/axyncWx"
import { request } from "../../request/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0,
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
    // 渲染数据
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
  },

  // 处理支付
  async handlePay(e) {
    try {
      // 获取token
      const token = wx.getStorageSync('token')
      if(!token){
        wx.navigateTo({
          url: '/pages/login/index',
        })
        return ;
      }
      // 创建订单
      const order_price = this.data.totalPrice, 
        consignee_addr = this.data.address.all, 
        cart = this.data.cart
      let goods = []
      cart.forEach(v => {
        goods.push({
          goods_id: v.goods_id,
          goods_number: v.num,
          goods_price: v.goods_price
        })
      })
      // 发送创建订单请求
      const orderRes = await request({
        url: "/my/orders/create",
        method: "POST",
        data: {order_price, consignee_addr, goods}
      })
      // 返回订单号
      const { order_number } = orderRes.data.message
      // 发送预支付请求
      const payRes = await request({
        url: "/my/orders/req_unifiedorder",
        method: "POST",
        data: {order_number}
      })
      const { pay } = payRes.data.message
      // 发送支付请求
      // await requestPayment(pay)
      // 检查订单是否已支付
      const payedOrderRes = await request({
        url: "/my/orders/chkOrder",
        method: "POST",
        data: {order_number}
      })
      // 删除缓存中已支付的商品信息
      let cacheCart = wx.getStorageSync('cart')
      let newCart = cacheCart.filter(v => !v.checked)
      wx.setStorageSync('cart', newCart)
      // 跳转到支付成功页
      wx.redirectTo({
        url: "/pages/order/index?type=1",
      })
    } catch (error) {
      await showToast({title: "支付失败，请重新支付", icon: "none"})
    }
  }
})