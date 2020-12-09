
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      value: "店铺收藏",
      isActive: true
    },{
      id: 1,
      value: "商品收藏",
      isActive: false
    },{
      id: 2,
      value: "浏览足迹",
      isActive: false
    }],
    dataList: [],
    type: "0"
  },

  onShow: function () {
    // 获取页面参数
    const pages = getCurrentPages(),
      { type } = pages[pages.length-1].options;
    // 激活对应标签页
    this.tabsItemChange(Number(type))
  },

  // 子组件向父组件传递
  handleTabsItemChange(e) {
    let { id } = e.detail
    this.tabsItemChange(id)
  },

  tabsItemChange(type) {
    let dataList = [],
      { tabs } = this.data
    tabs.forEach((v,i) => {
      type === v.id ? v.isActive = true : v.isActive = false
    })
    // 加载店铺收藏列表
    if(type === 0) {
      dataList = wx.getStorageSync("shopCollect") || []
    } else if(type === 1) {
      // 加载商品收藏列表
      dataList = wx.getStorageSync("goodsCollect") || []
    } else {
      // 加载浏览足迹列表
      dataList = wx.getStorageSync("historyBrowse") || []
    }

    this.setData({
      tabs,
      dataList,
      type
    })
  }
})