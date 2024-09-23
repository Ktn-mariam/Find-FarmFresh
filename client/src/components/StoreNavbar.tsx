import { NavLink } from 'react-router-dom'

function StoreNavbar() {
  return (
    <div className="px-36 py-2 shadow-sm bg-gray-100">
      <nav>
        <ul className="flex justify-between items-center font-workSans">
          <NavLink
            to="/store/fruits"
            className={({ isActive, isPending }) =>
              isPending ? 'text-md' : isActive ? 'text-bold' : ''
            }
          >
            <li>Fruits</li>
          </NavLink>
          <NavLink
            to="/store/vegetables"
            className={({ isActive, isPending }) =>
              isPending ? 'text-md' : isActive ? 'text-bold' : ''
            }
          >
            <li>Vegetables</li>
          </NavLink>
          <NavLink
            to="/store/coffee&tea"
            className={({ isActive, isPending }) =>
              isPending ? 'text-md' : isActive ? 'text-bold' : ''
            }
          >
            <li>Coffee & Tea</li>
          </NavLink>
          <NavLink
            to="/store/diary&eggs"
            className={({ isActive, isPending }) =>
              isPending ? 'text-md' : isActive ? 'text-bold' : ''
            }
          >
            <li>Dairy & eggs</li>
          </NavLink>
          <NavLink
            to="/store/meat"
            className={({ isActive, isPending }) =>
              isPending ? 'text-md' : isActive ? 'text-bold' : ''
            }
          >
            <li>Meat</li>
          </NavLink>
          <NavLink
            to="/store/honey"
            className={({ isActive, isPending }) =>
              isPending ? 'text-md' : isActive ? 'text-bold' : ''
            }
          >
            <li>Honey & Bee Products</li>
          </NavLink>
          <NavLink
            to="/store/flowers"
            className={({ isActive, isPending }) =>
              isPending ? 'text-md' : isActive ? 'text-bold' : ''
            }
          >
            <li>Flowers</li>
          </NavLink>
          <NavLink
            to="/store/driedFruits"
            className={({ isActive, isPending }) =>
              isPending ? 'text-md' : isActive ? 'text-bold' : ''
            }
          >
            <li>Dried Fruits & Nuts</li>
          </NavLink>
        </ul>
      </nav>
    </div>
  )
}

export default StoreNavbar
