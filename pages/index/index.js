import { getStorage, setStorage } from '../../utils/storge'

Page({
  data: {
    welcomeText: "A Life"
  },
  async init() {
    const init = await getStorage("LIFE_INIT")
    if(init && init !== "") {
      await setStorage("LIFE_INIT", "1")
      wx.switchTab({
        url: '/pages/home/home',
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
