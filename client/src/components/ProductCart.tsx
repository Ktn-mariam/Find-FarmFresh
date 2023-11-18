import React from 'react'

const ProductCart = () => {
  return (
    <div className="mx-1">
      <div className="py-5 flex flex-col items-center rounded-md font-noto hover:cursor-pointer">
        <div
          className={`h-40 mb-3 md:h-40 md:w-32 flex items-center justify-center overflow-hidden`}
        >
          <img className="object-cover w-full h-full" src="/apple.png" alt="" />
        </div>
        <div>
          <h4 className={`truncate w-32`}>Apples, Silicon Oasiskm frkn</h4>
          <div className="flex gap-3 justify-between items-end">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <p className="text-xs py-0.5 pr-1">AED</p>
                <p>
                  <span className="font-bold">35.50</span>/kg
                </p>
              </div>
              <div className="pl-5 text-blue-gray-600">x2</div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default ProductCart
