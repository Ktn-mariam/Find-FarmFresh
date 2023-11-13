import React from 'react'

const StorePage = () => {
  return (
    <div>
      <div className="md:px-36 px-14 py-5 text-xs md:text-sm font-serif">
        <nav>
          <ul className="grid grid-cols-4 md:grid-cols-8 gap-y-5 justify-between items-start font-roboto">
            <li className="flex flex-col items-center">
              <img
                className="md:h-28 h-14 rounded-full"
                src="/store-navbar/fruit.jpg"
                alt="fruit"
              />
              <p>Fruits</p>
            </li>
            <li className="flex flex-col items-center">
              <img
                className="md:h-28 h-14 rounded-full"
                src="/store-navbar/vegetable.jpg"
                alt="fruit"
              />
              <p>Vegetables</p>
            </li>
            <li className="flex flex-col items-center">
              <img
                className="md:h-28 h-14 rounded-full"
                src="/store-navbar/coffee.png"
                alt="fruit"
              />
              <p>Coffee & Tea</p>
            </li>
            <li className="flex flex-col items-center">
              <img
                className="md:h-28 h-14 rounded-full"
                src="/store-navbar/milk.png"
                alt="fruit"
              />
              <p>Diary & eggs</p>
            </li>
            <li className="flex flex-col items-center">
              <img
                className="md:h-28 h-14 rounded-full"
                src="/store-navbar/meat.png"
                alt="fruit"
              />
              <p>Meat</p>
            </li>
            <li className="flex flex-col items-center">
              <img
                className="md:h-28 h-14 rounded-full"
                src="/store-navbar/honey.png"
                alt="fruit"
              />
              <p className="text-center">Honey & Bee Products</p>
            </li>
            <li className="flex flex-col items-center">
              <img
                className="md:h-28 h-14 rounded-full"
                src="/store-navbar/flower.png"
                alt="fruit"
              />
              <p>Flowers</p>
            </li>
            <li className="flex flex-col items-center">
              <img
                className="md:h-28 h-14 rounded-full"
                src="/store-navbar/dried-fruit.png"
                alt="fruit"
              />
              <p>Dried Fruits & Nuts</p>
            </li>
          </ul>
        </nav>
      </div>
      <div className="pt-96"></div>
    </div>
  )
}

export default StorePage
