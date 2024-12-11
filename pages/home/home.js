import { isExitsLifeList, createLifeList, getLifeList, updateLifeList } from '../../utils/life'
import { getProgress } from '../../utils/util'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myLifeList: []
  },
  gotoLifeDetail(e) {
    const { lifeid } = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/lifeDetail/lifeDetail?lifeid=' + lifeid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.init()
  },
  async handleLifeList(myLifeList) {
    const result = await Promise.all(myLifeList.map(m => getLifeList(m.id)))
    myLifeList.forEach((item, index) => {
      item.list = item.list.map(name => {
        return {
          name,
          isSelected: JSON.parse(result[index]).selectedItems.map(s => s.name).includes(name)
        }
      })
      item.progress = getProgress(item.list)
    })
    this.setData({
      myLifeList
    })
  },
  async init() {
    const allLifeList = JSON.parse(JSON.stringify(app.globalData.lifeListData))
    const allIds = allLifeList.map(a => a.id)
    const promiseList = allIds.map(id => isExitsLifeList(id))
    const result = await Promise.all(promiseList)
    const myLifeList = allLifeList.filter((a, index) => {
      return result[index]
    })
    this.handleLifeList(myLifeList)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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