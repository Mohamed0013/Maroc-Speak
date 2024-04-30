import { ChatIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { Box, Flex, List, ListIcon, ListItem, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useParams } from "react-router-dom";
import '../css/users.css'

export default function Profile() {

    const {id} = useParams()
    const [loading, setLoading] = useState(false);

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
    

  return (
    <div className="body">
    <Tabs mt={'40px'} p={'20px'} colorScheme="blue" variant={'enclosed'}>
      <TabList>
      <Tab _selected={{color:'white', bg : "red.400"}}>Account infos</Tab>
      </TabList>
      
      
      {loading && 
    <TabPanels>
      <TabPanel>
        <Tab colSpan={'5'} className='text-center'>
          <b id='b'>loading</b><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
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
 
            <ListItem>
            <Flex align="center">
            <Box flex="0 0 141px">
              <ListIcon as={EmailIcon} />
                Email :
                </Box>
                { user.email } 
            </Flex>
            </ListItem>

          </List>
        </TabPanel>
        </TabPanels>
        )
        }
    </Tabs>
    </div>
  )
}
