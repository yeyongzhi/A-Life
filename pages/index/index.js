Page({
  data: {
    welcomeText: "A Life"
  },
  goHome() {
    console.log("欢迎使用")
    wx.switchTab({
      url: '/pages/home/home',
    })
  }
})
