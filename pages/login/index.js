
import { login } from "../../utils/axyncWx"
import { request } from "../../request/request"

Page({
  onShow() {
    
  },
  // 微信一键登录
  async handleGetUserInfo(res) {
    // 获取用户所需信息
    const { encryptedData, iv, rawData, signature, userInfo } = res.detail
    // 用户允许授权
    if(typeof(userInfo)!="undefined") {
      // 获取登录code
      const { code } = await login()
      // 获取token
      let { token } = await request({
        url: "/users/wxlogin",
        method: "POST",
        data: {encryptedData, iv, rawData, signature, code}
      })
      // 由于不是企业小程序，无法获取到token，这里直接写死
      token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo`
      // 将token传入缓存中
      wx.setStorageSync('token', token)
      // 将微信用户信息存入用户中
      wx.setStorageSync("userInfo", userInfo)
      // 获取页面参数，确定执行返回上一页操作还是回到订单页
      const pages = getCurrentPages()
      const { reUrl } = pages[pages.length-1].options
      if(typeof(reUrl) !== "undefined") {
        wx.redirectTo({
          url: decodeURIComponent(reUrl),
        })
        return ;
      } 
      // 返回上一页
      this.goBack()
    }
  },

  // 返回上一页
  goBack() {
    wx.navigateBack({
      delta: 1,
    })
  }
})