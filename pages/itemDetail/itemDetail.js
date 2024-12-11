import {
	isExitsLifeList,
	createLifeList,
	getLifeList,
	updateLifeList,
	removeItem
} from '../../utils/life'
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		lifeId: null,
		detail: [],
		item: "",
		isSelected: false, // 当前是否选中
		description: '' // 描述
	},
	// 保存描述
	async save() {
		if (this.data.description === "") {
			return wx.showToast({
				title: '请填写描述~',
				icon: 'error'
			})
		}
		let fileList = await getLifeList(this.data.lifeId)
		fileList = JSON.parse(fileList)
		const newLifeList = JSON.parse(JSON.stringify(fileList))
		newLifeList.selectedItems.forEach(s => {
			if (s.name === this.data.item) {
				s.description = this.data.description
			}
		})
		await updateLifeList(this.data.lifeId, newLifeList)
		wx.showToast({
			title: '保存成功',
			icon: 'success',
			duration: 1000,
			success: () => {
				setTimeout(() => {
          wx.navigateBack()
        }, 1000)
			}
		})
	},
	handleDescriptionChanged(e) {
		this.setData({
			description: e.detail.value
		})
	},
	radioChange(e) {
		this.setData({
			isSelected: !this.data.isSelected
		}, async () => {
			const value = this.data.isSelected
			console.log(value)
			if (!value) {
				// 取消
				const result = await removeItem(this.data.lifeId, this.data.item)
				console.log(result)
				if (result) {
					wx.showToast({
						title: '取消成功',
						icon: 'success',
						duration: 1000,
						success: () => {

						}
					})
				}
			} else {

			}
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	async onLoad(options) {
		const {
			lifeId,
			itemName
		} = options
		wx.showLoading({
			title: '正在加载数据...',
		})
		// 首先判断是否有存档
		let fileList = await getLifeList(lifeId)
		let selected = []
		if (fileList && fileList !== "") {
			fileList = JSON.parse(fileList)
			selected = fileList.selectedItems.map(s => {
				return s.name
			})
		}
		const allLifeList = app.globalData.lifeListData
		const detail = allLifeList.find(a => {
			return a.id === lifeId
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
		const isSelected = result.list.find(item => {
			return item.name === itemName
		}).isSelected
		const description = fileList.selectedItems.find(item => {
			return item.name === itemName
		}).description
		this.setData({
			lifeId,
			detail: result,
			item: itemName,
			isSelected: isSelected,
			description
		}, () => {
			wx.hideLoading()
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