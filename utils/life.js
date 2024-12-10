import { getStorage, setStorage } from './storge'

function ceateLifeStorageKey(id) {
  return `LIFE_LIST_${id}`
}

export async function isExitsLifeList(lifeId) {
  const res = await getStorage(lifeId)
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