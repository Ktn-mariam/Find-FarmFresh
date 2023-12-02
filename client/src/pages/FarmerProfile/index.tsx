import React from 'react'
import { useNavigate } from 'react-router-dom'
import ProductSlider from '../../components/ProductSlider'
import CommentSection from '../../components/CommentSection'
import LocationMap from '../../components/LocationMap'
import ProfileSideBar from '../../components/ProfileSideBar'
import StoreNavbar from '../../components/StoreNavbar'
import LogoutIcon from '@mui/icons-material/Logout'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LineChart from './LineChart'

interface FarmerProfileProps {
  editable: boolean
}

const FarmerProfile: React.FC<FarmerProfileProps> = ({ editable }) => {
  const navigate = useNavigate()
  const BackPageExists = window.history.state && window.history.state.idx > 0

  return (
    <div>
      {!editable && <StoreNavbar />}
      <div className="md:px-36 px-14 pt-10 mb-32 font-noto">
        <div className="flex items-center justify-between mx-10 mb-5">
          {BackPageExists && !editable ? (
            <button
              onClick={() => {
                navigate(-1)
              }}
              className="flex items-center gap-2 hover:cursor-pointer"
            >
              <ArrowBackIcon />
              <h3 className="text-xl">Back</h3>
            </button>
          ) : (
            <div></div>
          )}
          {editable && (
            <button className="flex items-center gap-2 hover:cursor-pointer">
              <LogoutIcon />
              <h3 className="text-xl">Logout</h3>
            </button>
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
                  Your Sales this Month
                </h1>
                <LineChart />
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
