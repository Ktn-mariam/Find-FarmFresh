import React from 'react'
import { useParams } from 'react-router-dom'
import Product from '../components/Product'
import StoreNavbar from '../components/StoreNavbar'
import Rating from '@mui/material/Rating'

const ProductCategoryPage = () => {
  const { category } = useParams()
  const categories = [
    'Apple',
    'Banana',
    'Apricot',
    'Avocados',
    'Blueberry',
    'Blackcurrant',
    'Cranberry',
    'Cantaloupe',
    'Cherry',
    'Dragonfruit',
    'Dates',
    'Cherimoya',
  ]
  return (
    <div className="mb-20">
      <StoreNavbar />
      <div className="md:px-36 px-14 flex">
        <div className="w-40 md:w-64 py-14 font-workSans">
          <h1 className="text-xl font-bold">Filters</h1>
          <h3 className="text-sm pt-4 pb-1 border-b border-solid border-gray-200 border-1 font-bold">
            Category
          </h3>
          <div className="py-2">
            {categories.map((category) => {
              return (
                <div className="flex pb-2 text-sm items-center">
                  <input
                    title={category}
                    type="radio"
                    name={category}
                    id={category}
                  />
                  <label className="pl-1" htmlFor={category}>
                    {category}
                  </label>
                </div>
              )
            })}
          </div>
          <div>
            <h3 className="text-sm pt-4 pb-1 border-b border-solid border-gray-200 border-1 font-bold">
              Customer reviews
            </h3>
            <div className="py-2">
              <div className="flex pb-2 items-center gap-1">
                <input className="pt-1" title="4" type="radio" />
                <Rating
                  defaultValue={3.5}
                  precision={0.5}
                  size="small"
                  readOnly
                />
                <p className="text-md">& up</p>
              </div>
              <div className="flex pb-2 items-center gap-1">
                <input className="pt-1" title="4" type="radio" />
                <Rating
                  defaultValue={3.5}
                  precision={0.5}
                  size="small"
                  readOnly
                />
                <p className="text-md">& up</p>
              </div>
            </div>
          </div>
        </div>
        <div className="py-6">
          <div className="pl-14 font-workSans">
            <h1 className="text-xl font-bold">Results</h1>
          </div>
          <div className="grid grid-cols-1 justify-center sm:grid-cols-2 md:grid-cols-3 pl-10 gap-x-4 gap-y-1">
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCategoryPage
