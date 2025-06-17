import React from 'react'
import '../../css/login.css'
import logo from "../../pics/logo.png"
import {NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import loginImg from "../../pics/loginImg.png"
import {useState } from 'react'

export default function SignUp() {
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Pass, setPass] = useState('');
    const [Repass, setRepass] = useState('');

    const navigate = useNavigate();


    const submitForm = async () =>{
        if (Name.length !== 0 && Email.length !== 0 && Pass.length > 5){
            if ( Pass !== Repass){
                return alert("Enter password must be matched")
            }

            let data = {
                username: Name,
                email: Email,
                password: Pass,
            }

            try {
                const createAccountQuery = await fetch('http://localhost:1000/user/createAccount', {
                    method: 'POST',
                    mode: 'cors',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify(data)
                });
                let response = await createAccountQuery
                if(response.status === 500){
                    return alert("account not created due to internal server error")
                }

                if (response.status === 409){
                    return alert('Email or Username already in use....')
                }

                setName('')
                setEmail('')
                setPass('')
                setRepass('')

                let createAccountResponse = await response.json()

                Cookies.remove('userToken')
                Cookies.set('userTokes', createAccountResponse._id, {expires: 7})

                navigate('/post')
                
            }catch(err){
                console.log(err.message)
                alert("Can't create account try again later...")
            }
        }else{
            alert('Enter the details below')
        }
    }

  return ( 
    <div>
        <div id="loginPage">
            <div id="loginObjContainer">
                <div id="loginInfoContainer">
                    <div id="loginLogoHeader">
                        <img src={logo} alt="refresh page" />
                    </div>
                    <div>
                        <p style={{margin: "5px"}}>Start your journey</p>
                        <h2 style={{margin: "5px"}}>Sign up</h2>
                    </div>
                    {/* <form> */}
                        <input type="text"  placeholder="Enter you name" className="formInput" onChange={(event) => {setName(event.target.value)}} value={Name}/>
                        <input type="email"  placeholder="Enter your email" className="formInput" onChange={(event) => {setEmail(event.target.value)}} value={Email}/>
                        <input type="password" placeholder="Enter password"  className="formInput" onChange={(event) => {setPass(event.target.value)}} value={Pass}/>
                        <input type="password" placeholder="Re-enter password"  className="formInput" onChange={(event) => {setRepass(event.target.value)}} value={Repass}/>
                        <NavLink to="/login" className='formLink'>Already have a account.</NavLink>
                        <button className='formBtn' onClick={submitForm}>Create account</button>
                    {/* </form> */}

                </div>


                <div id="loginImgContainer">
                    <img src={loginImg} alt="refresh page" />
                </div>
            </div>
        </div>
    </div>
  )
}
 