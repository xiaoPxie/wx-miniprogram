// components/UpImg/UpImg.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgObj: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 预览图片
    previewImg(e) {
      const { picurl } = e.currentTarget.dataset
      this.triggerEvent("imgPreview", {picurl})
    },
    // 删除图片
    deleteImg(e) {
      const { path } = e.currentTarget.dataset
      this.triggerEvent("imgDelete", {path});
    }
  }
})
