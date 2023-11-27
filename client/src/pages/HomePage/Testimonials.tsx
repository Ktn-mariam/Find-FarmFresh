import React from 'react'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'

const Testimonials = () => {
  return (
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
            Joining this platform was a game-changer for my farm. The exposure
            it provided significantly boosted my sales. The easy-to-use
            interface and supportive community make it an invaluable resource
            for any farmer. Highly recommended!
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
            I've never had such consistently fresh produce delivered straight to
            my door. The variety is impressive, and the quality is unmatched.
            It's changed the way my family eats. So grateful for this service!
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
            values. Connecting directly with local farmers makes every purchase
            meaningful. The transparency and quality keep me coming back. A
            fantastic initiative!
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
  )
}

export default Testimonials
