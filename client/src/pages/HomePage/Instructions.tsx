const Instructions = () => {
  return (
    <div className="mb-20 mt-24 flex flex-col gap-10">
      <h1 className="text-3xl text-center font-bold">How to get started?</h1>
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
  )
}

export default Instructions
