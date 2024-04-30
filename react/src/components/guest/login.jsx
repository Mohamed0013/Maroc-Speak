import React, { useRef, useState } from 'react'
import {Link} from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider';
import axiosClient from '../../axios-client';
import { position } from '@chakra-ui/react';

export default function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();

  const [errors, setErrors] = useState(null);

  const {setUser, setToken} = useStateContext()
  const loginEv = (e) =>{
    e.preventDefault();
    const payload = {
      email : emailRef.current.value,
      password : passwordRef.current.value
    }
    setErrors(null)
    axiosClient.post('/login',payload)
    .then(({data})=>{
      setUser(data.user)
      setToken(data.token)
    })
    .catch(err => {
      // debugger;
      const response = err.response;
      if (response && response.status === 422){
        if (response.data.errors){
          setErrors(response.data.errors)
        }
        else{
          setErrors({
            email : [response.data.message]
          })
        }
      }
    })
  }
  return (
    <div><div className='text-center mb-0 mt-4'><h1 className='mb-4'>Authentification</h1> <b className='text-info'><Link to={'/'}>Return to the Homepage</Link></b></div>
    
    <div className='login-signup-form animated fadeInDown'>
      <div className='form'>
      <form onSubmit={loginEv}>
        <h1 className='title'>Login into your account</h1>
        {errors && <div className="alert" id='error_span'>
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        <input id='signupIn' ref={emailRef} type='email' placeholder='enter the email' />
        <input id='signupIn' ref={passwordRef} type='password' placeholder='enter the password' />
        <button id='subup' className='btn-block'>
          Login
        </button>
        <p className='message'>
          Not Registred ? <Link to={"/signup"}>create an account</Link>
        </p>
      </form>
      </div>
    </div>
    </div>
  )
}
