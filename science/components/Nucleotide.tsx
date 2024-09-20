// export const NUCLEOTIDE_COLORS: { [key: string]: string } = {
//   A: '#FF6347', // Red
//   G: '#32CD32', // Green
//   U: '#1E90FF', // Blue
//   C: '#FFD700', // Yellow
//   T: '#A600F5', // Purple
//   '#': '#808080', // Gray
//   // " ": "#FFFFFF", // White
// }
// export const Nucleotide = ['A', 'G', 'U', 'C', 'T']

export const NUCLEOTIDE_COLORS = {
  A: 'red-700', // Red
  G: 'green-700', // Green
  U: 'blue-700', // Blue
  C: 'yellow-700', // Yellow
  T: 'purple-700', // Purple
  '#': 'gray-300', // Gray
  '0': 'white', // White
}

export const Nucleotide = ['A', 'G', 'U', 'C', 'T']

export const getClassName = (cell) => {
  return `${NUCLEOTIDE_COLORS[cell]}`
}
