import { Nucleotide } from '../CellBackgroundColor'
/**
 * 生成指定的矩阵，按照给定规则填充数字和零。
 *
 * @param rows - 矩阵的行数。
 * @param cols - 矩阵的列数。
 * @returns 矩阵。
 */
function Task(rows: number, cols: number): string[][] {
  console.log('task: ', rows, '-', cols)
  // 用于生成矩阵的函数
  const generateRow = (): number[] => {
    // 创建一个空行
    const row = Array(cols).fill('0')

    // 随机决定每行中的非零值的位置
    // 比如这里我们先决定非零值的数量
    const numNonZeroValues = Math.floor(Math.random() * (cols - 1)) + 1

    // 随机生成非零值，并插入到行中
    for (let i = 0; i < numNonZeroValues; i++) {
      // 生成一个非零值（1到9之间的随机数）
      const value = Nucleotide[Math.floor(Math.random() * Nucleotide.length)]

      // 随机决定这个非零值的位置
      let index
      do {
        index = Math.floor(Math.random() * cols)
      } while (row[index] !== '0') // 确保插入的位置是零

      row[index] = value
    }

    return row
  }

  // 生成指定数量的行
  const matrix = Array.from({ length: rows }, generateRow)
  console.log('task: ', matrix)
  return matrix as unknown as string[][]
}

export default Task
