import React from 'react'
import ProductCard from './ProductCard'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
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
      className="border p-2 rounded-full bg-white border-gray-300 hover:shadow-md"
      title="left"
      onClick={onClick}
      style={{
        ...style,
        zIndex: 1000,
        position: 'absolute',
        left: '-30px', // Adjust right positioning
        top: '45%', // Adjust top positioning
        transform: 'translateY(-50%)',
      }}
    >
      <KeyboardArrowLeftIcon />
    </button>
  )
}
const NextArrow: React.FC<ArrowProps> = ({ onClick, style }) => {
  return (
    <button
      className="border bg-white p-2 rounded-full border-gray-300 hover:shadow-md"
      title="right"
      onClick={onClick}
      style={{
        ...style,
        position: 'absolute',
        right: '-34px',
        top: '45%',
        transform: 'translateY(-50%)',
      }}
    >
      <KeyboardArrowRightIcon />
    </button>
  )
}

const ProductSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
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
    <div className="my-5">
      <h1 className=" font-noto font-bold mb-4 text-lg md:px-36 px-14">
        Recommended for you...
      </h1>
      <div className="md:px-36 px-14">
        <Slider {...settings}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </Slider>
      </div>
    </div>
  )
}

export default ProductSlider
