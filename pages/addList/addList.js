import {
  updateBarTitle
} from '../../utils/util.js'
import message from '../../utils/message.js'
import {
  getAllLifeListNum,
  updateCustomList,
  getDetailById
} from '../../utils/life.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content: "",
    description: '',
    itemList: [],
    modify: null,
    isEdit: false,
    editDetail: null
  },
  // 提交保存
  async submit(e) {
    const {
      title,
      itemList,
      description,
      isEdit,
      editDetail
    } = this.data
    if (title === "") {
      return message.warning("请填写标题")
    }
    if (itemList.length === 0) {
      return message.warning("请至少填写一项")
    }
    // 编辑保存
    if (isEdit) {
      const params = {
        id: editDetail.id,
        title,
        list: itemList,
        description,
        tagList: editDetail.tagList,
        isDraft: Boolean(isdraft)
      }
      const res = await updateCustomList(params)
      if (res) {
        message.success("保存成功", {
          complete: () => {
            wx.switchTab({
              url: '/pages/list/list',
            })
          }
        })
      }
      return false;
    }
    const {
      isdraft = false
    } = e.currentTarget.dataset // 是否保存草稿
    const num = await getAllLifeListNum()
    const newId = num + 1
    const params = {
      id: `c${newId}`,
      title,
      list: itemList,
      description,
      tagList: ['custom'],
      isDraft: Boolean(isdraft)
    }
    const res = await updateCustomList(params)
    if (res) {
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 1000,
        success: () => {
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/list/list',
            })
          }, 1000)
        }
      })
    }
  },
  submitModify() {
    const {
      itemList,
      modify,
      content
    } = this.data
    if (!modify) {
      this.submitItemContent()
      return false;
    }
    itemList.splice(modify.index, 1, content)
    this.setData({
      itemList,
      content: '',
      modify: null
    }, () => {
      wx.showToast({
        title: '已修改',
        icon: 'success'
      })
    })
  },
  // 点击编辑
  handleItemClick(e) {
    const {
      itemList
    } = this.data
    const {
      itemname
    } = e.currentTarget.dataset
    const index = itemList.findIndex(k => {
      return k === itemname
    })
    this.setData({
      modify: {
        index,
        oldValue: itemname
      },
      content: itemname
    })
  },
  // 长按删除
  handleItemLongPress(e) {
    const {
      itemList
    } = this.data
    const {
      itemname
    } = e.currentTarget.dataset
    const index = itemList.findIndex(k => {
      return k === itemname
    })
    if (index !== -1) {
      itemList.splice(index, 1)
    }
    this.setData({
      itemList
    }, () => {
      message.success("已删除")
    })
  },
  submitItemContent() {
    const {
      itemList,
      content,
      modify
    } = this.data
    if(modify) {
      return this.submitModify()
    }
    if(content === "") {
      return message.warning("清单项不能为空")
    }
    const index = itemList.findIndex(k => {
      return k === content
    })
    if (index !== -1) {
      return message.warning("已存在相同项")
    }
    const newList = [
      ...itemList,
      content
    ]
    this.setData({
      itemList: newList,
      content: ''
    }, () => {
      message.success("已添加", { duration: 300 })
    })
  },
  handleDescriptionInput(e) {
    this.setData({
      description: e.detail.value
    })
  },
  handleTitleInput(e) {
    this.setData({
      title: e.detail.value
    })
  },
  handleItemInput(e) {
    this.setData({
      content: e.detail.value
    })
  },
  init() {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const {
      lifeId,
      isEdit
    } = options
    // 编辑模式
    if (isEdit) {
      updateBarTitle("编辑自定义清单")
      const detail = await getDetailById(lifeId)
      this.setData({
        title: detail.title,
        description: detail.description,
        itemList: detail.list,
        isEdit: true,
        editDetail: detail
      })
    } else {
      updateBarTitle("添加自定义清单")
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