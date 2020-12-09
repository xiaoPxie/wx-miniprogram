
import { request } from "../../request/request"
import { showToast } from "../../utils/axyncWx"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
    isCollect: false
  },

  onLoad: function (options) {
    const { goods_id:goodsID } = options
    this.getGoodsDetail(goodsID)
  },

  // 获取商品详情数据
  async getGoodsDetail(goodsID) {
    // 发送获取商品详情数据请求
    const result = await request({
      url: "/goods/detail",
      data: {goods_id: goodsID}
    })
    const goodsObj = result.data.message;
    // 判断是否有商品数据
    if(typeof(goodsObj) !== "undefined" && goodsObj !== null){
      // 获取缓存中该商品是否有收藏
      const collect = wx.getStorageSync('goodsCollect') || [],
        index = collect.findIndex(v => goodsObj.goods_id === v.goods_id)
      let isCollect = false
      if(index !== -1){
        isCollect = true
      }
      // 渲染数据
      this.setData({
        goodsObj: {
          goods_id: goodsObj.goods_id,
          goods_name: goodsObj.goods_name,
          goods_price: goodsObj.goods_price,
          goods_introduce: goodsObj.goods_introduce,
          pics: goodsObj.pics
        },
        isCollect
      })
    } else {
      await showToast({title: "加载数据失败，请尝试重新进入页面！", icon: 'none'})
    }
  },

  // 点击图片预览
  handlePreviewImage(e) {
    const urls = this.data.goodsObj.pics.map(v => v.pics_mid),
      current = e.currentTarget.dataset.currenturl;
    wx.previewImage({
      urls: urls,
      current: current
    })
  },
  
  // 点击收藏
  async handleCollect() {
    // 获取缓存中收藏数组
    let collect = wx.getStorageSync('goodsCollect') || [],
      title = "", isCollect = false;
    const goodsObj = this.data.goodsObj,
      index = collect.findIndex(v => goodsObj.goods_id === v.goods_id)
    // 判断该商品是否已在收藏数组中
    // 已有，则表示取消收藏
    if(index !== -1) {
      collect.splice(index, 1)
      title = "取消收藏"
    } else {
      // 否则加入该商品，并修改图标样式
      collect.push(goodsObj)
      isCollect = true
      title = "收藏成功"
    }
    // 重新设置缓存
    wx.setStorageSync('goodsCollect', collect)
    this.setData({isCollect})
    await showToast({title: title})
  },

  // 加入购物车
  handleCartAdd() {
    let cart = wx.getStorageSync("cart") || [],
      goodsObj = this.data.goodsObj,
      index = cart.findIndex(v => v.goods_id === goodsObj.goods_id)
    // 判断缓存中是否已有该商品的购物车数据
    if(index === -1) {
      goodsObj.num = 1
      // 加入购物车，即选中（在购物车列表中checkbox选中状态）
      goodsObj.checked = true
      cart.push(goodsObj)
    } else {
      // 已存在
      cart[index].num ++
    }
    // 加入缓存
    wx.setStorageSync("cart", cart)
    // 弹窗提示
    wx.showToast({
      title: '成功加入购物车',
      mask: true,
      icon: 'success'
    })
  }
})