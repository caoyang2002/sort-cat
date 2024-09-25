/**
 * 删除数组中的 '#' 并补充元素
 * @param original 原始数组
 * @param caseArray 需要删除 '#' 的数组
 * @param deleteIndex 删除 '#' 的位置
 * @returns 删除 '#' 后的数组
 */
export default function updateArray(
  original: string[],
  caseArray: string[],
  deleteIndex: number
): string[] {
  // 找到需要删除的 '#' 的位置
  const position = caseArray.indexOf('#', deleteIndex)

  // 移除该位置的 '#'
  caseArray.splice(position, 1)

  // 找到需要补充的元素
  const nextIndex = caseArray.filter((elem) => elem !== '#').length // 计算已填充的元素数量
  if (nextIndex < original.length) {
    caseArray.push(original[nextIndex])
  }
  // console.log('[INFO] DeleteHash: ', caseArray)
  return caseArray
}
