import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <button
        className={`text-center text-[15px] px-6 py-3 rounded-md font-bold hover:scale-95 hover:bg-blue-300 flex flex-row items-center gap-4 ${
          active ? 'bg-yellow-50 text-black ' : 'bg-blue-600 text-white'
        }`}
      >
        {children}
      </button>
    </Link>
  )
}

export default Button
