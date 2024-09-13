import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios-client';
import { useStateContext } from '../../contexts/ContextProvider';
import { AddIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, Flex, HStack, Heading, SimpleGrid, Text } from "@chakra-ui/react";

export default function Home() {
const [products, setProducts] = useState([])
const [loading, setLoading] = useState(false);
const [pagination, setPagination] = useState(null);
const {setNotification} = useStateContext();

const getProducts = () => {
    setLoading(true)
    axiosClient.get('/product')
    .then(({data}) => {
      setLoading(false)
      setPagination(data.meta);
      setProducts(data.data)
    })
    .catch(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    getProducts();
  }, [])
  
  
  return (
    <SimpleGrid minChildWidth={'300px'} spacing={'10'}>
{
          products.length > 0 && (
            products.map((row,key)=>(
        <Card key={key} borderTop={'8px'} borderColor={"blue.400"} bg={'white'}>
          <CardHeader>
            <Flex gap={5}>
              <Avatar src={`http://127.0.0.1:8000/storage/products/images/${row.image}`} alt="" />
              <Box>
                <Heading as={'h3'} size={"sm"}>
                  {row.title} 
                </Heading>
              </Box>
            </Flex>
          </CardHeader>

          <CardBody color={"gray.500"}>
            <Text>
              {row.description}
            </Text>
          </CardBody>
              
          <Divider borderColor={"grey.200"} />

          <CardFooter>
            <HStack>
              <Button variant={"ghost"} leftIcon={<ViewIcon />}>view</Button>
              <Button variant={"ghost"} leftIcon={<AddIcon />}>Add to card</Button>
            </HStack>
          </CardFooter>
        </Card>
            )))
}
        </SimpleGrid>

)
}