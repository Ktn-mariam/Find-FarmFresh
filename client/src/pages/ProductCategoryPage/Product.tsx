import { NavLink } from 'react-router-dom'
import Rating from '@mui/material/Rating'
import { ProductType } from '../../types/Product'
import getParentCategoryRoute from '../../utils/getParentCategoryRoute'

interface ProductPropType {
  product: ProductType
}

const Product: React.FC<ProductPropType> = ({ product }) => {
  const parentCategoryRoute = getParentCategoryRoute(product.parentCategory)

  return (
    <NavLink
      to={`/store/${parentCategoryRoute}/${product.category}/${product._id}`}
    >
      <div className="w-48 md:w-72">
        <div className="px-2 py-4 flex flex-col items-center rounded-md font-workSans hover:cursor-pointer">
          {/* 4:5 ratio */}
          <div className="w-40 h-40 md:w-64 md:h-64 mb-3 flex items-center justify-center overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src={`http://localhost:5000/uploads/${product.images[0]}`}
              alt=""
            />
          </div>
          <div>
            <h4 className="truncate w-40 md:w-64 text-md md:text-lg">
              {product.title}
            </h4>
            <NavLink to={`/farmer-profile/${product.farmerID}`}>
              <h6 className="text-sm hover:underline">{product.farmerName}</h6>
            </NavLink>
            <div className="flex justify-between">
              <div className="flex">
                <p className="text-xs md:text-sm py-0.5 pr-1">AED</p>
                <p className="text-red-600">
                  {product.hasDiscount ? (
                    <span className="font-bold text-md md:text-xl">
                      <span className="line-through">{product.price}</span>
                      <span className="ml-1 text-neonYellow">
                        {Math.round(
                          (product.price -
                            product.price *
                              (product.discountPercentage / 100)) *
                            100,
                        ) / 100}
                      </span>
                    </span>
                  ) : (
                    <span className="font-bold text-md md:text-xl">
                      {product.price}
                    </span>
                  )}
                  <span
                    className={`${
                      product.hasDiscount ? 'text-neonYellow' : 'text-red-600'
                    }`}
                  >
                    /kg
                  </span>
                </p>
              </div>
              {product.hasDiscount && (
                <div className="text-white bg-neonYellow text-sm m-1 border-2 border-dashed border-white px-2">
                  <span className="font-bold">
                    {`${product.discountPercentage}%`}
                  </span>
                  {` OFF`}
                </div>
              )}
            </div>
            <div className="flex items-center">
              <Rating
                defaultValue={product.productRating.rating}
                precision={0.1}
                size="small"
                readOnly
              />
              <p className="text-sm pl-1">{product.productRating.rating}</p>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  )
}

export default Product
