import {
  isExitsLifeList,
  createLifeList,
  getLifeList,
  updateLifeList,
  getAllLifeList,
  getDetailById,
  isCustomLifeListById,
  resetLifeList,
  deleteCustomLifeList
} from '../../utils/life'
import { updateBarTitle } from '../../utils/util'
import message from '../../utils/message'
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
  showMoreActions() {
    const { lifeid, detail } = this.data
    const itemList = isCustomLifeListById(lifeid) ? ["编辑清单", "重置清单", "删除清单"] : ["重置清单"]
    wx.showActionSheet({
      itemList,
      success: async (res) => {
        const bindIndex = res.tapIndex
        if(isCustomLifeListById(lifeid)) {
          if(bindIndex === 0) {
            wx.navigateTo({
              url: `/pages/addList/addList?lifeId=${lifeid}&isEdit=1`,
            })
          } else if(bindIndex === 1) {
            await resetLifeList(lifeid)
            message.success("重置成功", {
              complete: () => {
                wx.showLoading({
                  title: '正在加载数据...',
                })
                this.init()
              }
            })
          } else if(bindIndex === 2) {
            wx.showModal({
              title: `${detail.title}`,
              content: `确定要删除此清单吗`,
              success: async (res) => {
                if (res.confirm) {
                  const result = await deleteCustomLifeList(lifeid)
                  if(result) {
                    message.success("删除成功", { complete: () => {
                      wx.navigateBack()
                    } })
                  }
                } else if (res.cancel) {
                }
              }
            })
          }
        } else {
          if(bindIndex === 0) {
            await resetLifeList(lifeid)
            message.success("重置成功", {
              complete: () => {
                wx.showLoading({
                  title: '正在加载数据...',
                })
                this.init()
              }
            })
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {
      lifeId
    } = options
    if (!lifeId) {
      return message.error("参数有误", {
        duration: 300,
        complete: () => {
          wx.navigateBack()
        }
      });
    }
    this.setData({
      lifeid: lifeId
    }, () => {
      wx.showLoading({
        title: '正在加载数据...',
      })
      this.init()
    })
  },
  async handleItemChanged(e) {
    const {
      name,
      isSelected
    } = e.currentTarget.dataset.item
    const {
      lifeid,
      detail
    } = this.data
    if (!isSelected) {
      // 选中
      // 1.如果没有则创建
      const isExits = await isExitsLifeList(lifeid)
      if (!isExits) {
        await createLifeList(lifeid)
      }
      let hasLifeList = await getLifeList(lifeid)
      hasLifeList = JSON.parse(hasLifeList)
      const newLifeList = JSON.parse(JSON.stringify(hasLifeList))
      newLifeList.selectedItems = [
        ...newLifeList.selectedItems,
        {
          name
        }
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
        message.info(`已完成清单项：${name}`)
        this.updateProgress()
      })
    } else {
      wx.navigateTo({
        url: `/pages/itemDetail/itemDetail?lifeId=${lifeid}&itemName=${name}`,
      })
    }
  },
  async init() {
    const {
      lifeid
    } = this.data
    // 首先判断是否有存档
    let fileList = await getLifeList(lifeid)
    let selected = []
    if (fileList && fileList !== "") {
      fileList = JSON.parse(fileList)
      selected = fileList.selectedItems.map(s => {
        return s.name
      })
    }
    // 合并初始数据和存档
    const detail = await getDetailById(lifeid)
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
    const {
      detail
    } = this.data
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
    updateBarTitle("清单详情")
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