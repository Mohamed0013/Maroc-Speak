import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios-client';
import {Link} from "react-router-dom"
import { Box, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'
import 'bootstrap/dist/css/bootstrap.css';
import { useStateContext } from '../../contexts/ContextProvider';
import '../../css/users.css'
 
export default function Users() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);
  const {setNotification} = useStateContext();

  const colors = useColorModeValue(
    ['white.50', 'blue.200'], 
    ['red.50', 'blue.900'],
  )
  const [tabIndex, setTabIndex] = useState(0)
  const bg = colors[tabIndex]

  const getUsers = () => {
    setLoading(true)
    axiosClient.get('/admusers')
    .then(({data}) => {
      setLoading(false)
      setPagination(data.meta);
      setUsers(data.data)
    })
    .catch(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    getUsers();
  }, [])

  const onDelete = (u) =>{
    if(!window.confirm("Are you sure you want to delete this user ?")){
      return
    }
    axiosClient.delete(`/users/${u.id}`)
      .then(()=>{
        setNotification("User was successfully deleted !")
        getUsers()
      })
  }

  const handlePageChange = (url) => {
    setLoading(true);
    axiosClient
      .get(url)
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
        
        if (data.links) {
          setPagination(data.links);
        } else if (data.meta) {
          setPagination(data.meta.links);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const LinkBox = {
    padding : "10px",
    bg : "purple.100",
    cursor : "pointer"
  }

  const renderPaginationButtons = () => {
    if (!pagination) {
      return null;
    }
  }
  return (
    <div>
    <Tabs isFitted variant='enclosed'>
    <TabList mb='1em'>
      <Tab>List of the users</Tab>
      <Tab>Admin account</Tab> 
      <Box sx={LinkBox}>
        <Link to={'/admin/new/user'}><Icon as={AddIcon} /> Add new</Link>
        </Box>
    </TabList>
    <TabPanels>
      <TabPanel>
      <table className="table">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Role</th>
        <th scope="col">Creation date</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>

    {loading && 
    <tbody>
      <tr>
        <td colSpan={'6'} id='test' className='text-center'>
          <b id='b'>loading</b><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </td>
      </tr>
    </tbody>
    }

    {!loading && <tbody>
      {users.map(u => (
        u.role!='admin' && (
        <tr key={u.id}>
          <th scope="row">{u.id}</th>
          <td>{u.username}</td>
          <td>{u.email}</td>
          <td>{u.role}</td>
          <td>{u.created_at}</td>
          <td>
            <button className='btn btn-outline-warning me-2'>
              <Link to={`/admin/users/${u.id}`}><Icon  w={5} h={5} as={EditIcon} /></Link>
            </button>
            
            <button className='btn btn-outline-danger' onClick={ev => onDelete(u)}>
              <Icon as={DeleteIcon} w={5} h={5}/>
            </button>  
          </td>
        </tr>
        ) 
      ))}
    </tbody>
    }
    </table>
      </TabPanel>
      <TabPanel>
      <table className="table">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope='col'>Phone</th>
        <th scope='col'>Role</th>
        <th scope='col'>Edit</th>
      </tr>
    </thead>
    {!loading && <tbody>
      {users.map(u => (
        u.role=='admin' && (
        <tr key={u.id}>
          <th scope="row">{u.id}</th>
          <td>{u.name}</td>
          <td>{u.email}</td>
          <td>{u.phone}</td>
          <td>{u.role}</td>
          <td> 
            <button className='btn btn-outline-warning me-2'>
              <Link to={'/admin/users/'+u.id}><Icon  w={5} h={5} as={EditIcon} /></Link>
            </button> 
          </td>
        </tr>
        ) 
      ))}
    </tbody>
    }
    </table>
      </TabPanel>
    </TabPanels>
    </Tabs>
    
        {renderPaginationButtons()}
    </div>
  )
}
