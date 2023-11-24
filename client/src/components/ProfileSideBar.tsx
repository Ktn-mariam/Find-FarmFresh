import React, { useState } from 'react'
import RatingStats from './RatingStats'
import EditProfileModal from './EditProfileModal'
import EditIcon from '@mui/icons-material/Edit'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhonelinkRingIcon from '@mui/icons-material/PhonelinkRing'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

interface ProductCardProps {
  editable: boolean
  isFarmer: boolean
}

const ProfileSideBar: React.FC<ProductCardProps> = ({ editable, isFarmer }) => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <div>
      <div className="col-span-1 px-10 py-10 border border-1 border-zinc-300 rounded-2xl mb-10">
        <div className="w-74 h-64 flex items-center justify-center overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src="/mazaara-farm.webp"
            alt=""
          />
        </div>
        <div className="flex items-center gap-3 justify-between  pt-3">
          <h1 className="text-2xl font-bold">Mariam Khatoon</h1>
          {editable ? (
            <div>
              <button
                title="edit"
                className="rounded-md py-0.5 px-1 hover:bg-gray-300 hover:cursor-pointer"
                onClick={() => {
                  setOpenModal(true)
                }}
              >
                <EditIcon fontSize="small" />
              </button>
              <EditProfileModal
                openModal={openModal}
                setOpenModal={setOpenModal}
              />
            </div>
          ) : (
            <div className="rounded-md py-0.5 px-1 hover:bg-gray-300 hover:cursor-pointer">
              <PersonAddAlt1Icon />
            </div>
          )}
        </div>
        {isFarmer && (
          <div>
            Family farmer. Apples, berries, litchis. Quality, sustainable
            practices.
          </div>
        )}
        <div className="flex items-center gap-3 pt-7 text-sm">
          <PhonelinkRingIcon />
          +971 50 243 0978
        </div>
        <div className="flex items-center gap-3 mt-3 text-sm">
          <LocationOnIcon />
          Flat 503, Sapphire Building, Silicon Oasis, Dubai, United Arab
          Emirates
        </div>
        <div className="flex items-center gap-3 mt-3 text-sm">
          <MyLocationIcon />
          <div className="flex gap-3">
            <div>
              <span className="font-bold">Lat: </span>25.1279° N
            </div>
            <div>
              <span className="font-bold">Long: </span>55.3863° E
            </div>
            <div></div>
          </div>
        </div>
        <div className="pt-10">
          {isFarmer ? (
            <RatingStats />
          ) : (
            <div>
              <h1 className="text-lg font-bold">My following</h1>
              <div className="mt-3">
                <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-200 rounded-md hover:cursor-pointer">
                  <AccountCircleIcon />
                  Mariam Khatoon
                </div>
                <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-200 rounded-md hover:cursor-pointer">
                  <AccountCircleIcon />
                  Mariam Khatoon
                </div>
                <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-200 rounded-md hover:cursor-pointer">
                  <AccountCircleIcon />
                  Mariam Khatoon
                </div>
                <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-200 rounded-md hover:cursor-pointer">
                  <AccountCircleIcon />
                  Mariam Khatoon
                </div>
                <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-200 rounded-md hover:cursor-pointer">
                  <AccountCircleIcon />
                  Mariam Khatoon
                </div>
                <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-200 rounded-md hover:cursor-pointer">
                  <AccountCircleIcon />
                  Mariam Khatoon
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileSideBar
