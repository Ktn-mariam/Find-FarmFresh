const getCategory = (parentCategory: string) => {
  let result
  switch (parentCategory) {
    case 'fruits':
      result = 'Fruits'
      break
    case 'vegetables':
      result = 'Vegetables'
      break
    case 'coffe&tea':
      result = 'Coffee & Tea'
      break
    case 'diary&eggs':
      result = 'Dairy & eggs'
      break
    case 'meat':
      result = 'Meat'
      break
    case 'honey':
      result = 'Honey & Bee Products'
      break
    case 'flowers':
      result = 'Flowers'
      break
    case 'driedfruits':
      result = 'Dried Fruits & Nuts'
      break
    default:
      result = 'Fruits'
      break
  }

  return result
}

export default getCategory
