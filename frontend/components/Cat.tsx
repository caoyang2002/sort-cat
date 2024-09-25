export const CatSrc = {
  A: '/images/019.jpg',
  B: '/images/02.jpg',
  C: '/images/03.jpg',
  D: '/images/04.jpg',
  E: '/images/06.jpg',
  '#': '/images/05.jpg',
  '0': '/images/014.jpg',
}

export const Cat = ['A', 'B', 'C', 'D', 'E']

export const getCatImage = (cat: string) => {
  return `${CatSrc[cat as keyof typeof CatSrc] || '/images/08.jpg'}`
}
