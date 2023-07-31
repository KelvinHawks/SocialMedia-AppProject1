import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavLinks.css'

function Navlinks(props) {
  return (
    <ul className='nav-links'>
        <li>
            <NavLink to='/' exact>ALL USERS</NavLink>
        </li>
        <li>
            <NavLink to='/ul/places'>NEW PLACES</NavLink>
        </li>
        <li>
            <NavLink to='/places/new'>ADD PLACE</NavLink>
        </li>
        <li>
            <NavLink to='/auth'>AUTHENTICATE</NavLink>
        </li>
    </ul>
  )
}

export default Navlinks