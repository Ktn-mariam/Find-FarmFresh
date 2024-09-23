const ContactUs = () => {
  return (
    <div className="my-20 flex flex-col gap-10">
      <div>
        <h1 className="text-3xl text-center font-bold">Contact Us</h1>
        <p className="mt-3">
          Have questions, suggestions, or need assistance? We're here to help!
          Reach out to us using the form below, and our team will get back to
          you as soon as possible.
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
  )
}

export default ContactUs
