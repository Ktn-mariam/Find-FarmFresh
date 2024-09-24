const getParentCategoryRoute = (parentCategory?: string) => {
  let result
  switch (parentCategory) {
    case 'Fruits':
      result = 'Fruits'
      break
    case 'Vegetables':
      result = 'Vegetables'
      break
    case 'Coffee & Tea':
      result = 'Coffee&Tea'
      break
    case 'Dairy & eggs':
      result = 'Diary&Eggs'
      break
    case 'Meat':
      result = 'Meat'
      break
    case 'Honey & Bee Products':
      result = 'Honey&BeeProducts'
      break
    case 'Flowers':
      result = 'Flowers'
      break
    case 'Dried Fruits & Nuts':
      result = 'DriedFruits&Nuts'
      break
    default:
      result = 'Fruits'
      break
  }

  return result
}

export default getParentCategoryRoute
