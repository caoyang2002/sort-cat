'use client'
import React, { useState, useCallback, useEffect } from 'react'

const COLORS = ['white', 'red', 'blue', 'green', 'yellow', 'purple', 'orange']

const ColorMatrixGame = () => {
  const [task, setTask] = useState(
    Array(13)
      .fill(0)
      .map(() => Math.floor(Math.random() * 6) + 1)
  )

  const [matrix, setMatrix] = useState(
    Array(10)
      .fill(0)
      .map(() =>
        Array(13)
          .fill(0)
          .map(() => Math.floor(Math.random() * 6) + 1)
      )
  )

  const [score, setScore] = useState(0)

  // 计算分数：使用 Task 的数组索引比较 PlayArea 的数组索引
  const calculateScore = useCallback(() => {
    let newScore = 0
    // 遍历数组，计算分数
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        // console.log(
        //   `[INFO] calcuate score: \narray: ${i}, \nelement: ${matrix[i][j]}`
        // )
        // console.log(`column: ${j}`)
        console.log(`task [${j}] color ${COLORS[task[j]]}`)

        // console.log('element:', matrix[i][j])
        if (task[i] === matrix[i][j]) {
          console.log(
            ` matrix[${i}][${j}] color:${
              COLORS[matrix[i][j]]
            } === task[${i}] color:${COLORS[task[i]]}`
          )
          newScore++
        }
      }
    }
    setScore(newScore)
  }, [task, matrix])

  useEffect(() => {
    calculateScore()
  }, [calculateScore])

  const handleCellClick = useCallback(
    (rowIndex, colIndex) => {
      console.log('matrix: ', matrix)
      const newMatrix = [...matrix]
      newMatrix[rowIndex].splice(colIndex, 0, 0)
      newMatrix[rowIndex].pop()
      setMatrix(newMatrix)
      calculateScore()
    },
    [matrix, calculateScore]
  )

  return (
    <div className="flex flex-col items-center p-4">
      {/* 分数 */}
      <div className="text-2xl font-bold mb-4">Score: {score}</div>
      {/* 左侧矩阵 */}
      <div className="flex ">
        <div className="mr-2 flex flex-col  border-8 rounded-md">
          {' '}
          {/* Reverse the left column */}
          {task.map((color, index) => (
            <div
              key={index}
              className={`w-8 h-8 mt-1 my-1${
                matrix.every((row) => row[index] === color)
                  ? 'border-2 border-black'
                  : ''
              }`}
              style={{ backgroundColor: COLORS[color] }}
            />
          ))}
        </div>
        {/* 右侧矩阵 */}
        <div className="flex border-8 rounded-md">
          {' '}
          {/* Main matrix container */}
          {matrix.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-col-reverse">
              {' '}
              {/* Each column, reversed */}
              {row.map((color, colIndex) => (
                <div
                  key={colIndex}
                  className="w-8 h-8 border cursor-pointer mx-1 my-1"
                  style={{ backgroundColor: COLORS[color] }}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ColorMatrixGame
