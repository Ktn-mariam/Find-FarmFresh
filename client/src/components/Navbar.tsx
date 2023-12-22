import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ListAltIcon from '@mui/icons-material/ListAlt'
import AuthenticationContext from '../context/authentication'
import { Role } from '../types/Auth'

function Navbar() {
  const { role } = useContext(AuthenticationContext)
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
          <li>
            <a href="/">APIs</a>
          </li>
          <li>
            <a
              href="https://github.com/Ktn-mariam/FarmFresh-Finder"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/mariamkhatoon/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </li>
        </ul>
        <ul className="flex gap-4 items-center">
          <li>
            <NavLink to="/store">
              <ShoppingBagIcon />
            </NavLink>
          </li>
          {role === Role.Consumer && (
            <li className="pr-2">
              <NavLink to="/shopping-cart">
                <ShoppingCartIcon />
              </NavLink>
            </li>
          )}
          {role === Role.Farmer && (
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
