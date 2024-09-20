import { useContext, useEffect, useState } from 'react'
import AuthenticationContext from '../../context/authentication'
import { Role } from '../../types/Auth'
import FarmerProfile from '../FarmerProfile'
import ConsumerProfile from '../ConsumerProfile'

const MyProfilePage = () => {
  const { logInData, loadingLogInData, token } = useContext(
    AuthenticationContext,
  )
  const [loadPage, setLoadPage] = useState(false)

  useEffect(() => {
    if (logInData.loggedIn) {
      setLoadPage(true)
    }
    console.log(logInData)
  }, [logInData.loggedIn, loadingLogInData, token, logInData])

  if (!logInData.loggedIn) {
    return <div>Loading</div>
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
