// pages/goods_list/index.js

import { request } from "../../request/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        value: "综合",
        isActive: true
      },{
        id: 1,
        value: "销量",
        isActive: false
      },{
        id: 2,
        value: "价格",
        isActive: false
    }],
    goodsList: []
  },
  // 别的页面传的参数
  queryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  // 列表总页数
  totalPages: 0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParams.cid = options.cid || ""
    this.queryParams.query = options.query || ""
    this.getGoodsList()
  },

  /**
   * 监听上拉触底刷新
   */
  onReachBottom(e) {
    // 若没有下一页数据
    if(this.queryParams.pagenum >= this.totalPages) {
      wx.showToast({ title: '数据触底啦', })
    }else {
      this.queryParams.pagenum ++
      // 重新加载列表数据
      this.getGoodsList()
    }
  },

  /**
   * 监听页面下拉刷新
   */
  onPullDownRefresh(e) {
    this.queryParams.pagenum = 1;
    this.setData({
      goodsList: []
    })
    this.getGoodsList();
  },

  // 子组件向父组件传递
  handleTabsItemChange(e) {
    let { id } = e.detail, { tabs } = this.data;
    tabs.forEach((v,i) => {
      id === v.id ? v.isActive = true : v.isActive = false
    })
    this.setData({tabs})
  },
  // 获取对象商品类型的children
  async getGoodsList() {
    const result = await request({
      url: "/goods/search",
      data: this.queryParams
    })
    
    // 商品总记录数
    const total = result.data.message.total
    // 计算总页数
    this.totalPages = Math.ceil(total / this.queryParams.pagesize)
    // 设置渲染需要goodsList列表数据
    this.setData({
      // goodsList: result.data.message.goods
      goodsList: [...this.data.goodsList, ...result.data.message.goods]
    })
    // 关闭下拉页面刷新等待界面
    wx.stopPullDownRefresh()
  }
})