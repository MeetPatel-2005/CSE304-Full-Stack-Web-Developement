import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='h-[70px] w-screen bg-slate-900 text-indigo-300 flex flex-rows justify-around items-center font-normal text-xl select-none'>
        <Link to="/" className='text-white cursor-pointer hover:text-purple-400 transition-colors duration-200'>Home</Link>
        <Link to="/home" className='text-white cursor-pointer hover:text-purple-400 transition-colors duration-200'>Movies</Link>
        <Link to="/contact" className='text-white cursor-pointer hover:text-purple-400 transition-colors duration-200'>Contact</Link>
    </div>
  )
};

export default Navbar;