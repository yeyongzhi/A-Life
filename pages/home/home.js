import { isExitsLifeList, createLifeList, getLifeList, updateLifeList, getCustomList, getAllLifeList, isCustomLifeListById } from '../../utils/life'
import { getProgress, updateBarTitle } from '../../utils/util'
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
      url: '/pages/lifeDetail/lifeDetail?lifeId=' + lifeid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },
  gotoList() {
    wx.switchTab({
      url: '/pages/list/list',
    })
  },
  async handleLifeList(myLifeList) {
    const result = await Promise.all(myLifeList.map(m => getLifeList(m.id)))
    myLifeList.forEach((item, index) => {
      item.list = item.list.map(item2 => {
        if(!result[index] || result[index] === "") {
          return {
            name: item2.name,
            isSelected: false
          }
        }
        const select = JSON.parse(result[index]).selectedItems
        const isSelected = select.map(s => s.name).includes(item2.name)
        return {
          name: item2.name,
          isSelected: Boolean(isSelected)
        }
      })
      item.progress = getProgress(item.list)
    })
    this.setData({
      myLifeList
    }, () => {
      wx.hideLoading()
    })
  },
  async init() {
    wx.showLoading({
      title: '数据加载中...',
    })
    const allList = await getAllLifeList()
    const promiseList = allList.filter(a => {
      return !isCustomLifeListById(a.id)
    }).map(a2 => isExitsLifeList(a2.id))
    const result = await Promise.all(promiseList)
    let correctList = [
      ...allList.filter(a => !isCustomLifeListById(a.id)).filter((a2, index) => {
        return result[index]
      }),
      ...allList.filter(a => {
        return isCustomLifeListById(a.id) && !a.isDraft
      })
    ]
    correctList = correctList.map(c1 => {
      return {
        ...c1,
        list: c1.list.map(c2 => {
          return { name: c2 }
        })
      }
    })
    this.handleLifeList(correctList)
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
    updateBarTitle("我的清单")
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