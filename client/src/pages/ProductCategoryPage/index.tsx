import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Product from './Product'
import StoreNavbar from '../../components/StoreNavbar'
import Rating from '@mui/material/Rating'
import Pagination from '@mui/material/Pagination'
import getChildCategories from '../../utils/getChildCategories'
import { ProductType } from '../../types/Product'
import { APIURL } from '../../App'

const ProductCategoryPage = () => {
  const { parentCategory, category } = useParams()
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [noOfPages, setNoOfPages] = useState(0)
  const [products, setProducts] = useState<ProductType[] | null>(null)
  const [childCategory, setChildCategory] = useState(category)
  const [ratingFilter, setRatingFilter] = useState(0)
  const [sortFilter, setSortFilter] = useState<String>('createdAt')
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        let fetchDataRoute = `${APIURL}/api/v1/products/category/${parentCategory}?page=${page}&rating=${ratingFilter}&sortBy=${sortFilter}`
        if (childCategory) {
          fetchDataRoute = fetchDataRoute + `&category=${childCategory}`
        }

        const productResponse = await fetch(fetchDataRoute)
        const productData = await productResponse.json()
        setProducts(productData.products)
        setNoOfPages(Math.ceil(productData.nbHits / 9))
      } catch (error) {
        console.log('Failed to fetch products of a category: ', error)
      }
    }

    fetchProductData()
  }, [parentCategory, childCategory, page, ratingFilter, sortFilter])

  useEffect(() => {
    if (!category) {
      setChildCategory(category)
    }
  }, [category])
  const categories = getChildCategories(parentCategory || 'fruits')
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
            {categories.map((subCategory, index) => {
              return (
                <div key={index} className="flex pb-2 text-sm items-center">
                  <input
                    title={subCategory}
                    type="checkbox"
                    name="subCategory"
                    id={subCategory}
                    checked={childCategory === subCategory ? true : false}
                    onChange={(event) => {
                      if (!event.target.checked) {
                        setChildCategory(undefined)
                        navigate(`/store/${parentCategory}`)
                      } else {
                        setChildCategory(subCategory)
                        navigate(`/store/${parentCategory}/${subCategory}`)
                      }
                    }}
                  />
                  <label className="pl-1" htmlFor={subCategory}>
                    {subCategory}
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
                <input
                  className="pt-1"
                  title="4"
                  id="4"
                  name="rating"
                  type="checkbox"
                  onChange={(event) => {
                    if (!event.target.checked) {
                      setRatingFilter(0)
                    } else {
                      setRatingFilter(4)
                    }
                  }}
                />
                <Rating
                  defaultValue={4}
                  precision={0.5}
                  size="small"
                  readOnly
                />
                <p className="text-md">& up</p>
              </div>
              <div className="flex pb-2 items-center gap-1">
                <input
                  className="pt-1"
                  title="3"
                  id="3"
                  name="rating2"
                  type="checkbox"
                  onChange={(event) => {
                    if (!event.target.checked) {
                      setRatingFilter(0)
                    } else {
                      setRatingFilter(3)
                    }
                  }}
                />
                <Rating
                  defaultValue={3}
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
          <div className="flex items-center justify-between pl-14 font-workSans">
            <div>
              <h1 className="text-xl font-bold">Results</h1>
            </div>
            <div className="flex gap-3">
              {/* <select
                className="px-2 py-1 border border-gray-200"
                title="location=filter"
                name="location-filter"
                id="filter"
              >
                <option value="">Distance Filter</option>
                <option value="">Within 20 Miles</option>
                <option value="">Within 15 Miles</option>
                <option value="">Within 10 Miles</option>
                <option value="">Within 5 Miles</option>
              </select> */}
              <select
                className="px-2 py-1 border border-gray-200"
                title="sort"
                name="sort"
                id="sort"
                onChange={(e) => {
                  setSortFilter(e.target.value)
                }}
              >
                <option value="createdAt">Sort By</option>
                <option value="lowToHigh">Price low to high</option>
                <option value="highToLow">Price high to low</option>
                <option value="rating">Ratings</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 justify-center sm:grid-cols-2 md:grid-cols-3 pl-10 gap-x-4 gap-y-1">
            {products && products.length > 0 ? (
              products.map((product, index) => {
                return <Product key={index} product={product} />
              })
            ) : (
              <div className="py-5">No products found under this category</div>
            )}
          </div>
          <div className="mt-3 flex justify-center">
            <Pagination
              onChange={(event: React.ChangeEvent<unknown>, value: number) => {
                setPage(value)
              }}
              count={noOfPages}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCategoryPage
