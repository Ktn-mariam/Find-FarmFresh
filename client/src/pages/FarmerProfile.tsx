import React from 'react'
import RatingStats from '../components/RatingStats'
import ProductSlider from '../components/ProductSlider'
import CommentSection from '../components/CommentSection'
import LocationMap from '../components/LocationMap'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhonelinkRingIcon from '@mui/icons-material/PhonelinkRing'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EditIcon from '@mui/icons-material/Edit'

const FarmerProfile = () => {
  return (
    <div className="md:px-36 px-14 pt-10 mb-32 font-noto">
      <div className="flex items-center gap-2 mb-5 ml-10 hover:cursor-pointer">
        <ArrowBackIcon />
        <h3 className="text-xl">Back</h3>
      </div>
      <div className="flex">
        <div className="grid grid-cols-3 gap-10">
          <div className="col-span-1 px-10 py-10 border border-1 border-zinc-300 rounded-2xl mb-10">
            <div className="w-74 h-64 flex items-center justify-center overflow-hidden">
              <img
                className="object-cover w-full h-full"
                src="/mazaara-farm.webp"
                alt=""
              />
            </div>
            <div className="flex items-center gap-3 justify-between">
              <h1 className="text-2xl font-bold pt-3">Mariam Khatoon</h1>
              <div className="hover:cursor-pointer">
                <EditIcon fontSize="small" />
              </div>
            </div>
            <div>
              Family farmer. Apples, berries, litchis. Quality, sustainable
              practices.
            </div>
            <div className="flex items-center gap-3 pt-7 text-sm">
              <PhonelinkRingIcon />
              +971 50 243 0978
            </div>
            <div className="flex items-center gap-3 mt-3 text-sm">
              <LocationOnIcon />
              Flat 503, Sapphire Building, Silicon Oasis, Dubai, United Arab
              Emirates
            </div>
            <div className="pt-10">
              <RatingStats />
            </div>
          </div>
          <div className="ml-10 col-span-2">
            <div className="mt-7">
              <ProductSlider
                noOfSlides={3}
                height={64}
                heading={'Products sold by Mariam'}
                editable={true}
              />
            </div>
            <div className="mt-5">
              <h1 className=" font-noto font-bold text-xl mb-5">
                Location on Map
              </h1>
              <div className="h-96">
                <LocationMap />
              </div>
            </div>
            <div>
              <CommentSection />
            </div>
          </div>
        </div>
        <div className="h-96"></div>
      </div>
    </div>
  )
}

export default FarmerProfile
