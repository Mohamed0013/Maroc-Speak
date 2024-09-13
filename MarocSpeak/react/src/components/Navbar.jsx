import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  Heading,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { UnlockIcon } from '@chakra-ui/icons';

export default function DefaultLayout() {
  const { user, token, notification, setUser, setToken } = useStateContext();
  const [logedin, setLogedin] = useState(false);
  const navigate = useNavigate();
  const toast = useToast()

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

  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = React.useRef()

  const onLogout = (e) => {
    e.preventDefault();
    axiosClient.post('/logout').then(() => {
      setUser({});
      setToken(null);
      showtoast();
    });
  };

  useEffect(() => {
  if (token) {
    setLogedin(true);
  
    axiosClient.get('/user').then(({ data }) => {
      setUser(data);
      if (data.role == 'admin'){
        navigate('/admin')
      }
    });
  }
  }, [token, setUser]);


  const emailRef = useRef();
  const passwordRef = useRef();

  const [errors, setErrors] = useState(null);

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
          console.log(response.data.errors)
        }
        else{
          setErrors({
            email : [response.data.message]
          })
        }
      }
    })
  }

  var testStyle = {}
  if (errors){
    testStyle = {
        mb : '222px'
    }
  }
  else{
    testStyle = {
        mb : '350px'
    }
  }
  
  const RegStyle = {
    'color' : 'white',
    'bg': 'rgb(255,94,94)',
    'bg': 'linear-gradient(90deg, rgba(255,94,94,1) 0%, rgba(218,5,56,1) 35%, rgba(255,0,18,1) 100%)',
    ':hover' : {
      color : 'black'
    },
    'height' : '46px',
    'width' : '110px',
  }

  const LogStyle = {
    'color' : 'white',
    'bg': 'rgb(255,94,94)',
    'bg': 'linear-gradient(90deg, rgba(255,94,94,1) 0%, rgba(218,5,56,1) 35%, rgba(255,0,18,1) 100%)',
    ':hover' : {'color' : 'black'},
  }


  return (
      <div>
        <Flex as={'nav'} p={'10px'} alignItems={'center'} flexWrap={'wrap'} mb={'40px'}>
          <Heading as={'h1'}>Maroc Speak</Heading>
          <Spacer />
          <HStack spacing={'20px'}>
            {logedin ? null : (
              <Button fontSize={'18px'} sx={RegStyle} onClick={onOpen}>
                Login
              </Button>
            )}
            <Menu>
              <MenuButton>
                <Avatar src="/img/luigi.png">
                  <AvatarBadge width="1em" h={'1em'} bg={'teal.500'}></AvatarBadge>
                </Avatar>
              </MenuButton>
              <MenuList>
                {logedin ? (
                  <MenuGroup title='Profile'>
                    <MenuItem>{user.username}</MenuItem>
                    <MenuItem>
                        <Button onClick={onLogout} bg={"red.500"} className='btn-logout text-white'>
                                Logout
                        </Button>
                    </MenuItem>
                    <MenuItem>
                    
                      <Link to={`/usersinfo/profile/${user.id}`}>My Account</Link>
                      
                    </MenuItem>
                  </MenuGroup>
                ) : (
                  <MenuGroup title='Guest'>
                    <Button colorScheme='teal' left={'10px'} onClick={() => navigate('/signup')}>
                      Register
                    </Button>
                    <Drawer
                      isOpen={isOpen}
                      placement='right'
                      initialFocusRef={firstField}
                      onClose={onClose}
                    >
                      <DrawerOverlay />
                      <DrawerContent>
                        <DrawerCloseButton />
                        
                        <DrawerHeader borderBottomWidth='1px'>
                          Login with your account
                        </DrawerHeader>
                        
                        <DrawerBody>
                        <form onSubmit={loginEv}>
                          <Stack spacing='24px'>
                                <Box>
                                  <FormLabel htmlFor='email'>Email</FormLabel>
                                  <Input
                                    // ref={firstField}
                                    type="email"
                                    name="email"
                                    placeholder="Enter your Email address"
                                    ref={emailRef}
                                  />
                                </Box>
                                <Box sx={testStyle}>
                                <FormLabel htmlFor='email'>Password</FormLabel>
                                  <Input ref={passwordRef} type='password' placeholder='Enter your Password' />
                                  {errors && (
                                  <div className="bg-danger p-2 mt-4 text-white">
                                    {Object.keys(errors).map((key) => (
                                      <p key={key}>{errors[key][0]}</p>
                                    ))}
                                  </div>
                                )}
                                </Box>
                              
                                


                                <Button sx={LogStyle} type="submit">
                                Login
                                </Button>

                                <Button variant='outline' mr={3} onClick={onClose}>
                                Cancel
                                </Button>
                        
                          </Stack>
                          </form>
                        </DrawerBody>
                      </DrawerContent>
                    </Drawer>
                  </MenuGroup>
                )}
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
