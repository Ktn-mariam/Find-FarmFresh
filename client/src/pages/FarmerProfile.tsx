import React from 'react'
import ProductSlider from '../components/ProductSlider'
import CommentSection from '../components/CommentSection'
import LocationMap from '../components/LocationMap'
import StoreNavbar from '../components/StoreNavbar'
import LogoutIcon from '@mui/icons-material/Logout'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ProfileSideBar from '../components/ProfileSideBar'

const FarmerProfile = () => {
  const editable = true // true only if farmer is veiwing his own profile
  return (
    <div>
      {!editable && <StoreNavbar />}
      <div className="md:px-36 px-14 pt-10 mb-32 font-noto">
        <div className="flex items-center justify-between mx-10 mb-5">
          <div className="flex items-center gap-2 hover:cursor-pointer">
            <ArrowBackIcon />
            <h3 className="text-xl">Back</h3>
          </div>
          {editable && (
            <div className="flex items-center gap-2 hover:cursor-pointer">
              <LogoutIcon />
              <h3 className="text-xl">Logout</h3>
            </div>
          )}
        </div>
        <div className="flex">
          <div className="grid grid-cols-3 gap-10">
            <ProfileSideBar editable={editable} isFarmer={true} />
            <div className="ml-10 col-span-2">
              <div className="mt-7">
                <ProductSlider
                  noOfSlides={3}
                  height={64}
                  heading={'Products sold by Mariam'}
                  editable={editable}
                />
              </div>
              <div className="mt-5">
                <h1 className="font-noto font-bold text-xl mb-5">
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
        </div>
      </div>
    </div>
  )
}

export default FarmerProfile
