
import { request } from "../../request/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    keyword: ""
  },
  timeout: "",

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  handleInput(e) {
    const { value } = e.detail
    if(!value.trim()) {
      this.setData({
        dataList: []
      })
      return;
    }
    clearTimeout(this.timeout)
    this.timeout = setTimeout( _ => {
      request({
        url: "/goods/qsearch",
        data: {query: value},
      }).then( res =>{
        this.setData({
          dataList: res.data.message
        })
      })
    }, 1000)
  },

  handleCancel() {
    this.setData({
      dataList: [],
      keyword: ""
    })
  }
})
