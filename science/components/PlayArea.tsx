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
  const [highlightedColumns, setHighlightedColumns] = useState([])

  const calculateScore = useCallback(() => {
    let newScore = 0
    const newHighlightedColumns = []

    for (let j = 0; j < task.length; j++) {
      let columnMatch = false
      for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][j] === task[j]) {
          newScore++
          columnMatch = true
          break
        }
      }
      if (columnMatch) {
        newHighlightedColumns.push(j)
      }
    }

    setScore(newScore)
    setHighlightedColumns(newHighlightedColumns)
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
      <div className="text-2xl font-bold mb-4">Score: {score}</div>
      <div className="flex">
        {/* side bar */}
        <div className="mr-2 flex flex-col-reverse">
          {task.map((color, index) => (
            <div
              key={index}
              className={`w-8 h-8 ${
                highlightedColumns.includes(index)
                  ? 'border-2 border-black rounded'
                  : 'rounded'
              } my-1`}
              style={{ backgroundColor: COLORS[color] }}
            />
          ))}
        </div>
        {/* play area */}
        <div className="flex">
          {matrix.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-col-reverse">
              {row.map((color, colIndex) => (
                <div
                  key={colIndex}
                  className={`w-8 h-8 rounded cursor-pointer my-1 mx-1 ${
                    highlightedColumns.includes(colIndex)
                      ? 'border-2 border-black'
                      : ''
                  }`}
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
