'use client'
import { useCallback, useState, useEffect } from 'react'
import Matrix from '@/components/tool/Matrix'
import Task from '@/components/tool/Task'
import { getClassName } from './Nucleotide'
import Cell from '@/components/tool/Cell'
import Score from '@/components/tool/Score'

const SPACE_AMOUNT = 12
const task = Task(1, 12)

type MatrixType = string[][]
type CellType = string[][]
type ScoreType = number

const PlayArea = () => {
  const [score, setScore] = useState<ScoreType>(0)
  const [matrix, setMatrix] = useState<MatrixType>([])
  const [cell, setCell] = useState<CellType>([])
  const [isClient, setIsClient] = useState(false)
  const [originalMatrix, setOriginalMatrix] = useState<MatrixType>([])

  useEffect(() => {
    setIsClient(true)
    const initialMatrix = Matrix(10, 12, 9, 4) as MatrixType
    setMatrix(initialMatrix)

    const initialCell = Cell(1, SPACE_AMOUNT) as CellType
    setCell(initialCell)
    // const initialScore = Score(matrix, task) as ScoreType
    // setScore(initialScore)
    setMatrix(initialMatrix)
    setOriginalMatrix(initialMatrix.map((row) => [...row]))
  }, [])
  useEffect(() => {
    if (matrix && task) {
      const calculatedScore = Score(matrix, task)
      setScore(calculatedScore)
    }
  }, [matrix, task])

  const calculateAndUpdateScore = useCallback(() => {
    console.log('[INFO] PlayArea: 开始计算和更新分数')
    const result = Score(matrix, task)
    setScore(result)
    console.log('[INFO] PlayArea: 分数: ', result)
  }, [matrix, score])

  // 处理点击位置
  const handleCellClick = useCallback(
    (rowIndex: number, colIndex: number) => {
      console.log(
        '[HANDLE] PlayArea: ####################### 开始处理点击位置 #######################'
      )
      console.log('[INFO] PlayArea: 点击位置：', rowIndex, '-', colIndex)

      const currentMatrix = matrix.map((row) => [...row])
      const clickedCell = currentMatrix[rowIndex][colIndex]

      if (clickedCell === '0') {
        console.log('[INFO] 点击的位置是 0，不执行任何操作')
        return
      }

      let updatedMatrix
      // let updatedCell

      if (clickedCell === '#') {
        console.log('[INFO] PlayArea: 点击的位置是 #，执行删除 # 的操作')
        updatedMatrix = deleteHash(
          currentMatrix,
          originalMatrix,
          rowIndex,
          colIndex
        )
        console.log('[INFO] PlayArea: 删除后的矩阵', updatedMatrix[rowIndex])
      } else {
        console.log('[INFO] PlayArea: 点击的位置是 Cell，执行添加 # 的操作')
        const matrixSpace = countHashes(currentMatrix)

        if (matrixSpace < SPACE_AMOUNT) {
          console.log('[INFO] PlayArea: 有可用的 #')
          updatedMatrix = addHash(currentMatrix, rowIndex, colIndex)
        } else {
          console.log('[INFO] PlayArea: 没有可用的 # 了')
          alert('没有可用的 # 了')
          return
        }
      }

      const updatedMatrixSpace = countHashes(updatedMatrix)
      const remainingSpace = SPACE_AMOUNT - updatedMatrixSpace
      const updatedCell = Cell(1, remainingSpace)

      setMatrix(updatedMatrix)
      setCell(updatedCell)
      calculateAndUpdateScore()

      console.log('[INFO] PlayArea: 更新后的矩阵：', updatedMatrix)
      console.log('[INFO] PlayArea: 更新后的 Cell：', updatedCell)
    },
    [matrix, calculateAndUpdateScore]
  )

  // Helper functions
  const countHashes = (matrix: MatrixType) => {
    return matrix.reduce(
      (count, row) => count + row.filter((cell) => cell === '#').length,
      0
    )
  }

  const deleteHash = (
    matrix: MatrixType,
    originalMatrix: MatrixType,
    rowIndex: number,
    colIndex: number
  ): MatrixType => {
    if (
      !matrix ||
      !originalMatrix ||
      !matrix[rowIndex] ||
      !originalMatrix[rowIndex]
    ) {
      console.error('Invalid matrix or row index in deleteHash')
      return matrix
    }

    const updatedMatrix = matrix.map((row) => [...row])
    const updatedRow = updatedMatrix[rowIndex]
    const originalRow = originalMatrix[rowIndex]

    console.log('[INFO] PlayArea: 当前的数组：', updatedRow)
    console.log('[INFO] PlayArea: 原始的数组：', originalRow)

    // 删除用户点击的位置的元素，并将数组左移
    updatedRow.splice(colIndex, 1)

    // 如果最后一个元素是 0，则补零
    while (
      updatedRow.length < SPACE_AMOUNT &&
      updatedRow[updatedRow.length - 1] === '0'
    ) {
      console.log('[INFO] PlayArea: 补零')
      updatedRow.push('0')
      break
    }

    let originalIndexLast = SPACE_AMOUNT - 1
    const updatedIndexLast = updatedRow.length - 1
    // 如果最后一个元素不是 0，则找到最后一个匹配的位置，并将其  updatedRow.push()
    while (
      updatedRow.length < SPACE_AMOUNT &&
      updatedRow[updatedRow.length - 1] !== '0'
    ) {
      console.log(
        '[INFO] PlayArea: ',
        originalIndexLast,
        ' ? ',
        updatedIndexLast,
        '---',
        updatedRow[updatedIndexLast],
        ' ? ',
        originalRow[originalIndexLast]
      )
      if (updatedRow[updatedIndexLast] === originalRow[originalIndexLast]) {
        console.log(
          '[INFO] PlayArea: 找到原始数组中最后一个匹配的位置：',
          originalIndexLast,
          ' -- ',
          updatedRow[updatedIndexLast],
          '==',
          originalRow[originalIndexLast]
        )
        // 检查前面一个是否匹配,如果匹配，则将 originalRow[originalIndexLast] 添加到 updatedRow 中，如果不匹配，
        if (
          updatedRow[updatedIndexLast - 1] ===
          originalRow[originalIndexLast - 1]
        ) {
          console.log('[INFO] PlayArea: 前面一个匹配')
          updatedRow.push(originalRow[originalIndexLast + 1])
          break
        } else {
          console.log('[INFO] PlayArea: 前面一个不匹配')
          // updatedRow.push(originalRow[originalIndexLast + 1])
        }
        // updatedRow.push(originalRow[originalIndexLast + 1])
        // break
      }
      originalIndexLast--
    }
    // 找到第一个不匹配的位置
    // while (
    //   // 当前的数组长度小于 12
    //   updatedIndex < updatedRow.length
    // ) {
    //   if (updatedRow[updatedIndex] !== originalRow[originalIndex]) {
    //     console.log(
    //       '[INFO] PlayArea: 找到第一个不匹配的位置：',
    //       updatedIndex,
    //       ' -- ',
    //       updatedRow[updatedIndex],
    //       '!=',
    //       originalRow[originalIndex]
    //     )
    //     break
    //   }
    //   updatedIndex++
    //   originalIndex++
    // }

    // 跳过被删除的元素
    // originalIndex++

    // 从不匹配的位置开始，用 originalRow 的元素填充 updatedRow
    // while (
    //   updatedRow.length < SPACE_AMOUNT &&
    //   originalIndex < originalRow.length
    // ) {
    //   updatedRow.push(originalRow[originalIndex])
    //   originalIndex++
    // }

    return updatedMatrix
  }

  const addHash = (matrix: MatrixType, rowIndex: number, colIndex: number) => {
    const updatedMatrix = matrix.map((row) => [...row])
    for (let i = updatedMatrix[rowIndex].length - 1; i > colIndex; i--) {
      updatedMatrix[rowIndex][i] = updatedMatrix[rowIndex][i - 1]
    }
    updatedMatrix[rowIndex][colIndex] = '#'
    return updatedMatrix
  }

  if (!isClient) {
    return null // or a loading indicator
  }

  return (
    <>
      <header>
        <p className="font-bold flex items-center justify-center">
          score: {JSON.stringify(score)}
        </p>
      </header>

      <main className="flex justify-between">
        {/* task */}
        <div>
          <h1>Task</h1>
          <div className="flex">
            {task.map((row, rowIndex) => (
              <div key={rowIndex} className="">
                <div>
                  <span>{rowIndex}</span>
                </div>
                {row
                  .slice()
                  .reverse()
                  .map((cell, cellIndex) => (
                    <div
                      key={`${rowIndex}-${cellIndex}`}
                      className={`w-8 h-8 mx-1 my-1 border rounded my-1 flex justify-center bg-${getClassName(
                        cell
                      )}`}
                    >
                      <p className="mt-1">{cell}</p>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
        {/* play */}
        <div>
          <h1>Play</h1>
          <div className="flex">
            {matrix.map((row, rowIndex) => (
              <div key={rowIndex} className="">
                <div>
                  <span>{rowIndex}</span>
                </div>
                {row
                  .slice()
                  .reverse()
                  .map((cell, reversedColIndex) => {
                    const colIndex = row.length - 1 - reversedColIndex
                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`w-8 h-8 mx-1 my-1 border rounded my-1 flex justify-center bg-${getClassName(
                          cell
                        )}`}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                      >
                        <p className="mt-1">{cell}</p>
                      </div>
                    )
                  })}
              </div>
            ))}
          </div>
        </div>
        {/* cell */}
        <div>
          <h1>Cell</h1>
          <div className="flex">
            {cell.map((row, rowIndex) => (
              <div key={rowIndex} className="">
                <div>
                  <span>{rowIndex}</span>
                </div>
                {row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`w-8 h-8 mx-1 my-1 border rounded my-1 flex justify-center bg-${getClassName(
                      cell
                    )}`}
                  >
                    <p className="mt-1">{cell}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer>
        <p className="flex items-center justify-center">Thanks</p>
        <div className="w-8 h-8 mx-1 my-1 border rounded my-1 flex justify-center bg-red-700"></div>
        <div className="w-8 h-8 mx-1 my-1 border rounded my-1 flex justify-center bg-green-700"></div>
        <div className="w-8 h-8 mx-1 my-1 border rounded my-1 flex justify-center bg-blue-700"></div>
        <div className="w-8 h-8 mx-1 my-1 border rounded my-1 flex justify-center bg-yellow-700"></div>
        <div className="w-8 h-8 mx-1 my-1 border rounded my-1 flex justify-center bg-purple-700"></div>
        <div className="w-8 h-8 mx-1 my-1 border rounded my-1 flex justify-center bg-gray-300"></div>
        <div className="w-8 h-8 mx-1 my-1 border rounded my-1 flex justify-center bg-white"></div>
      </footer>
    </>
  )
}

export default PlayArea
