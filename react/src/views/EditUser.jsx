import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios-client';
import { Button } from '@chakra-ui/react';
import { useStateContext } from '../contexts/ContextProvider';

export default function Edituser() {

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null);
  const {setNotification} = useStateContext();
  const navigate = useNavigate();
  const {id} = useParams();
  const [user, setUser] = useState({
    id : null,
    name : '',
    email : '',
    phone : '',
    role : '',
    password : '',
    password_confirmation : ''
  })

  if(id){
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/users/${id}`) 
        .then(({data}) => {
          setLoading(false)
          setUser(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit= (ev) =>{
    ev.preventDefault();
      axiosClient.put(`/users/${user.id}`, user)
        .then(() => {
          setNotification("User was successfully updated !")
          navigate('/')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        });

  }

  return (
    <>
      {user.id && <h1>Edit informations : {user.name}</h1>}
      {!user.id && <h1>New User</h1>}

    <div className='card animated fadeInDown'>
        {loading && (
          <div className='text-center'>Loading...</div>
        )
        }

      {errors && <div className="alert bg-danger text-white">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }

        {!loading &&
        <form onSubmit={onSubmit}>
              <input id='signupIn' type='text' placeholder='Enter the name' onChange={(e)=>setUser({...user, username: e.target.value})} value={user.username} />

              <input id='signupIn' type='email' placeholder='Enter the email address' onChange={(e)=>setUser({...user, email: e.target.value})} value={user.email} />

              <input id='signupIn' type='password' placeholder='Enter the password' onChange={(e)=>setUser({...user, password: e.target.value})} />

              <input id='signupIn' type='password' placeholder='Confirm the password' onChange={(e)=>setUser({...user, password_confirmation: e.target.value})} />

              <Button type='submit' variant='outline' colorScheme='blue' mt={'20px'}>Save</Button>

        </form>
        }
      </div>
    </>
  )
}
