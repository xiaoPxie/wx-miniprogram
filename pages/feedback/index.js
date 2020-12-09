
import { showToast, uploadFile } from "../../utils/axyncWx"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        value: "体验问题",
        isActive: true
      },{
        id: 1,
        value: "商品，商家投诉",
        isActive: false
      }],
    imgList: [],  // 存放需要上传图片
    uploadedImgList: [],  // 存放已上传图片服务器后返回外网链接的图片数组
    textAdvice: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 监听文本域输入
  handleInput(e) {
    this.setData({
      textAdvice: e.detail.value
    })
  },

  // 选择图片
  handleImgChoose(e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        // const tempFilePaths = res.tempFilePaths
        const tempFiles = res.tempFiles
        this.setData({
          imgList: [...this.data.imgList, ...tempFiles]
        })
      }
    })
  },

  // 删除图片
  handleImgDelete(e) {
    const { path } = e.detail
    let imgList = this.data.imgList
    imgList = imgList.filter(v => v.path !== path)
    this.setData({
      imgList
    })
  },

  // 点击图片全屏预览
  handleImgPreview(e) {
    const { picurl } = e.detail
    wx.previewImage({
      urls: [picurl],
      current: picurl
    })
  },

  // 子组件向父组件传递
  handleTabsItemChange(e) {
    let { id } = e.detail, { tabs } = this.data;
    tabs.forEach((v,i) => {
      id === v.id ? v.isActive = true : v.isActive = false
    })
    this.setData({tabs})
  },

  // 提交内容
  async handleSubmit() {
    let { textAdvice, imgList, uploadedImgList } = this.data
    // 校验文本域内容
    if(!textAdvice.trim()) {
      await showToast({title: "请检查详细问题内容！", icon: "none", mask: true})
      return ;
    }
    // 显示loading界面
    wx.showLoading({
      title: '发送中，请稍等...',
      mask: true
    })
    // 上传图片
    if(imgList.length !== 0) {
      imgList.forEach( (v,i) => {
        wx.uploadFile({
          filePath: v.path,
          name: 'image',
          url: 'https://img.coolcr.cn/api/upload',
          success: res => {
            const { url } = JSON.parse(JSON.parse(JSON.stringify(res.data))).data
            uploadedImgList.push(url)
            // 所有图片均已上传完毕
            if( i === imgList.length-1) {
              this.setData({
                uploadedImgList
              })
              console.log("发送意见反馈接口请求...")
              wx.hideLoading()
              wx.navigateBack({
                delta: 1,
              })
            }
          }
        })
      })
    } else {
      console.log("发送意见反馈接口请求...")
      wx.hideLoading()
      wx.navigateBack({
        delta: 1,
      })
    }
  }
})