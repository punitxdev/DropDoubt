import React from 'react'
import '../../css/login.css'
import Cookies from 'js-cookie'
import logo from "../../pics/logo.png"
import {NavLink, useNavigate } from 'react-router-dom';
import loginImg from "../../pics/loginImg.png"
import {useState } from 'react'

export default function Login() {
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Pass, setPass] = useState('');

    const navigate = useNavigate();



    const submitForm = async () =>{

        if (Name.length !== 0 && Email.length !== 0 && Pass.length > 5){

            let data = {
                username: Name,
                email: Email,
                password: Pass,
            }

            try {
                const createAccountQuery = await fetch('http://localhost:1000/user/login', {
                    method: 'POST',
                    mode: 'cors',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify(data)
                });
                let response = await createAccountQuery
                
                
                if(response.status !== 200){
                    const errData = await response.json()
                    return alert(errData.message)
                }

                setName('')
                setEmail('')
                setPass('')

                const userId = await response.json()

                Cookies.remove('userToken')
                Cookies.set('userToken', userId.id, {expires: 7});
                navigate('/post')

                alert('Login successfully')

            }catch(err){
                console.log(err.message)
                alert("Server error try again later..")
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
                        <h2 style={{margin: "5px"}}>Login</h2>
                    </div>
                        <input type="text"  placeholder="Enter you name" className="formInput" onChange={(event) => {setName(event.target.value)}} value={Name}/>
                        <input type="email"  placeholder="Enter your email" className="formInput" onChange={(event) => {setEmail(event.target.value)}} value={Email}/>
                        <input type="password" placeholder="Enter password"  className="formInput" onChange={(event) => {setPass(event.target.value)}} value={Pass}/>
                        <NavLink to="/signUp" className='formLink'>Create a new account</NavLink>
                        <button className='formBtn' onClick={submitForm}>Login</button>

                </div>


                <div id="loginImgContainer">
                    <img src={loginImg} alt="refresh page" />
                </div>
            </div>
        </div>
    </div>
  )
}
