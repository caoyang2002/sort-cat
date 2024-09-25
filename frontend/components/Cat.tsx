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

export const CatCaption = {
  A: 'Elements that need to be aligned',
  B: 'Elements that need to be aligned',
  C: 'Elements that need to be aligned',
  D: 'Elements that need to be aligned',
  E: 'Elements that need to be aligned',
  '#': 'Spaces that can be used',
  '0': 'Blank blocks',
}
