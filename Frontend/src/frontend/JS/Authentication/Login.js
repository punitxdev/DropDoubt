import React, { useState, useContext } from 'react';
import '../../css/login.css';
import logo from "../../pics/logo.png";
import loginImg from "../../pics/loginImg.png";
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../Contexts/AuthContext";
import { usePopup } from "../../Contexts/PopupContext";

export default function Login() {
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Pass, setPass] = useState('');
    const [showPass, setShowPass] = useState(false)
    const navigate = useNavigate();

    const { setUserToken } = useContext(AuthContext);
    const { showPopup } = usePopup();

    const submitForm = async () => {
        if (Name.length !== 0 && Email.length !== 0 && Pass.length > 5) {
            let data = { username: Name, email: Email, password: Pass };

            try {
                const createAccountQuery = await fetch('http://localhost:1000/user/login', {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                let response = await createAccountQuery;

                if (response.status !== 200) {
                    const errData = await response.json();
                    return alert(errData.message);
                }

                setName('');
                setEmail('');
                setPass('');

                const userId = await response.json();
                setUserToken(userId.id);
                navigate('/post');

                return showPopup('Login successful', () => {}, { showOk: true, showCancel: false });
            } catch (err) {
                console.log(err.message);
                return showPopup('Server error occurred', () => {}, { showOk: true, showCancel: false });
            }
        } else {
            return showPopup('Enter the details below', () => {}, { showOk: true, showCancel: false });
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <div className="login-left">
                    <img src={loginImg} alt="Login Visual" />
                </div>

                <div className="login-right">
                    <div className="login-logo">
                        <img src={logo} alt="App Logo" />
                    </div>

                    <h2>Login to Your Account</h2>

                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="form-input"
                        onChange={(e) => setName(e.target.value)}
                        value={Name}
                    />

                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="form-input"
                        onChange={(e) => setEmail(e.target.value)}
                        value={Email}
                    />

                    <div className="password-input-wrapper">
                        <input
                            type={showPass ? 'text' : 'password'}
                            placeholder="Enter password"
                            className="form-input"
                            onChange={(e) => setPass(e.target.value)}
                            value={Pass}
                        />
                        <button type="button" className="show-pass-btn" onClick={() => {showPass ? setShowPass(false) : setShowPass(true)}}>{showPass ? "Hide" : "Show"}</button>
                    </div>

                    <NavLink to="/signUp" className="form-link">Create a new account</NavLink>

                    <button className="form-btn" onClick={submitForm}>Login</button>
                </div>
            </div>
        </div>
    );
}
