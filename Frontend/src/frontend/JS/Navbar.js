import React from 'react'
import '../css/navbar.css'
import {NavLink } from 'react-router-dom';

export default function Navbar() {
  return ( 
    <div>
        <ul className="navListContainer">
          <li className="navList">
            <NavLink to="/" className="navTxt">Home</NavLink>
          </li>
          <li className="navList">
            <NavLink to="/post" className='navTxt'>Post</NavLink>
          </li>
          <li className="navList">
            <NavLink to="/signUp"  className="navTxt">Account</NavLink>
          </li>

        </ul>
    </div>
  )
}
