import React from 'react'
import { NavLink } from 'react-router-dom'

function StoreNavbar() {
  return (
    <div className="px-36 py-2 shadow-sm bg-gray-100">
      <nav>
        <ul className="flex justify-between items-center font-workSans">
          <NavLink to="/store/fruits">
            <li>Fruits</li>
          </NavLink>
          <NavLink to="/store/vegetables">
            <li>Vegetables</li>
          </NavLink>
          <NavLink to="/store/coffe-&-tea">
            <li>Coffee & Tea</li>
          </NavLink>
          <NavLink to="/store/diary-&-eggs">
            <li>Dairy & eggs</li>
          </NavLink>
          <NavLink to="/store/meat">
            <li>Meat</li>
          </NavLink>
          <NavLink to="/store/honey-&-bee-products">
            <li>Honey & Bee Products</li>
          </NavLink>
          <NavLink to="/store/flowers">
            <li>Flowers</li>
          </NavLink>
          <NavLink to="/store/dried-fruits-&-nuts">
            <li>Dried Fruits & Nuts</li>
          </NavLink>
        </ul>
      </nav>
    </div>
  )
}

export default StoreNavbar
