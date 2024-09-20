function Score(matrix: string[][], task: string[][]): number[][] {
  console.log('score:', matrix, '-', task)
  const rows = matrix.length
  const cols = matrix[0].length
  const matchResult: number[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(0)
  )

  const rowTargetMap = new Map<number, Set<string>>()
  task.forEach((target) => {
    for (let i = 0; i < target.length; i++) {
      if (target[i] !== '#') {
        if (!rowTargetMap.has(i)) {
          rowTargetMap.set(i, new Set())
        }
        rowTargetMap.get(i)!.add(target[i])
      }
    }
  })

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const char = matrix[row][col]
      if (rowTargetMap.has(row) && rowTargetMap.get(row)!.has(char)) {
        matchResult[row][col] = 1
      }
    }
  }

  return matchResult
}
export default Score
