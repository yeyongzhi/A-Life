import { setStorage, getStorage } from '../../utils/storge.js'
import { updateBarTitle, calculateOlympics } from '../../utils/util.js'
import message from '../../utils/message.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    seconds: '-',
    dayInfo: {
      sundown: 0,
      summer: 0, // 过去了多少个夏天
      sports: 0, // 奥林匹克运动会
    },
    interval: null
  },
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    }, () => {
      this.submit()
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
    message.success("生命契约已更新", {
      complete: () => {
        this.init()
      }
    })
  },
  goBack() {
    wx.navigateBack()
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
  seartSeconds() {
    const birthday = new Date(this.data.date).valueOf()
    if(this.data.interval) {
      clearInterval(this.data.interval)
    }
    const interval = setInterval(() => {
      const now = new Date().valueOf()
      this.setData({
        seconds: Math.floor((now - birthday)  / 1000)
      })
    }, 1000)
    this.setData({
      interval
    })
  },
  setDayInfo() {
    const year = new Date(this.data.date).getFullYear()
    const month = new Date(this.data.date).getMonth() + 1
    const year2 = new Date().getFullYear()
    const month2 = new Date().getMonth() + 1
    let num1 = ((year2 - 1) - (year + 1)) + (month < 8 ? 1 : 0) + (month2 > 6 ? 1 : 0)
    const num2 = calculateOlympics(year).summerOlympics
    const num3 = Math.floor((new Date().valueOf() - new Date(this.data.date).valueOf()) / 1000 / 60 / 60 / 24)
    const obj = {
      summer: num1,
      sports: num2,
      sundown: num3
    }
    this.setData({
      dayInfo: obj
    })
  },
  async init() {
    let date = await getStorage('birthday')
    if(date && date !== "") {
      date = JSON.parse(date)
      this.setData({
        date: date.date
      }, () => {
        this.seartSeconds()
        this.setDayInfo()
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    updateBarTitle("你的生日")
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