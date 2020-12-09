// pages/order/index.js

import { request } from "../../request/request"
const formatTime = require("../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 1,
      value: "全部订单",
      isActive: true
    },{
      id: 2,
      value: "待付款",
      isActive: false
    },{
      id: 3,
      value: "待收货",
      isActive: false
    },{
      id: 4,
      value: "退货/退款",
      isActive: false
    }],
    orderList: []
  },

  onShow: function () {
    // 获取页面栈
    const pages = getCurrentPages();
    // 获取当前页面url后的query参数
    const { type } = pages[pages.length-1].options
    // 根据type改变激活的标签
    this.toggleTabs(Number(type))
    // 获取订单列表
    this.getOrderList(type)

    // console.log(formatTime.formatTime(new Date(1607397025)))
  },

  // 获取订单列表
  async getOrderList(type) {
    const res = await request({
      url: "/my/orders/all",
      data: {type}
    })
    const orders = res.data.message.orders
    if(typeof(orders) !== "undefined" && orders.length !== 0) {
      orders.forEach((v,i) => {
        v.create_time = formatTime.formatTime(new Date(v.create_time))
      })
      this.setData({
        orderList: res.data.message.orders
      })
    }
  },

  // 子组件向父组件传递
  handleTabsItemChange(e) {
    this.toggleTabs(e.detail.id)
    // 切换标签，重新获取订单数据
    this.getOrderList(e.detail.id)
  },

  // 根据参数切换激活的标签
  toggleTabs(type) {
    let { tabs } = this.data
    tabs.forEach((v,i) => {
      type === v.id ? v.isActive = true : v.isActive = false
    })
    this.setData({tabs})
  }
})