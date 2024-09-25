import HeighLightAllArray from './tool/HeighLightAllArray'
export const CELL_BACKGROUND_COLOR = {
  A: 'bg-red-700', // Red
  B: 'bg-green-500', // Green
  C: 'bg-blue-700', // Blue
  D: 'bg-yellow-300', // Yellow
  E: 'bg-purple-500', // Purple
  '#': 'bg-gray-300', // Gray
  '0': 'bg-white', // White
}

export const Nucleotide = ['A', 'B', 'C', 'D', 'E']

export const getBackgroundColor = (
  playMatrix: string[][],
  taskMatrix: string[][]
) => {
  console.log('========== CellBackgroundColor.tsx ==========')
  console.log(
    '--------------------------\nplay matrix: ',
    playMatrix,
    'task matrix: ',
    taskMatrix
  )

  const heighLightArray = HeighLightAllArray(playMatrix, taskMatrix)
  console.log('-------- high light array ----------\n', heighLightArray)

  return 'bg-opacity-30'
}

export const getCellBackgroundColor = (cell: string) => {
  // console.log('[INFO] Nucleotide.tsx: ', cell)

  if (cell === '#') {
    return 'bg-opacity-30'
  }
  // 如果是0，背景是透明的
  if (cell === '0') {
    return 'bg-opacity-30'
  }
  if (cell !== '0' && cell !== '#') {
    return `${
      CELL_BACKGROUND_COLOR[cell as keyof typeof CELL_BACKGROUND_COLOR] || ''
    }`
  }
}
