import React from 'react'
import { NavLink } from 'react-router-dom'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ListAltIcon from '@mui/icons-material/ListAlt'

function Navbar() {
  const isFarmer = false
  return (
    <nav className="flex justify-between items-center font-noto px-36 py-3 shadow-sm">
      <div>
        <NavLink to="/">
          <img
            className="h-12"
            src="/farmfresh-logo-black-without-bg.png"
            alt="home"
          />
        </NavLink>
      </div>
      <div className="flex gap-9 items-center">
        <ul className="flex gap-4">
          <li>APIs</li>
          <li>GitHub</li>
          <li>LinkedIn</li>
        </ul>
        <ul className="flex gap-4 items-center">
          <li>
            <NavLink to="/store">
              <ShoppingBagIcon />
            </NavLink>
          </li>
          {!isFarmer && (
            <li className="pr-2">
              <NavLink to="/shopping-cart">
                <ShoppingCartIcon />
              </NavLink>
            </li>
          )}
          {isFarmer && (
            <li className="pr-2">
              <NavLink to="/orders">
                <ListAltIcon />
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/my-profile">
              <AccountCircleIcon fontSize="large" />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
