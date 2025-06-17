import React from 'react'
import logo from "../pics/logo.png"
import "../css/footer.css"

export default function Footer() {
  return (
    <div id="footerContainer">
        <div id="footerLogo">
            <img src={logo} alt="Refresh the page" />
        </div>
        <div id="footerInfo">     
            <h3>All rights reserved @2025</h3>
        </div>
        <div id="footerOptions">
        </div>
    </div>
  )
}
