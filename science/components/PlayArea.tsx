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

  const calculateScore = useCallback(() => {
    let newScore = 0
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (task[j] === matrix[i][j]) {
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
      <div className="text-2xl font-bold ">Score: {score}</div>
      <div className="flex">
        {/* side bar */}
        <div className="mr-2 flex flex-col-reverse">
          {task.map((color, index) => (
            <div
              key={index}
              className={`w-8 h-8 ${
                matrix.some((row) => row[index] === color)
                  ? 'border-2 rounded '
                  : ''
              }`}
              style={{ backgroundColor: COLORS[color] }}
            />
          ))}
        </div>
        {/* play area */}
        <div className="flex">
          {matrix.map((row, rowIndex) => (
            // array
            <div key={rowIndex} className="flex flex-col-reverse">
              {row.map((color, colIndex) => (
                // cell
                <div
                  key={colIndex}
                  className="w-8 h-8 border border-gray-200 cursor-pointer "
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
