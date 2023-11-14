import React from 'react'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined'

function ProductCard() {
  return (
    <div className="p-5 m-3 bg-gray-100 font-noto">
      {/* 4:5 ratio */}
      <img className="h-48  mb-3" src="/apple.png" alt="" />
      <div>
        <h4 className="truncate w-36">Apples, Silicon Oasiskm frkn</h4>
        <h6 className="text-xs">Mariam Khatoon</h6>
        <div className="flex">
          <p className="text-xs py-0.5 pr-1">AED</p>
          <p>
            <span className="font-bold">35.50</span>/kg
          </p>
        </div>
        <div className="flex items-center">
          <StarOutlinedIcon style={{ fontSize: '15px' }} />
          <StarOutlinedIcon style={{ fontSize: '15px' }} />
          <StarHalfOutlinedIcon style={{ fontSize: '15px' }} />
          <StarBorderOutlinedIcon style={{ fontSize: '15px' }} />
          <StarBorderOutlinedIcon style={{ fontSize: '15px' }} />
          <p className="text-xs pl-1">5</p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
