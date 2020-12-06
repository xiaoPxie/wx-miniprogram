/**
 * showModal Promise
 * @param {object} param0 
 */
export const showModal = ({title="", content}) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: title,
      content: content,
      success: (res)=> {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

/**
 * showToast Promise
 * @param {object} param0 
 */
export const showToast = ({title, icon}) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: title,
      icon: icon,
      success: (res)=> {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}