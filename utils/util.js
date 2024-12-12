export function getProgress(list) {
  const selectedList = list.filter(l => {
    return l.isSelected
  })
  return ((selectedList.length / list.length) * 100).toFixed(1)
}

export function updateBarTitle(title) {
  wx.setNavigationBarTitle({
    title
  })
}