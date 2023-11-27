import React from 'react'
import ProductSlider from '../../components/ProductSlider'
import CategoryNavbar from '../../components/CategoryNavbar'

const StorePage = () => {
  return (
    <div>
      <div className="md:px-36 px-14 py-5 text-xs md:text-sm font-serif">
        <CategoryNavbar />
      </div>
      <div className="flex flex-col gap-4 mb-32 md:px-36 px-14 pt-20">
        <ProductSlider
          noOfSlides={6}
          height={48}
          heading="Recommended for you"
          editable={false}
        />
      </div>
      <div className="pt-96"></div>
    </div>
  )
}

export default StorePage
