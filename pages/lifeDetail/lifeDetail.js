import { getStorage } from '../../utils/storge'
import { isExitsLifeList, createLifeList, getLifeList, updateLifeList } from '../../utils/life'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lifeid: null,
    lifeListData: [],
    detail: {},
    progress: 0,
    selectItemNames: [] // 已选择的标签
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { lifeid } = options
    if(!lifeid) {
      wx.showToast({
        title: '参数有误',
        icon: 'error'
      })
    }
    this.setData({
      lifeid: lifeid
    }, () => {
      wx.showLoading({
        title: '正在加载数据...',
      })
      this.init()
    })
  },
  async init() {
    const { lifeid } = this.data
    // 首先判断是否有存档
    const isExits = isExitsLifeList(lifeid)
    let selected = []
    if(isExits) {

    }
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