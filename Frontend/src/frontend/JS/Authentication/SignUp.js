import React, { useState } from 'react';
import '../../css/login.css';
import logo from "../../pics/logo.png";
import loginImg from "../../pics/loginImg.png";
import { NavLink, useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Pass, setPass] = useState('');
    const [Repass, setRepass] = useState('');

    const navigate = useNavigate();

    const submitForm = async () => {
        if (Name.length !== 0 && Email.length !== 0 && Pass.length > 5) {
            if (Pass !== Repass) {
                return alert("Enter password must be matched");
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
                    return alert("account not created due to internal server error");
                }

                if (response.status === 409) {
                    return alert('Email or Username already in use....');
                }

                setName('');
                setEmail('');
                setPass('');
                setRepass('');

                let createAccountResponse = await response.json();
                localStorage.clear();
                localStorage.setItem("userId", createAccountResponse._id);

                navigate('/post');

            } catch (err) {
                console.log(err.message);
                alert("Can't create account try again later...");
            }
        } else {
            alert('Enter the details below');
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

                    <p className="form-sub">Start your journey</p>
                    <h2>Sign Up</h2>

                    <input type="text" placeholder="Enter your name" className="form-input" onChange={(e) => setName(e.target.value)} value={Name} />
                    <input type="email" placeholder="Enter your email" className="form-input" onChange={(e) => setEmail(e.target.value)} value={Email} />
                    <input type="password" placeholder="Enter password" className="form-input" onChange={(e) => setPass(e.target.value)} value={Pass} />
                    <input type="password" placeholder="Re-enter password" className="form-input" onChange={(e) => setRepass(e.target.value)} value={Repass} />

                    <NavLink to="/login" className="form-link">Already have an account?</NavLink>
                    <button className="form-btn" onClick={submitForm}>Create Account</button>
                </div>
            </div>
        </div>
    );
}