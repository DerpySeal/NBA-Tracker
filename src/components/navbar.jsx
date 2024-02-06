import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/navbar.css'

export const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='links'>
        <Link to='/' className='poppins-semibold'>Tracker.io</Link>
        <Link to='/' className='montserrat'>Home</Link>
        <Link to='/games' className='montserrat'>Games</Link>
      </div>
    </div>
  )
}

