import React from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

const HomePage = () => {
  return (
    <div className="flex py-24 px-36 gap-20 bg-grey">
      <div className="w-2/3 pr-10">
        <h1 className="text-7xl font-bold font-roboto">
          FROM FARM TO TABLE, <br /> JUST A CLICK AWAY...
        </h1>
        <h4 className="mt-7">
          Welcome to our online marketplace connecting you directly to local
          farmers! Discover an abundance of freshly harvested produce, grown
          with care and passion. Embrace the farm-to-table experience from the
          comfort of your home. Join us in supporting local agriculture while
          savoring the taste of truly fresh, seasonal delights.
        </h4>
        <button className="flex mt-7 bg-light-green px-6 py-3 rounded-3xl">
          <p className="font-lato">SIGN UP</p>
          <div>
            <KeyboardArrowRightIcon />
          </div>
        </button>
      </div>
      <div>
        <img
          className="h-full w-full"
          src="/homepage-image-2.png"
          alt="homepage"
        />
      </div>
    </div>
  )
}

export default HomePage
