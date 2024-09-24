import React, { useContext, useEffect, useState } from 'react'
import RatingStats from './RatingStats'
import EditProfileModal from './EditProfileModal'
import EditIcon from '@mui/icons-material/Edit'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhonelinkRingIcon from '@mui/icons-material/PhonelinkRing'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { FormikContextProvider } from '../context/formik-context'
import AuthenticationContext from '../context/authentication'
import { Role } from '../types/Auth'
import { ProfileSidebarInformationType } from '../types/Auth'
import { NavLink } from 'react-router-dom'

interface ProductCardProps {
  editable: boolean
  isFarmer: boolean
  profileInformation: ProfileSidebarInformationType
}

const ProfileSideBar: React.FC<ProductCardProps> = ({
  editable,
  isFarmer,
  profileInformation,
}) => {
  const { logInData, loadingLogInData } = useContext(AuthenticationContext)
  const {
    ID,
    name,
    image,
    description,
    mobileNo,
    location,
    locationCoordinates,
    rating,
  } = profileInformation
  const [openModal, setOpenModal] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    const farmerExists = logInData.following?.findIndex((farmer) => {
      return farmer.farmerID === ID
    })

    if (farmerExists && farmerExists >= 0) {
      setIsFollowing(true)
    } else {
      setIsFollowing(false)
    }
  }, [setIsFollowing, ID, logInData.following])

  const handleFollowing = async () => {
    const token = localStorage.getItem('token')
    const parsedToken = JSON.parse(token!)
    const follow = {
      farmer: { farmerID: ID, name: name },
    }
    if (isFollowing) {
      try {
        await fetch(`http://localhost:5000/api/v1/consumers/unFollowFarmer`, {
          method: 'PATCH',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${parsedToken}`,
          },
          body: JSON.stringify(follow),
        })
        setIsFollowing(false)
      } catch (error) {
        console.log(`Failed to unfollow farmer: ${error}`)
      }
    } else {
      try {
        await fetch(`http://localhost:5000/api/v1/consumers/followFarmer`, {
          method: 'PATCH',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${parsedToken}`,
          },
          body: JSON.stringify(follow),
        })
        setIsFollowing(true)
      } catch (error) {
        console.log(`Failed to follow Farmer: ${error}`)
      }
    }
  }

  if (editable && loadingLogInData && !locationCoordinates) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <div className="col-span-1 px-10 py-10 border border-1 border-zinc-300 rounded-2xl mb-10">
        <div className="w-74 h-64 flex items-center justify-center overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src={`http://localhost:5000/uploads/${image}`}
            alt=""
          />
        </div>
        <div className="flex items-center gap-3 justify-between  pt-3">
          <h1 className="text-2xl font-bold">{name}</h1>
          {editable && (
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
              <FormikContextProvider
                setOpenModal={setOpenModal}
                profileInformation={profileInformation}
              >
                <EditProfileModal
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  profileInformation={profileInformation}
                />
              </FormikContextProvider>
            </div>
          )}
          {logInData.role === Role.Consumer && !(logInData.userID === ID) && (
            <button
              onClick={handleFollowing}
              className="rounded-md py-0.5 px-1 hover:bg-gray-300"
            >
              {isFollowing ? <PersonAddDisabledIcon /> : <PersonAddAlt1Icon />}
            </button>
          )}
        </div>
        {logInData.role === Role.Farmer && <div>{description}</div>}
        <div className="flex items-center gap-3 pt-7 text-sm">
          <PhonelinkRingIcon />
          {mobileNo}
        </div>
        <div className="flex items-center gap-3 mt-3 text-sm">
          <LocationOnIcon />
          {location}
        </div>
        {!(locationCoordinates === undefined) && (
          <div className="flex items-center gap-3 mt-3 text-sm">
            <MyLocationIcon />
            <div className="flex gap-3">
              <div>
                <span className="font-bold">Lat: </span>
                {locationCoordinates.latitude.coordinate}°{' '}
                {locationCoordinates.latitude.direction}
              </div>
              <div>
                <span className="font-bold">Long: </span>
                {locationCoordinates.longitude.coordinate}°{' '}
                {locationCoordinates.longitude.direction}
              </div>
              <div></div>
            </div>
          </div>
        )}
        <div className="pt-10">
          {isFarmer && <RatingStats farmerRating={profileInformation.rating} />}
          {logInData.role === Role.Consumer && logInData.userID === ID && (
            <div>
              <h1 className="text-lg font-bold">My following</h1>
              <div className="mt-3">
                {logInData.following &&
                  logInData.following.map((farmer, index) => {
                    return (
                      <NavLink
                        key={index}
                        to={`/farmer-profile/${farmer.farmerID}`}
                      >
                        <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-200 rounded-md hover:cursor-pointer">
                          <AccountCircleIcon />
                          {farmer.name}
                        </div>
                      </NavLink>
                    )
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileSideBar
