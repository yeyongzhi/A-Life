import { setStorage, getStorage } from '../../utils/storge.js'
import message from '../../utils/message.js'
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
      return message("请先选择日期")
    }
    const obj = {
      value: new Date(date).valueOf(),
      date: date
    }
    await setStorage('birthday', JSON.stringify(obj))
    message.success("保存成功", {
      complete: () => {
        wx.navigateBack()
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