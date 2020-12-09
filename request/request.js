
// 发送请求的次数，确保所有请求有返回才关闭loading界面
let requestTimes = 0
export const request = (params) => {
  // 当请求接口url带 /my/ 的表示需带上 header["Authorization"] 的请求头
  let header = {...params.header}
  if(params.url.includes("/my/")) {
    header["Authorization"] = wx.getStorageSync('token')
  }

  requestTimes ++
  return new Promise((resolve,reject) => {
    // 接口数据基址
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    // 显示loading界面
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    // 发送请求
    wx.request({
      ...params,
      header: header,
      url: baseUrl + params.url,
      success: result => {
        resolve(result)
      },
      fail: err => {
        reject(err)
      },
      complete: _ => {
        // 完成请求
        requestTimes --
        // 如果请求数清0，则表示所有请求均已完成
        if(requestTimes === 0)
          wx.hideLoading()
      }
    })
  })
}