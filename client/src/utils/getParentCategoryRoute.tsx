const getParentCategoryRoute = (parentCategory?: string) => {
  let result
  switch (parentCategory) {
    case 'Fruits':
      result = 'fruits'
      break
    case 'Vegetables':
      result = 'vegetables'
      break
    case 'Coffee & Tea':
      result = 'coffee&tea'
      break
    case 'Dairy & eggs':
      result = 'diary&eggs'
      break
    case 'Meat':
      result = 'meat'
      break
    case 'Honey & Bee Products':
      result = 'honey'
      break
    case 'Flowers':
      result = 'flowers'
      break
    case 'Dried Fruits & Nuts':
      result = 'driedFruits'
      break
    default:
      result = 'fruits'
      break
  }

  return result
}

export default getParentCategoryRoute
