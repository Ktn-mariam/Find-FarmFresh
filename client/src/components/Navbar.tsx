import React from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
// import logo from '../../public/farmfresh-logo-black-without-bg.png'

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-36 py-3 shadow-sm">
      <div>
        <img
          className="h-12"
          src="/farmfresh-logo-black-without-bg.png"
          alt="home"
        />
      </div>
      <div className="flex gap-9 items-center">
        <ul className="flex gap-4">
          <li>About</li>
          <li>Contact</li>
          <li>FAQ</li>
          <li>Blogs</li>
        </ul>
        <ul className="flex gap-4 items-center">
          <li>
            <ShoppingBagIcon />
          </li>
          <li className="pr-2">
            <ShoppingCartIcon />
          </li>
          <li>
            <AccountCircleIcon fontSize="large" />
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
