const BASE_URL = 'https://www.uinav.com'
function request (options) {
  return new Promise((resolve, reject) => {
    if (!options.noLoading) {
      wx.showLoading({
        title: '加载中'
      })
    }
    wx.request({
      url: `${BASE_URL}${options.url}`,
      method: options.method,
      data: options.data || {},
      dataType: options.dataType || 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      },
      complete () {
        wx.hideLoading()
      }
    })
  })
}

export default request
