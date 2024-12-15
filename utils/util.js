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

export function calculateOlympics(birthYear) {
  const currentYear = 2024;
  let summerOlympicsCount = 0;
  let winterOlympicsCount = 0;

  // 确定最近的夏季奥运会年份
  let nextSummerOlympics = Math.ceil(birthYear / 4) * 4;
  if (nextSummerOlympics < birthYear) {
      nextSummerOlympics += 4;
  }

  // 确定最近的冬季奥运会年份
  let nextWinterOlympics = nextSummerOlympics - 2;
  if (nextWinterOlympics < birthYear) {
      nextWinterOlympics = nextSummerOlympics + 2;
  }

  // 计算夏季奥运会次数
  for (let year = nextSummerOlympics; year <= currentYear; year += 4) {
      if (year >= birthYear) {
          summerOlympicsCount++;
      }
  }

  // 计算冬季奥运会次数
  for (let year = nextWinterOlympics; year <= currentYear; year += 4) {
      if (year >= birthYear) {
          winterOlympicsCount++;
      }
  }

  return {
      summerOlympics: summerOlympicsCount,
      winterOlympics: winterOlympicsCount,
      totalOlympics: summerOlympicsCount + winterOlympicsCount
  };
}

// 示例：假设你出生于1990年
// const birthYear = 1990;
// const olympics = calculateOlympics(birthYear);
// console.log(`自从 ${birthYear} 年出生以来，你已经经历了 ${olympics.summerOlympics} 次夏季奥运会和 ${olympics.winterOlympics} 次冬季奥运会，总计 ${olympics.totalOlympics} 次奥运会。`);