import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import AuthenticationContext from '../../context/authentication'

const HeroSection = () => {
  const { logInData } = useContext(AuthenticationContext)
  const navigate = useNavigate()
  return (
    <div className="flex gap-5 mb-20 mt-10 justify-between items-center">
      <div>
        <div className="text-5xl font-bold">
          From farm to table, <br /> Just a click away
        </div>
        <div className="mt-10 text-lg">
          Welcome to our online marketplace connecting you directly to local
          farmers! Discover an abundance of freshly harvested produce, grown
          with care and passion. Embrace the farm-to-table experience from the
          comfort of your home. Join us in supporting local agriculture while
          savoring the taste of truly fresh, seasonal delights.
        </div>
        <div className="mt-10 flex gap-5">
          <button
            className="text-lg px-4 py-3 bg-appleGreen flex items-center rounded-md hover:bg-asparagus"
            type="button"
            onClick={() => {
              if (logInData.loggedIn) {
                navigate('/my-profile')
              } else {
                navigate('/sign-up')
              }
            }}
          >
            Create Account
            <KeyboardArrowRightIcon />
          </button>
          <NavLink to="/store">
            <button className="text-lg px-4 py-3 bg-teaGreen1 hover:bg-teaGreen2 items-center rounded-md hover:shadow-sm">
              View Products
              <KeyboardArrowRightIcon />
            </button>
          </NavLink>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="h-80 w-112">
          <img
            className="object-cover w-full h-full rounded-lg"
            src="/farmer-main-page.jpg"
            alt=""
          />
        </div>
        <div className="flex gap-5">
          <div className="w-80 h-40">
            <img
              className="object-cover w-full h-full rounded-lg"
              src="/cow-eatting-grass.jpg"
              alt=""
            />
          </div>
          <div className="w-80 h-40">
            <img
              className="object-cover w-full h-full rounded-lg"
              src="/vegetables-field.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
