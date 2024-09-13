"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  calculateScore,
  generateRandomBoard,
  generateRandomTarget,
  matchBoard,
} from "./tool/logic";
import { BASE_COLORS } from "@/model/base";

const ROWS = 10;
const COLS = 13;

const ColorMatrixGame = () => {
  const [targets, setTargets] = useState<string[]>([]);
  const [board, setBoard] = useState<string[][]>([]);
  const [score, setScore] = useState(0);
  const [matchResult, setMatchResult] = useState<number[][]>(
    Array(ROWS).fill(Array(COLS).fill(0))
  );

  // 初始化随机 targets 和 board
  useEffect(() => {
    setTargets([generateRandomTarget(ROWS)]);
    setBoard(generateRandomBoard(ROWS, COLS));
  }, []);

  const calculateAndUpdateScore = useCallback(() => {
    const result = matchBoard(board, targets);
    setMatchResult(result);
    setScore(calculateScore(result));
  }, [board, targets]);

  useEffect(() => {
    if (board.length > 0 && targets.length > 0) {
      calculateAndUpdateScore();
    }
  }, [calculateAndUpdateScore, board, targets]);

  const handleCellClick = useCallback(
    (rowIndex: number, colIndex: number) => {
      const newBoard = board.map((row) => [...row]);
      for (let i = 0; i < rowIndex; i++) {
        newBoard[i][colIndex] = newBoard[i + 1][colIndex];
      }
      newBoard[rowIndex][colIndex] = "#";
      setBoard(newBoard);
      calculateAndUpdateScore();
    },
    [board, calculateAndUpdateScore]
  );

  return (
    <div className="flex flex-col items-center p-4">
      <div className="text-2xl font-bold mb-4">Score: {score}</div>
      <div className="flex">
        {/* Targets side bar */}
        <div className="mr-4 flex flex-col">
          {board.map((_, rowIndex) => (
            <div
              key={`target-${rowIndex}`}
              className="w-8 h-8 border rounded my-1 flex items-center justify-center bg-gray-200"
              style={{ backgroundColor: BASE_COLORS[targets[0][rowIndex]] }}
            >
              {targets[0][rowIndex]}
            </div>
          ))}
        </div>
        {/* Board play area */}
        <div className="flex flex-col">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
              {row.map((char, colIndex) => (
                <div
                  key={colIndex}
                  className={`w-8 h-8 rounded cursor-pointer my-1 mx-1 flex items-center justify-center ${
                    matchResult[rowIndex][colIndex]
                      ? "border-2 border-black"
                      : "border border-gray-300"
                  }`}
                  style={{ backgroundColor: BASE_COLORS[char] }}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {char !== " " ? char : ""}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorMatrixGame;
