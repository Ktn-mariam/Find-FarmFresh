const getChildCategories = (category: string) => {
  let childCategories
  switch (category) {
    case 'fruits':
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
    case 'vegetables':
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
    case 'coffee&tea':
    case 'Coffee & Tea':
      childCategories = ['Tea', 'Coffee']
      break
    case 'diary&eggs':
    case 'Dairy & eggs':
      childCategories = ['Milk', 'Butter', 'Cheese', 'Eggs']
      break
    case 'meat':
    case 'Meat':
      childCategories = ['Goat', 'Sheep', 'Chicken']
      break
    case 'honey':
    case 'Honey & Bee Products':
      childCategories = ['Honey', 'Beewax', 'Pollen']
      break
    case 'flowers':
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
    case 'driedFruits':
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
