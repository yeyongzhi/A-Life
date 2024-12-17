import { clearAllData } from '../../utils/life'
import message from '../../utils/message'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMoreVisible: false
  },
  gotoAbout() {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  gotoLog() {
    wx.navigateTo({
      url: '/pages/log/log',
    })
  },
  settingBirthday() {
    this.setData({
      showMoreVisible: false
    }, () => {
      wx.navigateTo({
        url: '/pages/birthday/birthday',
      })
    })
  },
  // 清除全部数据
  clearData() {
    this.setData({
      showMoreVisible: false
    }, () => {
      wx.showModal({
        title: '清空数据',
        content: '确定要删除本地全部数据吗？',
        success: async (res) => {
          if (res.confirm) {
            const result = await clearAllData()
            if(result) {
              wx.showToast({
                title: '清除成功',
                icon: 'success'
              })
            }
          } else if (res.cancel) {
          }
        }
      })
    })
  },
  showMore() {
    // 方案一：
    // this.setData({
    //   showMoreVisible: !this.data.showMoreVisible
    // })
    // 方案二：
    wx.showActionSheet({
      alertText: '',
      itemList: [
        "生日设置",
        "清空数据",
      ],
      // itemColor: '#15559A',
      success: (res) => {
        if(res.tapIndex === 0) {
          wx.navigateTo({
            url: '/pages/birthday/birthday',
          })
        } else if(res.tapIndex === 1) {
          wx.showModal({
            title: '清空数据',
            content: '确定要删除本地全部数据吗？',
            success: async (res) => {
              if (res.confirm) {
                const result = await clearAllData()
                if(result) {
                  message.success("清除成功")
                }
              } else if (res.cancel) {
              }
            }
          })
        }
      }
    })
  },
  copyWechat() {
    wx.setClipboardData({
      data: app.globalData.aythorWechat,
      success: () => {
        message.success("已复制微信号")
      }
    })
  },
  copyEmail() {
    wx.setClipboardData({
      data: app.globalData.authorEmail,
      success: () => {
        message.success("已复制邮箱")
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