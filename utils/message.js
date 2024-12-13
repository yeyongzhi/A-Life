const DEFAULT_DURATION = 600

const message = {
  success: function (str, { complete, duration } = {}) {
    wx.showToast({
      title: str,
      icon: 'success',
      duration: duration || DEFAULT_DURATION,
      complete: () => {
        setTimeout(() => {
          if(complete && typeof complete === "function") {
            complete()
          }
        }, duration || DEFAULT_DURATION)
      }
    })
  },

  warning: function (str, { complete, duration } = {}) {
    wx.showToast({
      title: str,
      icon: 'none',
      duration: duration || DEFAULT_DURATION,
      complete: () => {
        setTimeout(() => {
          if(complete && typeof complete === "function") {
            complete()
          }
        }, duration || DEFAULT_DURATION)
      }
    })
  },

  error: function (str, { complete, duration } = {}) {
    wx.showToast({
      title: str,
      icon: 'error',
      duration: duration || DEFAULT_DURATION,
      complete: () => {
        setTimeout(() => {
          if(complete && typeof complete === "function") {
            complete()
          }
        }, duration || DEFAULT_DURATION)
      }
    })
  }

}

export default message