import React from 'react'
import { NavLink } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Rating from '@mui/material/Rating'

interface ProductCardProps {
  height: number
  editable: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ProductCard: React.FC<ProductCardProps> = ({
  height,
  editable,
  setOpenModal,
}) => {
  const width = height - 8
  return (
    <div className="mx-1">
      <div className="py-5 flex flex-col items-center rounded-md font-noto">
        {/* 4:5 ratio */}
        <NavLink to="/store/fruits/apples/1">
          <div
            className={`h-${height} w-${width} flex items-center justify-center overflow-hidden hover:cursor-pointer`}
          >
            <img
              className="object-cover w-full h-full"
              src="/apple.png"
              alt=""
            />
          </div>
        </NavLink>
        <div>
          <NavLink to="/store/fruits/apples/1">
            <h4 className={`truncate w-${width} hover:cursor-pointer`}>
              Apples, Silicon Oasiskm frkn
            </h4>
          </NavLink>
          <NavLink to="/farmer-profile">
            <h6 className="text-xs hover:underline">Mariam Khatoon</h6>
          </NavLink>
          <div className="flex justify-between items-end">
            <div>
              <div className="flex">
                <p className="text-xs py-0.5 pr-1">AED</p>
                <p>
                  <span className="font-bold">35.50</span>/kg
                </p>
              </div>
              <Rating
                defaultValue={3.5}
                precision={0.5}
                size="small"
                readOnly
              />
            </div>
            {editable && (
              <div className="float-right flex mb-2">
                <button
                  title="edit"
                  className="rounded-md py-0.5 px-1 hover:bg-gray-300"
                  onClick={() => {
                    setOpenModal(true)
                  }}
                >
                  <EditIcon fontSize="small" />
                </button>
                <button
                  title="delete"
                  className="rounded-md py-0.5 px-1 hover:bg-gray-300"
                >
                  <DeleteIcon fontSize="small" />
                </button>
                <button
                  title="display"
                  className="rounded-md py-0.5 px-1 hover:bg-gray-300"
                >
                  <VisibilityOffIcon fontSize="small" />
                </button>
              </div>
            )}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default ProductCard
