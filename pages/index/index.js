import { getStorage, setStorage } from '../../utils/storge'

Page({
  data: {
    welcomeText: "A Life",
    show: false
  },
  async init() {
    wx.showLoading({
      title: '程序加载中...'
    })
    const init = await getStorage("LIFE_INIT")
    if(init && init !== "") {
      await setStorage("LIFE_INIT", "1")
      wx.hideLoading()
      wx.switchTab({
        url: '/pages/home/home',
      })
    } else {
      this.setData({
        show: true
      }, () => {
        wx.hideLoading()
      })
    }
  },
  onLoad() {
    this.init()
  },
  async goHome() {
    await setStorage("LIFE_INIT", "1")
    wx.switchTab({
      url: '/pages/home/home',
    })
  }
})
