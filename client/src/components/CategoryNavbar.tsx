import React from 'react'
import { NavLink } from 'react-router-dom'

const CategoryNavbar = () => {
  return (
    <nav>
      <ul className="grid grid-cols-4 md:grid-cols-8 gap-y-5 justify-between items-start font-roboto">
        <NavLink to="/store/Fruits">
          <li className="flex flex-col items-center">
            <img
              className="md:h-28 h-14 rounded-full hover:cursor-pointer transition-all duration-200 ease-in-out"
              src="/store-navbar/fruit.jpg"
              alt="fruit"
            />
            <p>Fruits</p>
          </li>
        </NavLink>
        <NavLink to="/store/Vegetables">
          <li className="flex flex-col items-center">
            <img
              className="md:h-28 h-14 rounded-full hover:cursor-pointer transition-all duration-200 ease-in-out"
              src="/store-navbar/vegetable.jpg"
              alt="fruit"
            />
            <p>Vegetables</p>
          </li>
        </NavLink>
        <NavLink to="/store/Coffee&Tea">
          <li className="flex flex-col items-center">
            <img
              className="md:h-28 h-14 rounded-full hover:cursor-pointer transition-all duration-200 ease-in-out"
              src="/store-navbar/coffee.png"
              alt="fruit"
            />
            <p>Coffee & Tea</p>
          </li>
        </NavLink>
        <NavLink to="/store/Diary&Eggs">
          <li className="flex flex-col items-center">
            <img
              className="md:h-28 h-14 rounded-full hover:cursor-pointer transition-all duration-200 ease-in-out"
              src="/store-navbar/milk.png"
              alt="fruit"
            />
            <p>Diary & eggs</p>
          </li>
        </NavLink>
        <NavLink to="/store/Meat">
          <li className="flex flex-col items-center">
            <img
              className="md:h-28 h-14 rounded-full hover:cursor-pointer transition-all duration-200 ease-in-out"
              src="/store-navbar/meat.png"
              alt="fruit"
            />
            <p>Meat</p>
          </li>
        </NavLink>
        <NavLink to="/store/Honey&BeeProducts">
          <li className="flex flex-col items-center">
            <img
              className="md:h-28 h-14 rounded-full hover:cursor-pointer transition-all duration-200 ease-in-out"
              src="/store-navbar/honey.png"
              alt="fruit"
            />
            <p className="text-center">Honey & Bee Products</p>
          </li>
        </NavLink>
        <NavLink to="/store/Flowers">
          <li className="flex flex-col items-center">
            <img
              className="md:h-28 h-14 rounded-full hover:cursor-pointer transition-all duration-200 ease-in-out"
              src="/store-navbar/flower.png"
              alt="fruit"
            />
            <p>Flowers</p>
          </li>
        </NavLink>
        <NavLink to="/store/DriedFruits&Nuts">
          <li className="flex flex-col items-center">
            <img
              className="md:h-28 h-14 rounded-full hover:cursor-pointer transition-all duration-200 ease-in-out"
              src="/store-navbar/dried-fruit.png"
              alt="fruit"
            />
            <p>Dried Fruits & Nuts</p>
          </li>
        </NavLink>
      </ul>
    </nav>
  )
}

export default CategoryNavbar
