import React, { createContext, useEffect, useState } from 'react'
import { Role } from '../types/Auth'
import { UserProfileType } from '../types/Auth'
import { APIURL } from '../App'
import { OrderType } from '../types/Order'

interface AuthenticationContextType {
  logInData: UserProfileType
  loadingLogInData: boolean
  setLogInData: React.Dispatch<React.SetStateAction<UserProfileType>>
  logInError: boolean
  token: string | null
  setToken: React.Dispatch<React.SetStateAction<string | null>>
  orders: OrderType[] | null
  setOrders: React.Dispatch<React.SetStateAction<OrderType[] | null>>
  pageNumberForOrder: number
  setPageNumberForOrder: React.Dispatch<React.SetStateAction<number>>
}

const AuthenticationContext = createContext<AuthenticationContextType>({
  logInData: {
    loggedIn: false,
  },
  loadingLogInData: true,
  setLogInData: () => {},
  logInError: false,
  token: null,
  setToken: () => {},
  orders: null,
  setOrders: () => {},
  pageNumberForOrder: 1,
  setPageNumberForOrder: () => {},
})

interface AuthenticationContextProviderPropsType {
  children: string | JSX.Element | JSX.Element[]
}

export const AuthenticationContextProvider: React.FC<AuthenticationContextProviderPropsType> = ({
  children,
}) => {
  const [loadingLogInData, setLoadingLogInData] = useState(true)
  const [logInData, setLogInData] = useState<UserProfileType>({
    loggedIn: false,
  })
  const [logInError, setLogInError] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [orders, setOrders] = useState<OrderType[] | null>(null)
  const [pageNumberForOrder, setPageNumberForOrder] = useState(1)

  useEffect(() => {
    const getToken = localStorage.getItem('token')
    if (getToken) {
      const parsedToken = JSON.parse(getToken)
      setToken(parsedToken)
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('AUth fetching User data')
        const userResponse = await fetch(`${APIURL}/api/v1/auth`, {
          headers: {
            Authorization: `Bearer ${token}`,
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
            locationCoordinates:
              userData.user.userDetail[0].locationCoordinates,
            mobileNo: userData.user.userDetail[0].mobileNo,
          }

          if (userData.user.role === Role.Farmer) {
            loginInfo.comments = userData.user.userDetail[0].comments
            loginInfo.farmerRating = userData.user.userDetail[0].farmerRating
            loginInfo.description = userData.user.userDetail[0].description
          } else {
            loginInfo.following = userData.user.userDetail[0].following
          }

          setLogInData({ ...loginInfo })
        } else {
          setLogInError(true)
        }
      } catch (error) {
        console.log(`Could not fetch user data: ${error}`)
      } finally {
        setLoadingLogInData(false)
      }
    }

    if (token) {
      fetchData()
    }
  }, [token])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log('Fetching orders')

        const orderResponse = await fetch(
          `${APIURL}/api/v1/orders?page=${pageNumberForOrder}`,
          {
            mode: 'cors',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        const orderData = await orderResponse.json()
        console.log(orderData.orders)

        if (orderData.orders) {
          setOrders((prevOrders) => {
            if (prevOrders) {
              return [...prevOrders, ...orderData.orders]
            } else {
              return orderData.orders
            }
          })
        }
      } catch (error) {
        console.log('Failed to fetch all orders of the consumer: ', error)
      }
    }

    fetchOrders()
  }, [pageNumberForOrder, token])

  let contextValue = {
    logInData,
    loadingLogInData,
    setLogInData,
    logInError,
    token,
    setToken,
    orders,
    setOrders,
    pageNumberForOrder,
    setPageNumberForOrder,
  }

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export default AuthenticationContext
