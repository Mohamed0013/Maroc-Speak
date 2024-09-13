import { Flex, Heading, Spacer } from "@chakra-ui/react";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";

export default function UserNave() {

  const {user, token, notification,setUser, setToken} = useStateContext()

  const [isEvening, setIsEvening] = useState(false);

  if (!token){
    return <Navigate to={'/'} />
  }

  const onLogout = (e) =>{
    e.preventDefault();
    axiosClient.post('/logout')
    .then(()=>{
      setUser({})
      setToken(null)
    })
  }

  const updateTimeOfDay = () => {
    const currentHour = new Date().getHours();
    setIsEvening(currentHour >= 18 || currentHour < 6);
  };
 
  useEffect(()=>{
    axiosClient.get('/user') 
    .then(({data})=>{
      updateTimeOfDay();
      setUser(data)
    })
  }, [])


    return (
        <div>
        <Flex as={'nav'} p={'10px'} alignItems={'center'} flexWrap={'wrap'} mb={'40px'}>
        <Heading as={'h2'}>
        <b>
        {isEvening ? "Bonsoir" : "Bonjour"} {user.role}
        </b>
        &nbsp;
        <b className='text-warning'>{user.username} !</b>
        </Heading>
        <Spacer />
            <div>
              {user.name}
              <a href='#' onClick={onLogout} className='btn-logout'>Logout</a>
            </div>
     
          </Flex>
        </div>
    )
}