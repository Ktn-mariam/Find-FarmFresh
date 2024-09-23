import { useContext } from 'react'
import AuthenticationContext from '../../context/authentication'
import { Role } from '../../types/Auth'
import FarmerProfile from '../FarmerProfile'
import ConsumerProfile from '../ConsumerProfile'

const MyProfilePage = () => {
  const { logInData, loadingLogInData, token } = useContext(
    AuthenticationContext,
  )

  if (loadingLogInData) {
    return (
      <div className="h-110 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <>
      {token && logInData.role === Role.Farmer ? (
        <FarmerProfile editable={true} />
      ) : (
        <ConsumerProfile />
      )}
    </>
  )
}

export default MyProfilePage
