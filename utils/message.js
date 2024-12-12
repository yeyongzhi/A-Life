const duration = 1000

const message = {
  success: function (str, { complete } = {}) {
    wx.showToast({
      title: str,
      icon: 'success',
      duration,
      complete: () => {
        setTimeout(() => {
          if(complete && typeof complete === "function") {
            complete()
          }
        }, duration)
      }
    })
  },

  warning: function (str, { complete } = {}) {
    wx.showToast({
      title: str,
      icon: 'none',
      duration,
      complete: () => {
        setTimeout(() => {
          if(complete && typeof complete === "function") {
            complete()
          }
        }, duration)
      }
    })
  },

  error: function (str, { complete } = {}) {
    wx.showToast({
      title: str,
      icon: 'error',
      duration,
      complete: () => {
        setTimeout(() => {
          if(complete && typeof complete === "function") {
            complete()
          }
        }, duration)
      }
    })
  }

}

export default message