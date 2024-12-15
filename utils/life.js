import { getStorage, setStorage, removeStorage } from './storge'

const app = getApp()

export const LIFE_LIST_KEY = 'LIFE_LIST'
export const LIFE_LIST_CUSTOM = 'LIFE_LIST_CUSTOM'

function ceateLifeStorageKey(id) {
  return `${LIFE_LIST_KEY}_${id}`
}

export async function isExitsLifeList(lifeId) {
  const res = await getStorage(ceateLifeStorageKey(lifeId))
  return Boolean(res)
}

export async function createLifeList(id) {
  const res = await setStorage(ceateLifeStorageKey(id), JSON.stringify({ selectedItems: [] }))
  return res
}

export async function getLifeList(lifeId) {
  const res = await getStorage(ceateLifeStorageKey(lifeId))
  return res
}

export async function updateLifeList(id, obj) {
  const res = await setStorage(ceateLifeStorageKey(id), JSON.stringify(obj))
  return Boolean(res)
}

export async function resetLifeList(id) {
  const res = await removeStorage(ceateLifeStorageKey(id))
  return Boolean(res)
}

// 根据id判断是否为自定义清单
export function isCustomLifeListById(id) {
  return id.includes('c')
}

export async function getDetailById(id) {
  let result = null
  const allList = await getAllLifeList()
  result = allList.find(a => {
    return a.id === id
  })
  return result
}

export async function removeItem(lifeId, itemName) {
  let result = await getLifeList(lifeId)
  result = JSON.parse(result)
  const newResult = JSON.parse(JSON.stringify(result))
  const index = newResult.selectedItems.findIndex(s => {
    return s.name === itemName
  })
  if(index !== -1) {
    newResult.selectedItems.splice(index, 1)
  }
  const res = await updateLifeList(lifeId, newResult)
  return true
}

export async function clearAllData() {
  const info = await wx.getStorageInfoSync()
  const validKeys = info.keys.filter(k => {
    return k.includes(LIFE_LIST_KEY)
  })
  const promiseList = validKeys.map(v => wx.removeStorage({ key: v }))
  try {
    await Promise.all(promiseList)
    return true
  } catch (err) {
    return false
  }
}

export async function getLifeListNum() {
  const info = await wx.getStorageInfoSync()
  const validKeys = info.keys.filter(k => {
    return k.includes(LIFE_LIST_KEY)
  })
  return validKeys.length
}

export async function getAllLifeList() {
  let allList = app.globalData.lifeListData
  let customList = await getStorage(LIFE_LIST_CUSTOM)
  if(customList !== "") {
    customList = JSON.parse(customList)
    allList = allList.concat(customList)
  }
  return allList
}

// 自带清单 + 自定义添加清单的总数
export async function getAllLifeListNum() {
  const info = await wx.getStorageInfoSync()
  const validKeys = info.keys.filter(k => {
    return k.includes(LIFE_LIST_KEY)
  })
  let customList = await getStorage(LIFE_LIST_CUSTOM)
  if(customList === "") {
    return validKeys.length
  }
  customList = JSON.parse(customList)
  return validKeys.length + customList.length
}

// 添加自定义清单
export async function updateCustomList(obj) {
  const isInit = await getStorage(LIFE_LIST_CUSTOM)
  if(!isInit) {
    await setStorage(LIFE_LIST_CUSTOM, "[]")
  }
  if(Array.isArray(obj)) {
    await setStorage(LIFE_LIST_CUSTOM, JSON.stringify(obj))
    return true
  } else {
    let oldList = await getStorage(LIFE_LIST_CUSTOM)
    oldList = JSON.parse(oldList)
    const newList = JSON.parse(JSON.stringify(oldList))
    const index = newList.findIndex(n => {
      return n.id === obj.id
    })
    if(index === -1) {
      newList.push(obj)
      await setStorage(LIFE_LIST_CUSTOM, JSON.stringify(newList))
    } else {
      newList.splice(index, 1, obj)
      await setStorage(LIFE_LIST_CUSTOM, JSON.stringify(newList))
    }
    return true
  }
}

/**
 * 删除自定义的清单
 * @param {string} id 
 */
export async function deleteCustomLifeList(id) {
  let customList = await getStorage(LIFE_LIST_CUSTOM) // 获取现有清单
  if(customList !== "") {
    customList = JSON.parse(customList)
    let newCustomList = JSON.parse(JSON.stringify(customList))
    const index = newCustomList.findIndex(c => {
      return c.id === id
    })
    if(index !== -1) {
      newCustomList.splice(index, 1)
    }
    await updateCustomList(newCustomList)
    return true
  }
}

export async function getCustomList() {
  let list = await getStorage(LIFE_LIST_CUSTOM)
  if(list && list !== "") {
    list = JSON.parse(list)
    return list
  }
  return []
}