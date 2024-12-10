export async function setStorage(key, value) {
  try {
    const res = await wx.setStorageSync(key, value)
    return res
  } catch (e) {
    
  }
}

export async function getStorage(key) {
  try {
    const value = await wx.getStorageSync(key)
    return value
  } catch (e) {
    
  }
}