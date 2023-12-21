const getChildCategories = (category: string) => {
  let childCategories
  switch (category) {
    case 'fruits':
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
      childCategories = ['Tea', 'Coffee']
      break
    case 'diary&eggs':
      childCategories = ['Milk', 'Butter', 'Cheese', 'Eggs']
      break
    case 'meat':
      childCategories = ['Goat', 'Sheep', 'Chicken']
      break
    case 'honey':
      childCategories = ['Honey', 'Beewax', 'Pollen']
      break
    case 'flowers':
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
