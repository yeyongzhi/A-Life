import { getAllLifeList, deleteCustomLifeList, getDetailById, isCustomLifeListById } from '../../utils/life'
import message from '../../utils/message'
import { getProgress, updateBarTitle } from '../../utils/util'
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
    searchWord: '',
    moveLeft: {},
    screen: {
      x: 0,
      y: 0
    },
    isShowMask: false, // 是否展示遮罩层
    longPressId: null
  },
  async handleLifOperation(e) {
    const { lifeid } = e.currentTarget.dataset
    if(!isCustomLifeListById(lifeid)) {
      return false;
    }
    const detail = await getDetailById(lifeid)
    wx.showActionSheet({
      alertText: '',
      itemList: [
        "编辑清单",
        "删除清单",
      ],
      // itemColor: '#15559A',
      success: (res) => {
        if(res.tapIndex === 0) {
          // 去往新增页，进行编辑
          wx.navigateTo({
            url: `/pages/addList/addList?lifeId=${lifeid}&isEdit=1`,
          })
        } else if(res.tapIndex === 1) {
          wx.showModal({
            title: `${detail.title}`,
            content: `确定要删除此清单吗`,
            success: async (res) => {
              if (res.confirm) {
                const result = await deleteCustomLifeList(lifeid)
                if(result) {
                  message.success("删除成功", { complete: () => {
                    this.init()
                  } })
                }
              } else if (res.cancel) {
              }
            }
          })
        }
      }
    })
  },
  hideOpeartion() {
    const { moveLeft } = this.data
    Object.keys(moveLeft).forEach(k => {
      if(moveLeft[k] !== 0) {
        moveLeft[k] = 0
      }
    })
    this.setData({
      moveLeft,
      isShowMask: false
    })
  },
  handleTouchStart(e) {
    const { moveLeft } = this.data
    const { lifeindex } = e.currentTarget.dataset
    const { screenX, screenY } = e.changedTouches[0]
    moveLeft[lifeindex] = 0
    this.setData({
      moveLeft,
      screen: {
        x: screenX,
        y: screenY
      }
    })
  },
  handleTouchMove(e) {
    const { moveLeft, screen } = this.data
    let newMoveLeft = JSON.parse(JSON.stringify(moveLeft))
    const { lifeindex } = e.currentTarget.dataset
    const { screenX, screenY } = e.changedTouches[0]
    newMoveLeft[lifeindex] = (newMoveLeft[lifeindex] + (screenX - screen.x) )
    if(newMoveLeft[lifeindex] > -70) {
      this.setData({
        moveLeft: newMoveLeft,
        screen: {
          x: screenX,
          y: screenY
        },
        isShowMask: true
      })
    }
  },
  handleTouchEnd() {
    // console.log("TouchEnd")
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
      url: `/pages/lifeDetail/lifeDetail?lifeId=${lifeid}`,
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
      { name:'定制', key: 'custom' },
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
      lifeListData: newListData
    }, () => {
      this.updateLifeList()
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
    updateBarTitle("清单列表")
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