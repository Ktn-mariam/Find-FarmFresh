import React from 'react'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined'

function Product() {
  return (
    <div className="w-72">
      <div className="px-2 py-4 flex flex-col items-center rounded-md font-workSans hover:cursor-pointer">
        {/* 4:5 ratio */}
        <div className="w-64 h-64 mb-3 flex items-center justify-center overflow-hidden">
          <img className="object-cover w-full h-full" src="/apple.png" alt="" />
        </div>
        <div>
          <h4 className="truncate w-64 text-lg">
            Apples, Silicon Oasiskm frkn kjjkey
          </h4>
          <h6 className="text-sm">Mariam Khatoon</h6>
          <div className="flex">
            <p className="text-sm py-0.5 pr-1">AED</p>
            <p className="text-red-600">
              <span className="font-bold text-xl">35.50</span>/kg
            </p>
          </div>
          <div className="flex items-center">
            <StarOutlinedIcon
              style={{
                fontSize: '16px',
                color: '#ffc300',
                borderColor: '#fca311',
              }}
            />
            <StarOutlinedIcon
              style={{
                fontSize: '16px',
                color: '#ffc300',
                borderColor: '#fca311',
              }}
            />
            <StarHalfOutlinedIcon
              style={{
                fontSize: '16px',
                color: '#ffc300',
                borderColor: '#fca311',
              }}
            />
            <StarBorderOutlinedIcon
              style={{
                fontSize: '16px',
                color: '#ffc300',
                borderColor: '#fca311',
              }}
            />
            <StarBorderOutlinedIcon
              style={{
                fontSize: '16px',
                color: '#ffc300',
                borderColor: '#fca311',
              }}
            />
            <p className="text-xs pl-1">5</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
