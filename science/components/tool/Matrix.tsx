import { Nucleotide } from '../Nucleotide'

/**
 * 创建一个二维数组（矩阵），每行的元素数量在指定的范围内，不足的部分用 '0' 填充。
 *
 * @param rows - 矩阵的行数。
 * @param cols - 矩阵的列数。
 * @param max - 每行元素的最大数量。
 * @param min - 每行元素的最小数量。
 * @returns 矩阵。
 */
function Matrix(
  rows: number,
  cols: number,
  max: number,
  min: number
): string[][] {
  console.log('matrix: ', rows, '-', cols, '-', max, '-', min)

  // 生成一行的函数
  const generateRow = (): string[] => {
    // 生成每行的元素数量，范围在 min 和 max 之间
    const elementCount = Math.floor(Math.random() * (max - min + 1)) + min

    // 创建一行的随机核苷酸元素
    const row = Array.from(
      { length: elementCount },
      () => Nucleotide[Math.floor(Math.random() * Nucleotide.length)]
    )

    // 如果元素数量少于 cols，则用 '0' 填充
    while (row.length < cols) {
      row.push('0')
    }

    return row
  }

  // 创建整个矩阵
  const matrix = Array.from({ length: rows }, generateRow)

  console.log('matrix: ', matrix)

  return matrix
}

export default Matrix
