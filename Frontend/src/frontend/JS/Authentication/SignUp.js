import React, { useState, useContext } from 'react';
import '../../css/login.css';
import logo from "../../pics/logo.png";
import loginImg from "../../pics/loginImg.png";
import { NavLink, useNavigate } from 'react-router-dom';
import { usePopup } from "../../Contexts/PopupContext";
import { AuthContext } from "../../Contexts/AuthContext";

export default function SignUp() {
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Pass, setPass] = useState('');
    const [Repass, setRepass] = useState('');

    // Single toggle for both password inputs
    const [showPasswords, setShowPasswords] = useState(false);

    const navigate = useNavigate();
    const { showPopup } = usePopup();
    const { setUserToken } = useContext(AuthContext);

    const submitForm = async () => {
        if (Name.length !== 0 && Email.length !== 0 && Pass.length > 5) {
            if (Pass !== Repass) {
                return showPopup('Passwords do not match', () => {}, { showOk: true, showCancel: false });
            }

            let data = {
                username: Name,
                email: Email,
                password: Pass,
            };

            try {
                const createAccountQuery = await fetch('http://localhost:1000/user/createAccount', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                let response = await createAccountQuery;

                if (response.status === 500) {
                    return showPopup('Server error occurred', () => {}, { showOk: true, showCancel: false });
                }

                if (response.status === 409) {
                    return showPopup('Email already exists', () => {}, { showOk: true, showCancel: false });
                }

                setName('');
                setEmail('');
                setPass('');
                setRepass('');

                let createAccountResponse = await response.json();
                setUserToken(createAccountResponse._id);
                navigate('/post');
                return showPopup('Account created successfully', () => {}, { showOk: true, showCancel: false });

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
                    <img src={loginImg} alt="Sign up visual" />
                </div>

                <div className="login-right">
                    <div className="login-logo">
                        <img src={logo} alt="App Logo" />
                    </div>

                    <h2 className="form-sub">Start your journey</h2>
                    <h2>Sign Up</h2>

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

                    <input
                        type={showPasswords ? "text" : "password"}
                        placeholder="Enter password"
                        className="form-input"
                        onChange={(e) => setPass(e.target.value)}
                        value={Pass}
                    />

                    <input
                        type={showPasswords ? "text" : "password"}
                        placeholder="Re-enter password"
                        className="form-input"
                        onChange={(e) => setRepass(e.target.value)}
                        value={Repass}
                    />

                    <button
                        type="button"
                        className="show-pass-btn-single"
                        onClick={() => setShowPasswords(!showPasswords)}
                        aria-label={showPasswords ? "Hide passwords" : "Show passwords"}
                    >
                        {showPasswords ? "Hide Passwords" : "Show Passwords"}
                    </button>

                    <NavLink to="/login" className="form-link">Already have an account?</NavLink>
                    <button className="form-btn" onClick={submitForm}>Create Account</button>
                </div>
            </div>
        </div>
    );
}
