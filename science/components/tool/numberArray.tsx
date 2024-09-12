// 创建二维数组
function numberArray(): number[][] {
  const mainArray: number[][] = []
  const numbers = [1, 2, 3, 4, 5, 6]

  for (let i = 0; i < 8; i++) {
    const subArray: number[] = []
    const length = Math.floor(Math.random() * (10 - 5 + 1) + 5) // 随机长度 5 到 10
    for (let j = 0; j < length; j++) {
      // 生成随机索引并从 numbers 数组中获取随机数字
      const randomIndex = Math.floor(Math.random() * numbers.length)
      subArray.push(numbers[randomIndex])
    }
    // 如果子数组长度不足 10，则用 0 填充
    while (subArray.length < 10) {
      subArray.push(0)
    }
    mainArray.push(subArray)
  }

  return mainArray
}
export default numberArray
