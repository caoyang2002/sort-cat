'use client'
import { useCallback, useState, useEffect } from 'react'
import Matrix from '@/components/tool/PlayMatrix'
import TaskMatrix from '@/components/tool/TaskMatrix'
import {
  getBackgroundColor,
  getCellBackgroundColor,
} from './CellBackgroundColor'
import CellMatrix from '@/components/tool/CellMatrix'
import Score from '@/components/tool/Score'
// import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design'
// import '@aptos-labs/wallet-adapter-ant-design/dist/index.css'
import updateArray from '@/components/tool/DeleteHash'
import Image from 'next/image'
import { getCatImage } from '@/components/Cat'
import HeighLightAllArray from './tool/HeighLightAllArray'

const SPACE_AMOUNT = 12
const taskMatrix = TaskMatrix(1, 12)

type MatrixType = string[][]
type CellMatrixType = string[][]
type ScoreType = number
type HeighLightType = [number, number][][]
type CellArray = [number, number][]

const PlayMatrixArea = () => {
  const [score, setScore] = useState<ScoreType>(0)
  const [heighLight, setHeighLiht] = useState<HeighLightType>([])
  const [matrix, setMatrix] = useState<MatrixType>([])
  const [cellMatrix, setCellMatrix] = useState<CellMatrixType>([])
  const [isClient, setIsClient] = useState(false)
  const [originalMatrix, setOriginalMatrix] = useState<MatrixType>([])
  const [cellArray, setCellArray] = useState<CellArray>([])
  // 首次加载 UI
  useEffect(() => {
    setIsClient(true)
    const initialMatrix = Matrix(10, 12, 10, 7) as MatrixType
    setMatrix(initialMatrix)

    const initialCellMatrix = CellMatrix(1, SPACE_AMOUNT) as CellMatrixType
    setCellMatrix(initialCellMatrix)
    // const initialScore = Score(matrix, taskMatrix) as ScoreType
    // setScore(initialScore)
    setOriginalMatrix(initialMatrix.map((row) => [...row]))
  }, [])

  // 积分高亮
  useEffect(() => {
    if (matrix && taskMatrix) {
      const calculatedScore = Score(matrix, taskMatrix)
      setScore(calculatedScore)
      const heighLightArray = HeighLightAllArray(matrix, taskMatrix)
      console.log('test: ', heighLightArray)
      setHeighLiht(heighLightArray)
      setBackgroundColor(heighLightArray)
    }
  }, [matrix, taskMatrix])

  // 设置背景颜色
  useEffect(() => {
    if (cellArray) {
      console.log(cellArray)
    }
  })
  // 设置背景颜色
  function setBackgroundColor(heighLightCellArray: [number, number][][]) {
    // console.log('[BG color]', heighLightCellArray)
    // const cellArray: [number, number][] = []
    // console.log('[BG color]', heighLightCellArray)
    heighLightCellArray.forEach((cell, cellIndex) => {
      // console.log('cell: ', cell, 'cell index', cellIndex)
      cell.forEach((singleCell, singleCellIndex) => {
        // console.log(
        //   'single cell: ',
        //   singleCell,
        //   'single cell index',
        //   singleCellIndex
        // )
        cellArray.push(singleCell) // This now works
      })

      // 获取到每一个高亮 cell 的具体位置
      // console.log('matrix cell: ', matrix[cell[0][0]][cell[0][1]])
    })
    // console.log('should light cell array: ', cellArray)
    cellArray.map((cell, cellIndex) => {
      // console.log('high light: ', cell[0], '-', cell[1])
      const hlCellElement = document.getElementById(
        `${cell[0]}-${cell[1]}`
      ) as HTMLElement
      if (!hlCellElement) {
        console.error('Matrix table not found')
        return
      }
      // console.log(
      //   'cell color: ',
      //   getCellBackgroundColor(matrix[cell[0]][cell[1]])
      // )
      hlCellElement.classList.remove(
        'bg-opacity-30',
        'backdrop-blur-md',
        'block'
      )

      hlCellElement.classList.add(
        `${getCellBackgroundColor(matrix[cell[0]][cell[1]])}`
      )
      hlCellElement.classList.add('transition', 'duration-300')
    })
  }

  const calculateAndUpdateScore = useCallback(() => {
    console.log('[INFO] PlayMatrixArea: 开始计算和更新分数')
    const result = Score(matrix, taskMatrix)
    setScore(result)
    console.log('[INFO] PlayMatrixArea: 分数: ', result)
  }, [matrix, score])

  // 处理点击位置
  const handleCellMatrixClick = useCallback(
    (rowIndex: number, colIndex: number) => {
      console.log(
        '[HANDLE] PlayMatrixArea: ####################### 开始处理点击位置 #######################'
      )
      console.log('[INFO] PlayMatrixArea: 点击位置：', rowIndex, '-', colIndex)

      const currentMatrix = matrix.map((row) => [...row])
      const clickedCellMatrix = currentMatrix[rowIndex][colIndex]

      if (clickedCellMatrix === '0') {
        console.log('[INFO] 点击的位置是 0，不执行任何操作')
        return
      }

      let updatedMatrix
      // let updatedCellMatrix

      if (clickedCellMatrix === '#') {
        console.log('[INFO] PlayMatrixArea: 点击的位置是 #，执行删除 # 的操作')
        updatedMatrix = deleteHash(
          currentMatrix,
          originalMatrix,
          rowIndex,
          colIndex
        )
        console.log(
          '[INFO] PlayMatrixArea: 删除后的矩阵',
          updatedMatrix[rowIndex]
        )
      } else {
        console.log(
          '[INFO] PlayMatrixArea: 点击的位置是 CellMatrix，执行添加 # 的操作'
        )
        const matrixSpace = countHashes(currentMatrix)

        if (matrixSpace < SPACE_AMOUNT) {
          console.log('[INFO] PlayMatrixArea: 有可用的 #')
          updatedMatrix = addHash(currentMatrix, rowIndex, colIndex)
        } else {
          console.log('[INFO] PlayMatrixArea: 没有可用的 # 了')
          alert('没有可用的 # 了')
          return
        }
      }

      const updatedMatrixSpace = countHashes(updatedMatrix)
      const remainingSpace = SPACE_AMOUNT - updatedMatrixSpace
      const updatedCellMatrix = CellMatrix(1, remainingSpace)

      setMatrix(updatedMatrix)
      setCellMatrix(updatedCellMatrix)
      calculateAndUpdateScore()

      console.log('[INFO] PlayMatrixArea: 更新后的矩阵：', updatedMatrix)
      console.log(
        '[INFO] PlayMatrixArea: 更新后的 CellMatrix：',
        updatedCellMatrix
      )
    },
    [matrix, calculateAndUpdateScore]
  )

  // Helper functions
  const countHashes = (matrix: MatrixType) => {
    return matrix.reduce(
      (count, row) =>
        count + row.filter((cellMatrix) => cellMatrix === '#').length,
      0
    )
  }

  // 删除
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
      !originalMatrix[rowIndex][colIndex]
    ) {
      console.error('Invalid matrix or row index in deleteHash')
      return matrix
    }
    // 算法
    const updatedMatrix = matrix.map((row) => [...row])
    updatedMatrix[rowIndex] = updateArray(
      originalMatrix[rowIndex],
      updatedMatrix[rowIndex],
      colIndex
    )
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
      {/* <Wallet /> */}
      <header>
        <p className="font-bold flex items-center justify-center">
          score: {JSON.stringify(score)}
        </p>
      </header>

      <main className="flex justify-between">
        {/* taskMatrix */}
        <div>
          {/* <h1>TaskMatrix</h1> */}
          <div className="flex mx-8">
            {taskMatrix.map((row, rowIndex) => (
              <div key={rowIndex} className="px-2">
                {/* <div>
                  <span>{rowIndex}</span>
                </div> */}
                {row
                  .slice()
                  .reverse()
                  .map((cellMatrix, cellMatrixIndex) => (
                    <div
                      key={`${rowIndex}-${cellMatrixIndex}`}
                      className={`w-12 h-12 mx-1 my-1 rounded my-1 flex justify-center backdrop-blur-md block ${getCellBackgroundColor(
                        cellMatrix
                      )}`}
                    >
                      <Image
                        src={getCatImage(cellMatrix)}
                        alt={cellMatrix}
                        width={48}
                        height={48}
                      />
                      {/* <p className="mt-1">{cellMatrix}</p> */}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
        {/* playMatrix */}
        <div>
          {/* <h1>PlayMatrix</h1> */}
          <div className="flex">
            {matrix.map((row, rowIndex) => (
              <div key={rowIndex} className="">
                {/* <div>
                  <span>{rowIndex}</span>
                </div> */}
                {row
                  .slice()
                  .reverse()
                  .map((cellMatrix, reversedColIndex) => {
                    const colIndex = row.length - 1 - reversedColIndex
                    return (
                      <div
                        id={`${rowIndex}-${colIndex}`}
                        key={`${rowIndex}-${colIndex}`}
                        className={`w-12 h-12 mx-1 my-1 rounded my-1 flex justify-center bg-opacity-30 backdrop-blur-md block`}
                        onClick={() =>
                          handleCellMatrixClick(rowIndex, colIndex)
                        }
                      >
                        <Image
                          src={getCatImage(cellMatrix)}
                          alt={cellMatrix}
                          width={48}
                          height={48}
                        />
                        {/* <p className="mt-1">{cellMatrix}</p> */}
                      </div>
                    )
                  })}
              </div>
            ))}
          </div>
        </div>
        {/* cellMatrix */}
        <div>
          {/* <h1>CellMatrix</h1> */}
          <div className="flex mx-8">
            {cellMatrix.map((row, rowIndex) => (
              <div key={rowIndex} className="px-2">
                {/* <div>
                  <span>{rowIndex}</span>
                </div> */}
                {row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`w-12 h-12 mx-1 my-1  rounded my-1 flex justify-center ${getCellBackgroundColor(
                      cell
                    )}`}
                  >
                    <div className="relative w-12 h-12">
                      <Image
                        src={getCatImage(cell)}
                        alt={cell}
                        fill
                        sizes="(max-width: 32px) 10vw, (max-width: 32px) 5vw, 3vw"
                        style={{
                          objectFit: 'cover',
                        }}
                      />
                    </div>

                    {/* <p className="mt-1">{cellMatrix}</p> */}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer>
        <p className="flex items-center justify-center">Power by CaoYang2002</p>
      </footer>
    </>
  )
}

export default PlayMatrixArea
