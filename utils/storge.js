export async function setStorage(key, value) {
  try {
    await wx.setStorageSync(key, value)
    return true
  } catch (e) {
    return false
  }
}

export async function getStorage(key) {
  try {
    const value = await wx.getStorageSync(key)
    return value
  } catch (e) {
    return null
  }
}

export async function removeStorage(key) {
  try {
    const value = await wx.removeStorageSync(key)
    return value
  } catch (e) {
    return null
  }
}