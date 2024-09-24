const getChildCategories = (category: string) => {
  let childCategories
  switch (category) {
    case 'Fruits':
      childCategories = [
        'Bananas',
        'Oranges',
        'Apples',
        'Mangoes',
        'Pinapples',
        'Strawberries',
      ]
      break
    case 'Vegetables':
      childCategories = [
        'Potatoes',
        'Onions',
        'Tomatoes',
        'Brinjals',
        'Cauliflower',
        'Spinach',
        'Carrots',
      ]
      break
    case 'Coffee&Tea':
    case 'Coffee & Tea':
      childCategories = ['Tea', 'Coffee']
      break
    case 'Diary&Eggs':
    case 'Dairy & eggs':
      childCategories = ['Milk', 'Butter', 'Cheese', 'Eggs']
      break
    case 'Meat':
      childCategories = ['Goat', 'Sheep', 'Chicken', 'Fish']
      break
    case 'Honey&BeeProducts':
    case 'Honey & Bee Products':
      childCategories = ['Honey', 'Beewax', 'Pollen']
      break
    case 'Flowers':
      childCategories = [
        'Rose',
        'Orchids',
        'Sunflowers',
        'Lillies',
        'Tulips',
        'Dahlia',
      ]
      break
    case 'DriedFruits&Nuts':
    case 'Dried Fruits & Nuts':
      childCategories = ['Pistachios', 'Apricot', 'Dates', 'Cashew', 'Almonds']
      break
    default:
      childCategories = [
        'Bananas',
        'Oranges',
        'Apples',
        'Mangoes',
        'Pinapples',
        'Strawberries',
      ]
      break
  }

  return childCategories
}

export default getChildCategories
