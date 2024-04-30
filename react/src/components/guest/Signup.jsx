import React, { useRef, useState } from 'react'
import {Link} from 'react-router-dom'
import axiosClient from '../../axios-client.js';
import { useStateContext } from '../../contexts/ContextProvider.jsx';
import '../../css/signup.css'
import { motion } from 'framer-motion';

export default function Signup() {

  const usernameRef = useRef();
  const emailRef = useRef();
  // const roleRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const [Crole, setCRole] = useState();

  const [errors, setErrors] = useState(null);

  const {setUser, setToken} = useStateContext()

  const RegisterEv = (e) =>{
    e.preventDefault();
    const payload = {
      username : usernameRef.current.value,
      email : emailRef.current.value,
      role : Crole,
      password : passwordRef.current.value,
      password_confirmation : passwordConfirmationRef.current.value
    }
    axiosClient.post('/signup',payload)
    .then(({data}) => {
      setUser(data.user)
      setToken(data.token)
    })
    .catch(err => {
      // debugger;
      const response = err.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors)
      } else {
        console.log('Unexpected error:', response.status);
      }
    });
  }


  return (
    <div><div className='text-center mb-0 mt-4'><h1 className='mb-4'>Authentification</h1> <b className='text-info'><Link to={'/'}>Return to the Homepage</Link></b></div>
    <div className='login-signup-form animated fadeInDown'>
      <div className='form' >
      <form onSubmit={RegisterEv} className='text-center'>
        <h1 className='title'>Create your account</h1>
        {errors && <div className="alert" id='error_span'>
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        <input type="text" id='signupIn' ref={usernameRef} placeholder='Enter youe Full name' />
        <input type='email' id='signupIn' ref={emailRef} placeholder='Enter your Email address' />
        <div class="role-selection">
        <span className="role-item">
            <input
                type="radio"
                name="role"
                value="student"
                onChange={(e)=>setCRole('student')}
            />
            <label for="role">Student</label>
        </span>
        
        <span className="role-item">
            <input
                type="radio"
                name="role"
                value="prof"
                onChange={(e)=>setCRole('prof')}
            />
            <label for="role">Professor</label>
        </span>
      </div>

        <input type='password' id='signupIn' ref={passwordRef} placeholder='Enter your Password' />
        <input type='password' id='signupIn' ref={passwordConfirmationRef} placeholder='Password confirmation' />
        <button className='btn-block' id='subup'>
          Signup
        </button>
        <b className='message'>
          Already Registred ? <Link to={"/login"}>Sign in</Link>
        </b>
      </form>
      </div>
    </div>
    </div>
  )
}
