import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Avatar,
  AvatarBadge,
  Button,
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Spacer,
  useToast,
} from '@chakra-ui/react';
import { UnlockIcon } from '@chakra-ui/icons';
import { useStateContext } from '../../contexts/ContextProvider';
import axiosClient from '../../axios-client';

export default function Adminnav() {
    const { user, token, setUser, setToken } = useStateContext();
    const [logedin, setLogedin] = useState(false);
    const navigate = useNavigate();
    const toast = useToast()

    useEffect(() => {
          setLogedin(true);
        
          axiosClient.get('/admin').then(({ data }) => {
            setUser(data);
          });
        }, [token, setUser]);
  
    const showtoast =()=>{ 
      navigate('/login')
      toast({
        title : 'Logged out',
        description : 'Logged out successfully',
        duration : 4000,
        isClosable : true,
        status : 'success',
        position : 'top',
        icon : <UnlockIcon />
      })
      
    }

    const onLogout = (e) => {
        e.preventDefault();
        axiosClient.post('/logout').then(() => {
          setUser({});
          setToken(null);
          showtoast();
        });
      };
    
    return (
      <div>
      <Flex as={'nav'} p={'10px'} alignItems={'center'} flexWrap={'wrap'} mb={'40px'}>
        <Heading as={'h1'}>My Nav</Heading>
        <Spacer />
        <HStack spacing={'20px'}>
        <Menu>
              <MenuButton>
                <Avatar src="/img/luigi.png">
                  <AvatarBadge width="1em" h={'1em'} bg={'teal.500'}></AvatarBadge>
                </Avatar>
              </MenuButton>
              <MenuList>
              <MenuGroup title='Profile'>
                    <MenuItem>{user.username}</MenuItem>
                    <MenuItem>
                        <Button onClick={onLogout} bg={"red.500"} className='btn-logout text-white'>
                                Logout
                        </Button>
                    </MenuItem>
                    <MenuItem>
                    <Link to={`/admin/users/profile/${user.id}`}>My Account</Link>
                    </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                <MenuGroup title='Help'>
                  <MenuItem>Docs</MenuItem>
                  <MenuItem>FAQ</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
        </div>
  );
}