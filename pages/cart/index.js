// pages/cart/index.js

import { showModal, showToast } from "../../utils/axyncWx"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
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
    const cart = wx.getStorageSync("cart") || []
    // 计算总价格和总数量
    this.calcCart(cart)

    this.setData({
      address,
    })
   
  },

  // 处理收货地址
  handleAddressChoose() {
    wx.chooseAddress({
      success (res) {
        res.all = res.provinceName + res.cityName + res.countyName + res.cityName + res.detailInfo
        wx.setStorageSync('address', res)
      }
    })
  },

  // 选中与反选商品
  handleChkChange(e) {
    const { goods_id } = e.currentTarget.dataset
    let { cart } = this.data
    // 修改购物车列表该id的信息
    let index = this.data.cart.findIndex(v => v.goods_id === goods_id)
    // 选中状态取反
    cart[index].checked = !cart[index].checked
    // 重新计算全选状态，总价格，总数量
    this.calcCart(cart)

  },

  // 商品全选与反选
  handleItemAllChecked() {
    let { allChecked, cart } = this.data
    // 修改全选checkbox的选中状态
    allChecked = !allChecked
    // 修改data中cart的checked的状态
    cart.forEach(v => v.checked = allChecked)
    // 计算全选状态，总价格，总数量
    this.calcCart(cart)
  },

  // 商品数量编辑
  async handleItemNumEdit(e) {
    const { goods_id, operation } = e.currentTarget.dataset
    let { cart } = this.data
    let index = cart.findIndex(v => v.goods_id === goods_id)
    // 判断是否要执行删除记录操作
    if(cart[index].num === 1 && Number(operation) === -1) {
      const res = await showModal({
        content: "是否要删除该商品",
      })
      if(res.confirm) {
        // 删除该商品
        cart.splice(index, 1)
        // 重新计算全选状态，总价格，总数量
        this.calcCart(cart)
      }
    } else {
      // 减数量
      if( Number(operation) === -1) {
        cart[index].num--
      }else if(Number(operation) === 1) {
        // 加数量
        cart[index].num++
      }
      // 计算全选状态，总价格，总数量
      this.calcCart(cart)
    }
  },

  // 点击计算
  async handlePay() {
    const { address, totalNum } = this.data
    // 判断收货地址
    if(!address.userName) {
      wx.showToast({
        title: '您还没有添加收货地址',
        icon: 'none'
      })
      return ;
    }
    // 判断有没有选购商品
    if(totalNum === 0) {
      wx.showToast({
        title: '您还没有选购商品',
        icon: 'none'
      })
      return ;
    }
    // 检查用户登录状态
    const userInfo = wx.getStorageSync("userInfo")
    if(userInfo!=="" && userInfo!==null) {
      // 跳转到支付计算页面
      wx.navigateTo({
        url: '/pages/pay/index',
      })
    } else {
      const res = await showModal({
        content: "请登录！",
        confirmText: "登录"
      })
      if(res.confirm) {
        wx.navigateTo({
          url: '/pages/login/index',
        })
      }
      return;
    }
  },

  // 计算全选状态，总价格，购物车中选中的商品数量
  calcCart(cart) {
    // 计算全选状态，总价格，总数量
    let totalPrice = 0, totalNum = 0, allChecked = true
    cart.forEach(v => {
      if(v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      } else {
        allChecked = false
      }
    })
    // 若全部选中则全选状态选中
    allChecked = cart.length ? allChecked : false

    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    // 修改缓存中该购物信息的checked状态
    wx.setStorageSync('cart', cart)
  }
})