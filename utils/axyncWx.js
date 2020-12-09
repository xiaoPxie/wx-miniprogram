/**
 * showModal Promise
 * @param {object} param0 
 */
export const showModal = (params) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      ...params,
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
export const showToast = (params) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      ...params,
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
 * login Promise
 * @param {object} param0 
 */
export const login = (params) => {
  return new Promise((resolve, reject) => {
    wx.login({
      ...params,
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
 * requestPayment Promise
 * @param {object} param0 
 */
export const requestPayment = (pay) => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...pay,
      success: (res)=> {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}