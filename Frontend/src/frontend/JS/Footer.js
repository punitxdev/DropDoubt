import React from 'react';
import logo from '../pics/logo.png';
import '../css/footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer id="footerContainer">
            <div className="footerContent">
                {/* Logo */}
                <div className="footerLogo">
                    <img src={logo} alt="Logo" className="footerLogoImg" />
                </div>

                {/* Center Text */}
                <div className="footerInfo">
                    <p>© 2025 One-Line Forum. All rights reserved.</p>
                </div>

                {/* Social Icons */}
                <div className="footerIcons">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
                </div>
            </div>
        </footer>
    );
}
