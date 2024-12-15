// app.js
import { TagData } from './static/data/tag.js'
import { LIFE_LIST_DATA } from './static/data/list.js'

App({
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })

    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    wx.loadFontFace({
      global: true,
      family: 'manhua',
      source: 'url("https://mp-49f67837-5464-4210-8dd3-75b9a3099619.cdn.bspapp.com/font/也字工厂漫画体.TTF")',
      success: (res) => {
        console.log(res)
      }
    })
  },
  globalData: {
    userInfo: null,
    tagData: TagData,
    lifeListData: LIFE_LIST_DATA,
    authorEmail: '18258475212m@sina.cn',
    aythorWechat: 'Aurora-O23'
  }
})
