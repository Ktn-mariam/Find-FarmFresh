import React, { useState } from 'react'
import ProductCard from './ProductCard'
import AddProductModal from './AddProductModal'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import AddIcon from '@mui/icons-material/Add'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ProductDetailTypeForDisplay } from '../types/Product'

interface ArrowProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  style?: React.CSSProperties
}

const PrevArrow: React.FC<ArrowProps> = ({ onClick, style }) => {
  return (
    <button
      className="rounded-md p-2 bg-gray-300 hover:shadow-md absolute -left-3 top-1/2 transform -translate-y-1/2 z-10"
      title="left"
      onClick={onClick}
    >
      <KeyboardArrowLeftIcon />
    </button>
  )
}
const NextArrow: React.FC<ArrowProps> = ({ onClick, style }) => {
  return (
    <button
      className=" bg-gray-300 p-2 rounded-md hover:shadow-md absolute -right-4 top-1/2 transform -translate-y-1/2"
      title="right"
      onClick={onClick}
    >
      <KeyboardArrowRightIcon />
    </button>
  )
}

interface ProductSliderProps {
  noOfSlides: number
  height: number
  heading: string
  editable: boolean
  products: ProductDetailTypeForDisplay[]
  setRefetchProducts?: React.Dispatch<React.SetStateAction<boolean>>
}

const ProductSlider: React.FC<ProductSliderProps> = ({
  noOfSlides,
  height,
  heading,
  editable,
  products,
  setRefetchProducts,
}) => {
  const [openModal, setOpenModal] = useState(false)
  const [isEditModal, setIsEditModal] = useState(false)
  const [
    editProduct,
    setEditProduct,
  ] = useState<ProductDetailTypeForDisplay | null>(null)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: noOfSlides,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  }
  return (
    <div>
      <div className="flex items-center justify-between font-noto">
        <h1 className="font-bold text-xl">{heading}</h1>
        {editable && (
          <div className="float-right">
            <button
              onClick={() => {
                setOpenModal(true)
              }}
              className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100"
            >
              <AddIcon />
              <p>Add Product</p>
            </button>
            <AddProductModal
              openModal={openModal}
              setOpenModal={setOpenModal}
              setRefetchProducts={setRefetchProducts}
              isEditModal={isEditModal}
              setIsEditModal={setIsEditModal}
              editProduct={editProduct}
            />
          </div>
        )}
      </div>
      <div>
        {products.length > noOfSlides ? (
          <Slider {...settings}>
            {products.map((product) => (
              <ProductCard
                key={product._id}
                height={height}
                editable={editable}
                setOpenModal={setOpenModal}
                product={product}
                setRefetchProducts={setRefetchProducts}
                setIsEditModal={setIsEditModal}
                setEditProduct={setEditProduct}
              />
            ))}
          </Slider>
        ) : (
          <div className="flex gap-10">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                height={height}
                editable={editable}
                setOpenModal={setOpenModal}
                product={product}
                setRefetchProducts={setRefetchProducts}
                setIsEditModal={setIsEditModal}
                setEditProduct={setEditProduct}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductSlider
