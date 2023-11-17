import React from 'react'
import ProductCard from './ProductCard'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import AddIcon from '@mui/icons-material/Add'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface ArrowProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  style?: React.CSSProperties
}

const PrevArrow: React.FC<ArrowProps> = ({ onClick, style }) => {
  return (
    <button
      className="border p-2 rounded-full bg-gray-300 border-gray-300 hover:shadow-md absolute -left-8 top-1/2 transform -translate-y-1/2 z-10"
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
      className="border bg-gray-300 p-2 rounded-full border-gray-300 hover:shadow-md absolute -right-10 top-1/2 transform -translate-y-1/2"
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
}

const ProductSlider: React.FC<ProductSliderProps> = ({
  noOfSlides,
  height,
  heading,
  editable,
}) => {
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
      <div className="flex items-center justify-between">
        <h1 className=" font-noto font-bold text-xl">{heading}</h1>
        {editable && (
          <button className="flex items-center gap-1">
            <AddIcon />
            <p>Add Product</p>
          </button>
        )}
      </div>
      <div>
        <Slider {...settings}>
          <ProductCard height={height} editable={editable} />
          <ProductCard height={height} editable={editable} />
          <ProductCard height={height} editable={editable} />
          <ProductCard height={height} editable={editable} />
          <ProductCard height={height} editable={editable} />
          <ProductCard height={height} editable={editable} />
          <ProductCard height={height} editable={editable} />
          <ProductCard height={height} editable={editable} />
          <ProductCard height={height} editable={editable} />
          <ProductCard height={height} editable={editable} />
          <ProductCard height={height} editable={editable} />
        </Slider>
      </div>
    </div>
  )
}

export default ProductSlider
