import React, { createContext, useEffect, useState } from 'react'
import { Comment } from '../types/Comment'
import { Role } from '../types/Auth'

export interface UserProfileType {
  locationCoordinates?: {
    latitude: {
      coordinate: number
      direction: 'N' | 'S'
    }
    longitude: {
      coordinate: number
      direction: 'E' | 'W'
    }
  }
  farmerRating?: {
    voteCount: {
      five: number
      four: number
      three: number
      two: number
      one: number
    }
    rating: number
  }
  userID?: string
  image?: string
  name?: string
  description?: string
  mobileNo?: string
  location?: string
  comments?: Comment[] | undefined
  role?: 'Farmer' | 'Consumer'
  loggedIn: boolean
  // ORDERS
}

interface AuthenticationContextType {
  logInData: UserProfileType
  loadingLogInData: boolean
  setLogInData: React.Dispatch<React.SetStateAction<UserProfileType>>
  logInError: boolean
}

const AuthenticationContext = createContext<AuthenticationContextType>({
  logInData: {
    loggedIn: false,
  },
  loadingLogInData: true,
  setLogInData: () => {},
  logInError: false,
})

interface AuthenticationContextProviderPropsType {
  children: string | JSX.Element | JSX.Element[]
}

export const AuthenticationContextProvider: React.FC<AuthenticationContextProviderPropsType> = ({
  children,
}) => {
  const token = localStorage.getItem('token')

  console.log(`TOKEN: ${token}`)
  const [loadingLogInData, setLoadingLogInData] = useState(true)
  const [logInData, setLogInData] = useState<UserProfileType>({
    loggedIn: false,
  })
  const [logInError, setLogInError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setLoadingLogInData(false)
        return
      }
      const parsedToken = JSON.parse(token)
      const userResponse = await fetch('http://localhost:5000/api/v1/auth', {
        headers: {
          Authorization: `Bearer ${parsedToken}`,
        },
      })
      const userData = await userResponse.json()

      if (userResponse.ok) {
        const loginInfo: UserProfileType = {
          loggedIn: true,
          userID: userData.user.userID,
          role: userData.user.role,
          name: userData.user.userDetail[0].name,
          image: userData.user.userDetail[0].image,
          location: userData.user.userDetail[0].location,
          locationCoordinates: userData.user.userDetail[0].locationCoordinates,
          mobileNo: userData.user.userDetail[0].mobileNo,
        }

        if (userData.user.role === Role.Farmer) {
          loginInfo.comments = userData.user.userDetail[0].comments
          loginInfo.farmerRating = userData.user.userDetail[0].farmerRating
          loginInfo.description = userData.user.userDetail[0].description
        }
        setLogInData(loginInfo)
      } else {
        setLogInError(true)
      }

      setLoadingLogInData(false)
    }

    fetchData()
  }, [token])

  let contextValue = {
    logInData,
    loadingLogInData,
    setLogInData,
    logInError,
  }

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export default AuthenticationContext
