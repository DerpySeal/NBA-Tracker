import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
import '../styles/navbar.css'
import { useNumericalValue } from "../context/date-context";


export const Navbar = () => {
  const { setNumericalValue } = useNumericalValue();

  const handleButtonClick = (value) => {
    // Change the numericalValue when the button is clicked
    setNumericalValue(value);
  };

  return (
    <div className='navbar'>
      <div className='links'>
        <Link to='/' className='poppins-semibold'>Tracker.io</Link>
        <Link to='/' className='montserrat'>Home</Link>
        <Link to={{ pathname: '/games', state: { numericalValue: 0 } }} onClick={() => handleButtonClick(0)} className='montserrat'>Games</Link>
        <Link to="/players" className="montserrat">Players</Link>
        <Link to='/standings' className='montserrat'>Standings</Link>
      </div>
    </div>
  )
}

