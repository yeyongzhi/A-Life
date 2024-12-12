import { setStorage, getStorage } from '../../utils/storge.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: ''
  },
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  async submit() {
    const { date } = this.data
    if(!date) {
      return wx.showToast({
        title: '请选择日期',
        icon: 'error'
      })
    }
    const obj = {
      value: new Date(date).valueOf(),
      date: date
    }
    await setStorage('birthday', JSON.stringify(obj))
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 1000,
      success: () => {
        setTimeout(() => {
          wx.navigateBack()
        }, 1000)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  async init() {
    let date = await getStorage('birthday')
    if(date && date !== "") {
      date = JSON.parse(date)
      this.setData({
        date: date.date
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.init()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})