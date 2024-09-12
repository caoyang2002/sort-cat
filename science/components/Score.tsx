// 分数
import React from 'react'

function Score() {
  return (
    <div className="flex justify-center items-start p-4 bg-gray-200">
      <div className="flex flex-col items-center font-bold space-y-2">
        <h1>Target Score</h1>
        <p className="text-xl">85</p> {/* 假设的分数，您可以根据需要更改 */}
      </div>
      <div className="flex flex-col items-center font-bold space-y-2">
        <h1>Your Score</h1>
        <p className="text-xl">90</p> {/* 假设的分数，您可以根据需要更改 */}
      </div>
      <div className="flex flex-col items-center font-bold space-y-2">
        <h1>High Score</h1>
        <p className="text-xl">95</p> {/* 假设的分数，您可以根据需要更改 */}
      </div>
    </div>
  )
}

export default Score
