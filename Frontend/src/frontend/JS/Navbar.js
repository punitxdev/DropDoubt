import React from 'react';
import '../css/navbar.css';
import { NavLink } from 'react-router-dom';
import logo from '../pics/logo.png';

export default function Navbar() {
  return (
      <nav className="navbarContainer">
        <div className="navbarContent">
          {/* Logo Section */}
          <div className="navLogoSection">
            <NavLink to="/about">
              <img src={logo} alt="Logo" className="navLogoLarge" />
            </NavLink>
          </div>

          {/* Navigation Links */}
          <ul className="navListWrapper">
            <li className="navItem">
              <NavLink to="/" className="navLink">Home</NavLink>
            </li>
            <li className="navItem">
              <NavLink to="/post" className="navLink">Post</NavLink>
            </li>
            <li className="navItem">
              <NavLink to="/login" className="navLink">Account</NavLink>
            </li>
            <li className="navItem">
              <NavLink to="/profile" className="navLink">Profile</NavLink>
            </li>
            <li className="navItem">
              <NavLink to="/about" className="navLink">About</NavLink>
            </li>
          </ul>
        </div>
      </nav>
  );
}
