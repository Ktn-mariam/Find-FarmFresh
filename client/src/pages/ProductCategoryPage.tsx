import React from 'react'
import Product from '../components/Product'
import StoreNavbar from '../components/StoreNavbar'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'

const ProductCategoryPage = () => {
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
    <div>
      <StoreNavbar />
      <div className="md:px-36 px-14 flex">
        <div className="w-64 py-14 font-workSans">
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
              <div className="flex pb-2 items-center">
                <input title="4" type="radio" />
                <div className="flex items-center pl-1">
                  <StarOutlinedIcon style={{ fontSize: '16px' }} />
                  <StarOutlinedIcon style={{ fontSize: '16px' }} />
                  <StarOutlinedIcon style={{ fontSize: '16px' }} />
                  <StarOutlinedIcon style={{ fontSize: '16px' }} />
                  <StarBorderOutlinedIcon style={{ fontSize: '16px' }} />
                </div>
                <p className="text-md pl-1">& up</p>
              </div>
              <div className="flex pb-2 items-center">
                <input title="4" type="radio" />
                <div className="flex items-center pl-1">
                  <StarOutlinedIcon style={{ fontSize: '16px' }} />
                  <StarOutlinedIcon style={{ fontSize: '16px' }} />
                  <StarOutlinedIcon style={{ fontSize: '16px' }} />
                  <StarBorderOutlinedIcon style={{ fontSize: '16px' }} />
                  <StarBorderOutlinedIcon style={{ fontSize: '16px' }} />
                </div>
                <p className="text-md pl-1">& up</p>
              </div>
              <div className="flex pb-2 items-center">
                <input title="4" type="radio" />
                <div className="flex items-center pl-1">
                  <StarOutlinedIcon style={{ fontSize: '16px' }} />
                  <StarOutlinedIcon style={{ fontSize: '16px' }} />
                  <StarBorderOutlinedIcon style={{ fontSize: '16px' }} />
                  <StarBorderOutlinedIcon style={{ fontSize: '16px' }} />
                  <StarBorderOutlinedIcon style={{ fontSize: '16px' }} />
                </div>
                <p className="text-md pl-1">& up</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid justify-center grid-cols-3 pl-10 py-10 gap-x-3 gap-y-4">
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
  )
}

export default ProductCategoryPage
