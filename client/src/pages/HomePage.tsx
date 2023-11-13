import React from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

const HomePage = () => {
  return (
    <div>
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
      <div className="py-24 px-36 bg-ashGrey">
        <div className="flex gap-20">
          <img className="h-80 rounded-xl shadow-md" src="/farmer.png" alt="" />
          <div>
            <h1 className="text-4xl font-roboto font-bold">
              Build Local Farm Connections
            </h1>
            <p className="text-xl pt-10 font-workSans">
              Connect directly with farmers in your area. Discover the freshest
              produce sourced from local farms, fostering a closer connection
              between you and the food you eat.
            </p>
            <p className="text-xl pt-5 font-workSans">
              Are you a farmer looking for an online platform to sell their
              products? Create your account now!
            </p>
            <button className="flex mt-7 bg-light-green px-6 py-3 rounded-3xl">
              <p className="font-lato">Create your account</p>
              <div>
                <KeyboardArrowRightIcon />
              </div>
            </button>
          </div>
        </div>
        <div className="flex gap-20 pt-24">
          <div>
            <h1 className="text-4xl font-roboto font-bold text-right">
              Fresher Finds, Every Time.......
            </h1>
            <p className="text-xl pt-10 font-workSans">
              Explore a diverse range of farm-fresh fruits and vegetables. From
              field to table, enjoy the quality and taste of produce picked at
              its peak, ensuring a delightful and fresh culinary experience.
            </p>
          </div>
          <img
            className="h-80 rounded-xl shadow-md"
            src="/vegetable-1.png"
            alt=""
          />
        </div>
        <div className="flex gap-20 pt-24">
          <img
            className="h-80 rounded-xl shadow-md"
            src="/vegetable-2.png"
            alt=""
          />
          <div>
            <h1 className="text-4xl font-roboto font-bold">
              Budget-Friendly Harvest
            </h1>
            <p className="text-xl pt-10 font-workSans">
              Access an array of affordable, high-quality fruits and vegetables.
              Enjoy cost-effective options without compromising on freshness,
              making healthy eating more accessible for everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
