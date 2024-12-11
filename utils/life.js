import { getStorage, setStorage } from './storge'

function ceateLifeStorageKey(id) {
  return `LIFE_LIST_${id}`
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