// pages/category/main.js

import { request } from "../../request/request.js";
// import regeneratorRuntime from '../../lib/runtime/runtime.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    catesList: [],
    goodsList: [],
    currentIndex: 0,
    scrollTopNumber: 0 // 每次点击左侧菜单时，重置右侧scroll-view的scrollTop值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 缓存
    const cates = wx.getStorageSync('cates')
    if (!cates) {
      // 缓存中不存在，则初始化数据
      this.getCatesList()
    } else {
      let nowTime = Date.now();
      // 若缓存超过1天
      if (nowTime - cates.expireTime > 24 * 60 * 60 * 1000) {
        // 重新获取数据
        this.getCatesList();
      } else {
        this.catesList = cates.catesList
        this.setData({
          catesList: cates.catesList,
          goodsList: cates.catesList[0].children
        })
      }
    }
  },

  // 初始化数据
  async getCatesList() {
    // request({
    //   url: "/categories"
    // }).then(result => {
    //   if(result.data.meta.status === 200){
    //     this.catesList = result.data.message
    //     // 缓存列表数据
    //     let expireTime = Date.now(), cates = {}
    //     Object.assign(cates, {}, {expireTime: expireTime, catesList: this.catesList})
    //     wx.setStorageSync('cates', cates)
    //     this.setData({
    //       catesList: result.data.message,
    //       goodsList: result.data.message[0].children
    //     }) 
    //   }
    // })

    // 使用await方式请求
    const result = await request({ url: "/categories" });
    if (result.data.meta.status === 200) {
      this.catesList = result.data.message
      // 缓存列表数据
      let expireTime = Date.now(), cates = {}
      Object.assign(cates, {}, {
        expireTime: expireTime,
        catesList: this.catesList
      })
      wx.setStorageSync('cates', cates)
      this.setData({
        catesList: result.data.message,
        goodsList: result.data.message[0].children
      })
    }
  },
  // 点击左侧菜单切换商品
  handleItemTap(e) {
    const { index } = e.currentTarget.dataset
    this.setData({
      currentIndex: index,
      goodsList: this.catesList[index].children,
      scrollTopNumber: 0
    })
  }
})