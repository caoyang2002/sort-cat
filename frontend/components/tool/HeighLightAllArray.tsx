// 1 为有背景色
// 0 为透明
// 参数为两个矩阵，返回矩阵中相同元素的 col 的位置
function HeighLightAllArray(
  matrix: string[][] | undefined,
  task: string[][] | undefined
): [number, number][][] {
  if (!matrix || !task || matrix.length === 0 || task.length === 0) {
    console.log('Score: Invalid input. Returning 0.')
    return []
  }
  console.log('=========== HeighLightAllArray.tsx ===========')
  const matrixRows = matrix.length
  const matrixCols = matrix[0].length
  console.log('matrix 行', matrixRows, matrixCols)
  const taskRows = task.length
  const taskCols = task[0].length
  console.log('task 行', taskRows, taskCols)

  const heighLightArray = []
  // 将匹配的  matrix[matrixRow][col] 放入 matchArray
  function checkSubarrayMatch(
    matrixRow: number,
    taskRow: number,
    startCol: number
  ): [number, number][] {
    const matchIndices: [number, number][] = []
    const endCol = Math.min(matrixCols, taskCols)

    for (let col = startCol; col < endCol; col++) {
      const matrixCell = matrix?.[matrixRow]?.[col]
      const taskCell = task?.[taskRow]?.[col]

      if (
        matrixCell &&
        matrixCell !== '0' &&
        matrixCell !== '#' &&
        matrixCell === taskCell
      ) {
        // console.log(
        //   '匹配： matrix[',
        //   matrixRow,
        //   '][',
        //   col,
        //   '] = ',
        //   matrixCell,
        //   ' 和 task[',
        //   taskRow,
        //   '][',
        //   col,
        //   ']',
        //   taskCell
        // )
        matchIndices.push([matrixRow, col])
      } else {
        break
      }
    }

    return matchIndices
  }

  // Compare each subarray of matrix with each subarray of task
  for (let i = 0; i < matrixRows; i++) {
    for (let j = 0; j < taskRows; j++) {
      for (
        let startCol = 0;
        startCol < Math.min(matrixCols, taskCols);
        startCol++
      ) {
        const matchArray = checkSubarrayMatch(i, j, startCol)

        if (matchArray.length > 0) {
          // console.log(
          //   `找到匹配项：Matrix 行 ${i}，Task 行 ${j}，从列 ${startCol} 开始，长度 ${matchArray}`
          // )
          heighLightArray.push(matchArray)
        }
      }
    }
  }
  console.log('[heigh light] HeighLightAllArray.tsx: ', heighLightArray)

  return heighLightArray
}
export default HeighLightAllArray
