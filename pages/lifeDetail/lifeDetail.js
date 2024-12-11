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
    selectItemNames: [], // 已选择的标签
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
      // 返回
      wx.navigateBack()
      return false;
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
  async handleItemChanged(e) {
    const { name, isSelected } = e.currentTarget.dataset.item
    const { lifeid, detail } = this.data
    if(!isSelected) {
      // 选中
      // 1.如果没有则创建
      const isExits = await isExitsLifeList(lifeid)
      if(!isExits) {
        await createLifeList(lifeid)
      }
      let hasLifeList = await getLifeList(lifeid)
      hasLifeList = JSON.parse(hasLifeList)
      const newLifeList = JSON.parse(JSON.stringify(hasLifeList))
      newLifeList.selectedItems = [
        ...newLifeList.selectedItems,
        { name }
      ]
      // 2.更新数据并保存
      updateLifeList(lifeid, newLifeList)
      const result = {
        ...detail,
        list: detail.list.map(item => {
          return {
            ...item,
            isSelected: newLifeList.selectedItems.map(s => s.name).includes(item.name)
          }
        })
      }
      this.setData({
        detail: result
      }, () => {
        console.log(this.data.detail)
        this.updateProgress()
      })
    } else {
      wx.navigateTo({
        url: `/pages/itemDetail/itemDetail?lifeId=${lifeid}&itemName=${name}`,
      })
    }
  },
  async init() {
    const { lifeid } = this.data
    // 首先判断是否有存档
    let fileList = await getLifeList(lifeid)
    let selected = []
    if(fileList && fileList !== "") {
      fileList = JSON.parse(fileList)
      selected = fileList.selectedItems.map(s => {
        return s.name
      })
    }
    // 合并初始数据和存档
    const allLifeList = app.globalData.lifeListData
    const detail = allLifeList.find(a => {
      return a.id === lifeid
    })
    const result = {
      ...detail,
      list: detail.list.map(item => {
        return {
          name: item,
          isSelected: selected.includes(item)
        }
      })
    }
    this.setData({
      detail: result
    }, () => {
      this.updateProgress()
      wx.hideLoading()
    })
  },
  updateProgress() {
    const { detail } = this.data
    const selectedNum = detail.list.filter(l => {
      return l.isSelected
    }).length
    const total = detail.list.length
    const progress = ((selectedNum / total) * 100).toFixed(1)
    console.log("当前进度为：" + progress)
    this.setData({
      progress
    })
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
    wx.showLoading({
      title: '正在加载数据...',
    })
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