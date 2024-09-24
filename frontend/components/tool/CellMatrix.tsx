// import { Nucleotide } from '../Nucleotide'
/**
 * 生成指定的矩阵，按照给定规则填充数字和零。
 *
 * @param rows - 矩阵的行数。
 * @param cols - 矩阵的列数。
 * @returns 矩阵。
 */
function Cell(rows: number, cols: number): string[][] {
  console.log('[INFO] Cell: ', rows, '-', cols)
  // 用于生成矩阵的函数
  const generateRow = (): number[] => {
    // 创建一个空行
    const row = Array(cols).fill('#')

    return row
  }

  // 生成指定数量的行
  const matrix = Array.from(
    { length: rows },
    generateRow
  ) as unknown as string[][]
  console.log('[INFO] Cell: ', matrix)
  return matrix
}

export default Cell
