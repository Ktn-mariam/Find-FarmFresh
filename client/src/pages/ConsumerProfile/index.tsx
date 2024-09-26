import { useContext, useEffect, useState } from 'react'
import StoreNavbar from '../../components/StoreNavbar'
import { useNavigate } from 'react-router-dom'
import ProfileSideBar from '../../components/ProfileSideBar'
import ReviewsModal from './ReviewsModal'
import AuthenticationContext from '../../context/authentication'
import LogoutIcon from '@mui/icons-material/Logout'
import { OrderType } from '../../types/Order'
import Order from './Order'
import { APIURL } from '../../App'

const ConsumerProfile = () => {
  const navigate = useNavigate()
  const [openReviewModal, setOpenReviewModal] = useState(false)
  const { logInData, loadingLogInData, setLogInData, token } = useContext(
    AuthenticationContext,
  )
  const [orders, setOrders] = useState<OrderType[] | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderResponse = await fetch(`${APIURL}/api/v1/orders`, {
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const orderData = await orderResponse.json()
        setOrders(orderData.orders)
      } catch (error) {
        console.log('Failed to fetch all orders of the consumer: ', error)
      }
    }

    fetchOrders()
  }, [])

  useEffect(() => {
    setOpenReviewModal(true)
  }, [logInData])

  if (loadingLogInData) {
    return <div>Loading</div>
  }

  const profileInformation = {
    ID: logInData.userID!,
    name: logInData.name!,
    locationCoordinates: logInData.locationCoordinates!,
    image: logInData.image!,
    location: logInData.location!,
    mobileNo: logInData.mobileNo!,
  }

  return (
    <div>
      <StoreNavbar />
      <ReviewsModal
        openReviewModal={openReviewModal}
        setOpenReviewModal={setOpenReviewModal}
      />
      <div className="md:px-36 px-14 pt-10 mb-32 font-noto">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <div className="text-2xl font-bold ml-2">My Profile</div>
            <button
              className="flex items-center gap-2 hover:cursor-pointer"
              onClick={() => {
                localStorage.removeItem('token')
                setLogInData({ loggedIn: false })
                navigate('/sign-in')
              }}
            >
              <LogoutIcon />
              <h3 className="text-xl">Logout</h3>
            </button>
          </div>
          <div className="grid grid-cols-3 gap-10">
            <ProfileSideBar
              isFarmer={false}
              editable={true}
              profileInformation={profileInformation}
            />
            <div className="col-span-2">
              <h1 className="text-lg font-bold mb-5">My Orders</h1>
              {orders ? (
                <div className="flex flex-col gap-10">
                  {orders.map((order, index) => {
                    return <Order key={index} order={order} />
                  })}
                </div>
              ) : (
                <div>No Orders to Display</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConsumerProfile
