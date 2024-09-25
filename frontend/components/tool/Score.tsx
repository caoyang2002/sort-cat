// import Matrix from './Matrix'

function Score(
  matrix: string[][] | undefined,
  task: string[][] | undefined
): number {
  if (!matrix || !task || matrix.length === 0 || task.length === 0) {
    // console.log('Score: Invalid input. Returning 0.')
    return 0
  }

  // console.log('score:', matrix, '-', task)
  const matrixRows = matrix.length
  const matrixCols = matrix[0].length
  // console.log('matrix 行', matrixRows, matrixCols)
  const taskRows = task.length
  const taskCols = task[0].length
  // console.log('task 行', taskRows, taskCols)

  let score = 0

  // Function to check if subarrays match starting from a given column
  function checkSubarrayMatch(
    matrixRow: number,
    taskRow: number,
    startCol: number
  ): number {
    let matchLength = 0
    for (let col = startCol; col < Math.min(matrixCols, taskCols); col++) {
      if (
        matrix?.[matrixRow]?.[col] !== '0' &&
        matrix?.[matrixRow]?.[col] !== '#' &&
        matrix?.[matrixRow]?.[col] === task?.[taskRow]?.[col]
      ) {
        matchLength++
      } else {
        break
      }
    }
    return matchLength
  }

  // Compare each subarray of matrix with each subarray of task
  for (let i = 0; i < matrixRows; i++) {
    for (let j = 0; j < taskRows; j++) {
      for (
        let startCol = 0;
        startCol < Math.min(matrixCols, taskCols);
        startCol++
      ) {
        const matchLength = checkSubarrayMatch(i, j, startCol)
        if (matchLength > 0) {
          // console.log(
          //   `Match found: matrix row ${i}, task row ${j}, starting at column ${startCol}, length ${matchLength}`
          // )
          score += matchLength
        }
      }
    }
  }

  return score
}

export default Score
