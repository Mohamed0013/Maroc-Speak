import { ChatIcon, CheckCircleIcon, EditIcon, EmailIcon, PhoneIcon, StarIcon, WarningIcon } from "@chakra-ui/icons";
import { Box, Flex, List, ListIcon, ListItem, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import { Link, useParams } from "react-router-dom";

export default function Profile() {

    const {id} = useParams()
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext();

    const [user, setUser] = useState({
        id : null,
        username : '',
        email : '',
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
              if (error.response && error.response.status === 403) {
                history.push('/login');
              } else {
                console.error(error)
              }
            })
        }, [])
      }
    

  return (
    <Tabs mt={'40px'} p={'20px'} colorScheme="blue" variant={'enclosed'}>
      <TabList>
      <Tab _selected={{color:'white', bg : "blue.400"}}>Account infos</Tab>
      <Tab _selected={{color:'white', bg : "blue.400"}}>Courses History</Tab>
      </TabList>
      
      
      {loading && 
    <TabPanels>
      <TabPanel>
        <Tab colSpan={'5'} className='text-center'>
          loading...
        </Tab>
      </TabPanel>
    </TabPanels>
    }

    {!loading && (
        <TabPanels>
        <TabPanel>
          <List spacing={4}>

          <ListItem>
          <Flex align="center">
            <Box flex="0 0 141px">
              <ListIcon as={ChatIcon} />
                Username :
            </Box>
            { user.username }
            </Flex>
          </ListItem>
 
            <ListItem className="mb-4">
            <Flex align="center">
            <Box flex="0 0 141px">
              <ListIcon as={EmailIcon} />
                Email :
                </Box>
                { user.email } 
            </Flex>
            </ListItem>

            {/* <Flex align="center"> */}
           
            <ListItem>
            <Box flex="0 0 141px">
          <Link to={`/Edit/account/${user.id}`}>
            <button className="btn btn-warning">
            <EditIcon /> &nbsp;
              Edit Account
            </button>
            </Link>
            </Box>
            {/* </Flex> */}
          </ListItem>

          </List>
        </TabPanel>
        </TabPanels>
        )
        }
    </Tabs>
  )
}
