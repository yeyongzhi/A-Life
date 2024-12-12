import { getAllLifeList } from '../../utils/life'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagList: [],
    lifeListData: [],
    searchLifeListData: [],
    activeTag: 'all',
    searchWord: ''
  },
  gotoAddPage() {
    wx.navigateTo({
      url: '/pages/addList/addList',
    })
  },
  updateLifeList() {
    wx.showLoading({
      title: '数据加载中...',
    })
    const { lifeListData, searchWord, activeTag } = this.data
    let newList = lifeListData
    // 筛选tag
    if(activeTag && activeTag !== 'all') {
      newList = lifeListData.filter(l => {
        return l.tagList.includes(activeTag)
      })
    }
    // 筛选搜索关键字
    if(searchWord && searchWord.trim() !== "") {
      newList = lifeListData.filter(l => {
        return l.title.includes(searchWord)
      })
    }
    this.setData({
      searchLifeListData: newList
    }, () => {
      wx.hideLoading()
    })
  },
  handleSearchChanged(e) {
    this.setData({
      searchWord: e.detail.value
    }, () => {
      this.updateLifeList()
    })
  },
  gotoLifeDetail(e) {
    const { lifeid } = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/lifeDetail/lifeDetail?lifeid=' + lifeid,
    })
  },
  handleTagChanged(e) {
    const { tagkey } = e.currentTarget.dataset
    this.setData({
      activeTag: tagkey
    }, () => {
      this.updateLifeList()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  async init() {
    const newList = [
      { name:'全部', key: 'all' },
      { name:'热门', key: 'hot' },
      { name:'最新', key: 'new' },
      { name:'自制', key: 'custom' },
      ...app.globalData.tagData
    ]
    const allList = await getAllLifeList()
    const newListData = allList.map(item => {
      return {
        ...item,
        renderContent: item.list.slice(0, 20).join('、')
      }
    })
    this.setData({
      tagList: newList,
      lifeListData: newListData,
      searchLifeListData: newListData
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