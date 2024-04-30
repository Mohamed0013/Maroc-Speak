import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios-client';
import { Button, Select } from '@chakra-ui/react';
import { useStateContext } from '../contexts/ContextProvider';

export default function UserForm() {

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null);
  const {setNotification} = useStateContext(); 
  const navigate = useNavigate();
  const {id} = useParams();
  const [user, setUser] = useState({
    id : null,
    username : '',
    email : '', 
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
    if (user.id){
      axiosClient.put(`/users/${user.id}`, user)
        .then(() => {
          setNotification("User was successfully updated !")
          navigate('/admin/users')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        });
    }
    else{
      axiosClient.post('/admusers', user)
        .then(() => {
          setNotification("User was successfully created !")
          navigate('/users')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        });
    } 

  }

  return (
    <>
      {user.id && <h1>Edit { user.role } : {user.username}</h1>}
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
              <input id='signupIn' type='text' placeholder='Enter the username' onChange={(e)=>setUser({...user, username: e.target.value})} value={user.username} />

              <input id='signupIn' type='email' placeholder='Enter the email address' onChange={(e)=>setUser({...user, email: e.target.value})} value={user.email} />

              <input id='signupIn' type='password' placeholder='Enter the password' onChange={(e)=>setUser({...user, password: e.target.value})} />

              <input id='signupIn' type='password' placeholder='Confirm the password' onChange={(e)=>setUser({...user, password_confirmation: e.target.value})} />

              <Select placeholder='Select The Role...'
                onChange={(e) => setUser({...user, role: e.target.value})}
              >
                <option value='prof'>Prof</option>
                <option value='student'>Student</option>
                <option value='admin'>Admin</option>
              </Select>
              <Button type='submit' variant='outline' colorScheme='blue' mt={'20px'}>Save</Button>

        </form>
        }
      </div>
    </>
  )
}
