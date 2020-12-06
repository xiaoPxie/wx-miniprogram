
import { request } from "../../request/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id:goodsID } = options
    this.getGoodsDetail(goodsID)
  },

  async getGoodsDetail(goodsID) {
    const result = await request({
      url: "/goods/detail",
      data: {goods_id: goodsID}
    })
    // const goodsObj = result.data.message
    console.log(result);
    this.goodsObj = result.data.message;
    this.setData({
      goodsObj: {
        goods_id: result.data.message.goods_id,
        goods_name: result.data.message.goods_name,
        goods_price: result.data.message.goods_price,
        goods_introduce: result.data.message.goods_introduce,
        pics: result.data.message.pics
      }
    })
  },

  // 点击图片预览
  handlePreviewImage(e) {
    const urls = this.goodsObj.pics.map(v => v.pics_mid),
      current = e.currentTarget.dataset.currenturl
    wx.previewImage({
      urls: urls,
      current: current
    })
  },
  // 加入购物车
  handleCartAdd() {
    let cart = wx.getStorageSync("cart") || [],
      index = cart.findIndex(v => v.goods_id === this.goodsObj.goods_id)
    // 判断缓存中是否已有该商品的购物车数据
    if(index === -1) {
      // 不存在
      this.goodsObj.num = 1
      // 加入购物车，即选中（在购物车列表中checkbox选中状态）
      this.goodsObj.checked = true
      cart.push(this.goodsObj)
    } else {
      // 已存在
      // this.goodsObj.num ++;
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