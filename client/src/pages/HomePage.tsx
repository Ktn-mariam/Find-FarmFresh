import React from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import CategoryNavbar from '../components/CategoryNavbar'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import AddIcon from '@mui/icons-material/Add'
import { NavLink } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="md:px-36 px-14 pt-10 mb-32 font-noto">
      <div className="flex flex-col">
        <div className="flex gap-5 mb-20 mt-10 justify-between items-center">
          <div>
            <div className="text-5xl font-bold">
              From farm to table, <br /> Just a click away
            </div>
            <div className="mt-10 text-lg">
              Welcome to our online marketplace connecting you directly to local
              farmers! Discover an abundance of freshly harvested produce, grown
              with care and passion. Embrace the farm-to-table experience from
              the comfort of your home. Join us in supporting local agriculture
              while savoring the taste of truly fresh, seasonal delights.
            </div>
            <div className="mt-10 flex gap-5">
              <NavLink to="/sign-up">
                <button className="text-lg px-4 py-3 bg-appleGreen flex items-center rounded-md hover:bg-asparagus">
                  Create Account
                  <KeyboardArrowRightIcon />
                </button>
              </NavLink>
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
        <div className="my-20 flex flex-col gap-10">
          <h1 className="text-3xl text-center font-bold">Features</h1>
          <div className="flex gap-10">
            <div className="p-10 flex flex-col items-center bg-beige">
              <div className="w-64 h-64">
                <img
                  className="object-cover w-full h-full rounded-lg"
                  src="/farmer.png"
                  alt=""
                />
              </div>
              <div className="text-3xl pt-10 text-center">
                Build Local Farm Connections
              </div>
              <div className="text-lg pt-5 text-center">
                Connect directly with farmers in your area. Discover the
                freshest produce sourced from local farms, fostering a closer
                connection between you and the food you eat.
              </div>
            </div>
            <div className="p-10 flex flex-col items-center bg-beige">
              <div className="w-64 h-64">
                <img
                  className="object-cover w-full h-full rounded-lg"
                  src="/vegetable-1.png"
                  alt=""
                />
              </div>
              <div className="text-3xl pt-10 text-center">
                Fresher Finds, Every Time
              </div>
              <div className="text-lg pt-5 text-center">
                Explore a diverse range of farm-fresh fruits and vegetables.
                From field to table, enjoy the quality and taste of produce
                picked at its peak, ensuring a delightful and fresh culinary
                experience.
              </div>
            </div>
            <div className="p-10 flex flex-col items-center bg-beige">
              <div className="w-64 h-64">
                <img
                  className="object-cover w-full h-full rounded-lg"
                  src="/vegetable-2.png"
                  alt=""
                />
              </div>
              <div className="text-3xl pt-10 text-center">
                Budget-Friendly Harvest
              </div>
              <div className="text-lg pt-5 text-center">
                Access an array of affordable, high-quality fruits and
                vegetables. Enjoy cost-effective options without compromising on
                freshness, making healthy eating more accessible for everyone.
              </div>
            </div>
          </div>
        </div>
        <div className="mb-20 mt-24 flex flex-col gap-10">
          <h1 className="text-3xl text-center font-bold">
            How to get started?
          </h1>
          <div className="flex flex-col gap-10 items-center pl-20">
            <div className="grid grid-cols-7 items-center">
              <div className="col-span-3">
                <h5 className="text-lg font-bold">
                  Register and create your account
                </h5>
                <p>Create your account and fill the required information</p>
              </div>
              <div className="col-span-1 px-5 py-4 rounded-md bg-appleGreen m-2 text-white text-2xl font-bold mr-20">
                01
              </div>
              <div className="col-span-3">
                <h5 className="text-lg font-bold">
                  Register and create your account
                </h5>
                <p>Create your account and fill the required information</p>
              </div>
            </div>
            <div className="grid grid-cols-7 items-center">
              <div className="col-span-3">
                <h5 className="text-lg font-bold">
                  Add products that you wish to sell
                </h5>
                <p>Create your account and fill the required information</p>
              </div>
              <div className="col-span-1 px-5 py-4 rounded-md bg-appleGreen m-2 text-white text-2xl font-bold mr-20">
                02
              </div>
              <div className="col-span-3">
                <h5 className="text-lg font-bold">
                  Add products to cart that wish to buy
                </h5>
                <p>Create your account and fill the required information</p>
              </div>
            </div>
            <div className="grid grid-cols-7 items-center">
              <div className="col-span-3">
                <h5 className="text-lg font-bold">
                  View your orders in the orders Page
                </h5>
                <p>Create your account and fill the required information</p>
              </div>
              <div className="col-span-1 px-5 py-4 rounded-md bg-appleGreen m-2 text-white text-2xl font-bold mr-20">
                03
              </div>
              <div className="col-span-3">
                <h5 className="text-lg font-bold">
                  Checkout the products from shopping cart
                </h5>
                <p>Create your account and fill the required information</p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-20 flex flex-col gap-14">
          <h1 className="text-3xl font-bold text-center">
            Explore a diverse range of categories from local farmers
          </h1>
          <CategoryNavbar />
        </div>
        <div className="my-20 flex flex-col gap-14">
          <div>
            <h1 className="text-3xl font-bold text-center">
              What our Users are saying
            </h1>
            <h5 className="text-lg mt-2 text-center">
              We are happy to get your reviews
            </h5>
          </div>
          <div className="grid grid-cols-3 gap-10">
            <div className="col-span-1 rounded-md bg-beige  px-6 py-8">
              <div className="flex justify-center">
                <FormatQuoteIcon fontSize="large" />
              </div>
              <h3 className="text-xl font-bold text-center">
                A Boon for my Business
              </h3>
              <p className="text-center mt-3">
                Joining this platform was a game-changer for my farm. The
                exposure it provided significantly boosted my sales. The
                easy-to-use interface and supportive community make it an
                invaluable resource for any farmer. Highly recommended!
              </p>
              <h5 className="text-center text-sm mt-3">
                Mariam Khatoon - <span className="italic">Farmer</span>
              </h5>
              <div className="text-sm text-gray-600 text-center">
                November 15, 2023
              </div>
            </div>
            <div className="col-span-1 rounded-md bg-beige  px-6 py-8">
              <div className="flex justify-center">
                <FormatQuoteIcon fontSize="large" />
              </div>
              <h3 className="text-xl font-bold text-center">
                Freshness Delivered to My Doorstep
              </h3>
              <p className="text-center mt-3">
                I've never had such consistently fresh produce delivered
                straight to my door. The variety is impressive, and the quality
                is unmatched. It's changed the way my family eats. So grateful
                for this service!
              </p>
              <h5 className="text-center text-sm mt-3">
                Mariam Khatoon - <span className="italic">Farmer</span>
              </h5>
              <div className="text-sm text-gray-600 text-center">
                November 15, 2023
              </div>
            </div>
            <div className="col-span-1 rounded-md bg-beige px-6 py-8">
              <div className="flex justify-center">
                <FormatQuoteIcon fontSize="large" />
              </div>
              <h3 className="text-xl font-bold text-center">
                Supporting Local Agriculture
              </h3>
              <p className="text-center mt-3">
                As a conscious consumer, this platform aligns perfectly with my
                values. Connecting directly with local farmers makes every
                purchase meaningful. The transparency and quality keep me coming
                back. A fantastic initiative!
              </p>
              <h5 className="text-center text-sm mt-3">
                Mariam Khatoon - <span className="italic">Farmer</span>
              </h5>
              <div className="text-sm text-gray-600 text-center">
                November 15, 2023
              </div>
            </div>
          </div>
        </div>
        <div className="my-20 flex flex-col gap-14">
          <h1 className="text-3xl text-center font-bold">FAQs</h1>
          <div className="flex justify-center px-32">
            <div className="flex flex-col">
              <Accordion>
                <AccordionSummary
                  expandIcon={<AddIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  style={{ backgroundColor: '#F3EFF5' }}
                >
                  How can I trust the quality of the produce when ordering from
                  different farmers?
                </AccordionSummary>
                <AccordionDetails>
                  We prioritize transparency. Each farmer's profile provides
                  details on their practices, and customer reviews offer
                  insights. We facilitate direct communication between you and
                  the farmers, ensuring a trustworthy connection.
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<AddIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  style={{ backgroundColor: '#F3EFF5' }}
                >
                  Is customization available for orders, or are they pre-set
                  packages?
                </AccordionSummary>
                <AccordionDetails>
                  Absolutely! Our platform empowers you to tailor your orders.
                  Choose specific items, quantities, and preferred farmers to
                  create a personalized shopping experience.
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<AddIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  style={{ backgroundColor: '#F3EFF5' }}
                >
                  What if I, as a farmer, cannot provide delivery services?
                </AccordionSummary>
                <AccordionDetails>
                  No worries! You can still showcase your products for online
                  visibility. Simply choose the option to display your produce
                  without "Delivery Services" functionality. This allows
                  consumers to see your offerings and contact you directly for
                  further arrangements, fostering a seamless connection.
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<AddIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  style={{ backgroundColor: '#F3EFF5' }}
                >
                  How can I stay updated on a specific farmer's offerings and
                  updates? Can I follow them on the platform?
                </AccordionSummary>
                <AccordionDetails>
                  Absolutely! Our platform allows you to follow your favorite
                  farmers. By doing so, you'll receive notifications about their
                  latest produce, promotions, and any updates they share. It's a
                  great way to stay connected and informed about your preferred
                  farmers' offerings.
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<AddIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  style={{ backgroundColor: '#F3EFF5' }}
                >
                  Are there any membership or subscription fees for using the
                  platform?
                </AccordionSummary>
                <AccordionDetails>
                  No, our platform is free for both farmers and consumers to
                  join. There are no membership or subscription fees. We believe
                  in providing an open and accessible marketplace that benefits
                  both farmers and consumers alike.
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>
        <div className="my-20 flex flex-col gap-10">
          <div>
            <h1 className="text-3xl text-center font-bold">Contact Us</h1>
            <p className="mt-3">
              Have questions, suggestions, or need assistance? We're here to
              help! Reach out to us using the form below, and our team will get
              back to you as soon as possible.
            </p>
          </div>
          <div className="flex gap-10">
            <div className="w-1/2">
              <img
                className="object-cover w-full h-full rounded-lg"
                src="/strawberry.jpg"
                alt=""
              />
            </div>
            <div className="w-1/2 px-10">
              <form className="flex flex-col justify-center" action="">
                <label className="text-lg mt-10" htmlFor="">
                  Your Name:
                </label>
                <input
                  title="title"
                  className="mt-2 bg-gray-200 border-2 border-gray-200 rounded-md w-full py-1 px-2 focus:outline-none focus:bg-white focus:border-gray-400"
                  type="text"
                />
                <div className="mt-5">
                  <label className="text-lg" htmlFor="">
                    Email
                  </label>
                  <input
                    title="title"
                    className="mt-2 bg-gray-200 border-2 border-gray-200 rounded-md w-full py-1 px-2 focus:outline-none focus:bg-white focus:border-gray-400"
                    type="text"
                  />
                </div>
                <div className="mt-5">
                  <label className="text-lg" htmlFor="">
                    Message:
                  </label>
                  <textarea
                    title="title"
                    className="mt-2 bg-gray-200 border-2 border-gray-200 rounded-md w-full py-1 px-2 focus:outline-none focus:bg-white focus:border-gray-400"
                    rows={5}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
